const store = require("../../utils/store")
const ocr = require("../../utils/ocr")

function todayStr() {
  const d = new Date()
  const pad = v => String(v).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

let seq = 0

Page({
  data: {
    categories: store.CATEGORIES,
    photoPath: "",
    pasting: false,
    pasteText: "",
    candidates: [],
    parsing: false
  },

  /* 拍照 / 相册选图 → OCR */
  choosePhoto() {
    wx.chooseMedia({
      count: 1,
      mediaType: ["image"],
      sourceType: ["camera", "album"],
      success: res => {
        const filePath = res.tempFiles[0].tempFilePath
        this.setData({ photoPath: filePath, parsing: true })
        wx.showLoading({ title: "识别中…", mask: true })
        ocr
          .recognizeReceipt(filePath)
          .then(names => {
            wx.hideLoading()
            this.setData({ parsing: false })
            if (!names.length) {
              wx.showToast({ title: "没识别出商品，试试粘贴文字", icon: "none" })
              return
            }
            this.fillCandidates(names)
          })
          .catch(() => {
            wx.hideLoading()
            this.setData({ parsing: false })
            wx.showModal({
              title: "无法识别小票",
              content: "小票拍照识别需要先配置云开发环境并部署 ocrReceipt 云函数（详见 README）。你也可以直接把小票文字粘贴到下方来解析。",
              showCancel: false
            })
          })
      }
    })
  },

  /* 粘贴文字 → 本地解析 */
  onPasteInput(event) {
    this.setData({ pasteText: event.detail.value })
  },

  parsePasted() {
    const names = ocr.parseReceiptText(this.data.pasteText)
    if (!names.length) {
      wx.showToast({ title: "没解析出商品名", icon: "none" })
      return
    }
    this.fillCandidates(names)
  },

  fillCandidates(names) {
    const candidates = names.map(n => ({
      key: `c-${++seq}`,
      name: n.name,
      categoryIndex: 0,
      qty: "",
      unit: "",
      checked: true
    }))
    this.setData({ candidates })
  },

  togglePaste() {
    this.setData({ pasting: !this.data.pasting, candidates: [] })
  },

  onCandidateInput(event) {
    const { index, field } = event.currentTarget.dataset
    const candidates = this.data.candidates.slice()
    candidates[index] = { ...candidates[index], [field]: event.detail.value }
    this.setData({ candidates })
  },

  onCategoryChange(event) {
    const index = Number(event.currentTarget.dataset.index)
    const candidates = this.data.candidates.slice()
    candidates[index] = { ...candidates[index], categoryIndex: Number(event.detail.value) }
    this.setData({ candidates })
  },

  toggleCheck(event) {
    const index = Number(event.currentTarget.dataset.index)
    const candidates = this.data.candidates.slice()
    candidates[index] = { ...candidates[index], checked: !candidates[index].checked }
    this.setData({ candidates })
  },

  removeCandidate(event) {
    const index = Number(event.currentTarget.dataset.index)
    const candidates = this.data.candidates.slice()
    candidates.splice(index, 1)
    this.setData({ candidates })
  },

  async saveSelected() {
    const selected = this.data.candidates.filter(c => c.checked && c.name.trim())
    if (!selected.length) {
      wx.showToast({ title: "先勾选要入库的", icon: "none" })
      return
    }
    for (const c of selected) {
      await store.saveInventoryItem({
        name: c.name.trim(),
        category: store.CATEGORIES[c.categoryIndex] || store.CATEGORIES[0],
        purchaseDate: todayStr(),
        expiryDate: "",
        quantity: Number(c.qty) || 1,
        unit: c.unit.trim()
      })
    }
    wx.showToast({ title: `已录入 ${selected.length} 项`, icon: "success" })
    setTimeout(() => wx.navigateBack(), 600)
  }
})
