const store = require("../../utils/store")

function todayStr() {
  const d = new Date()
  const pad = v => String(v).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const emptyForm = {
  id: "",
  name: "",
  category: store.CATEGORIES[0],
  purchaseDate: "",
  expiryDate: "",
  quantity: "",
  unit: ""
}

Page({
  data: {
    form: { ...emptyForm },
    categories: store.CATEGORIES,
    categoryIndex: 0,
    today: todayStr()
  },

  onLoad(options) {
    if (!options.id) return
    const item = store.getInventoryItem(options.id)
    if (item) {
      const categoryIndex = Math.max(0, store.CATEGORIES.indexOf(item.category))
      this.setData({
        form: { ...emptyForm, ...item, quantity: item.quantity === 0 ? "0" : String(item.quantity) },
        categoryIndex
      })
    }
  },

  onInput(event) {
    const field = event.currentTarget.dataset.field
    this.setData({ form: { ...this.data.form, [field]: event.detail.value } })
  },

  onCategoryChange(event) {
    const categoryIndex = Number(event.detail.value)
    this.setData({
      categoryIndex,
      form: { ...this.data.form, category: store.CATEGORIES[categoryIndex] }
    })
  },

  onPurchaseDate(event) {
    this.setData({ form: { ...this.data.form, purchaseDate: event.detail.value } })
  },

  onExpiryDate(event) {
    this.setData({ form: { ...this.data.form, expiryDate: event.detail.value } })
  },

  saveItem() {
    const form = this.data.form
    const name = form.name.trim()
    if (!name) {
      wx.showToast({ title: "先写食材名称", icon: "none" })
      return
    }
    if (form.quantity === "" || Number(form.quantity) < 0) {
      wx.showToast({ title: "填一下剩余量", icon: "none" })
      return
    }

    store.saveInventoryItem({
      id: form.id,
      name,
      category: form.category,
      purchaseDate: form.purchaseDate,
      expiryDate: form.expiryDate,
      quantity: Number(form.quantity),
      unit: form.unit.trim()
    })

    wx.showToast({ title: "已保存" })
    setTimeout(() => wx.navigateBack(), 500)
  },

  confirmRemove() {
    if (!this.data.form.id) {
      wx.navigateBack()
      return
    }
    wx.showModal({
      title: "删除食材",
      content: "删除后这份库存记录就没了，不可恢复。",
      confirmColor: "#b94732",
      success: result => {
        if (!result.confirm) return
        store.removeInventoryItem(this.data.form.id)
        wx.showToast({ title: "已删除" })
        setTimeout(() => wx.navigateBack(), 500)
      }
    })
  }
})
