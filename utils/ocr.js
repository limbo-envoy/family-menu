// 小票识别相关工具
// - parseReceiptText: 纯本地解析小票文字，提取商品名（无需任何配置，始终可用）
// - recognizeReceipt: 拍照 → 上传云存储 → 云函数 OCR 识别（需配置云开发与 OCR 密钥）

const NON_ITEM = [
  "小计", "合计", "总额", "现金", "微信", "支付宝", "云闪付", "找零", "税率",
  "单价", "数量", "商品", "编码", "门店", "日期", "收银", "会员", "余额",
  "交易", "条码", "称", "重量", "合计", "应付", "实付", "抹零", "赠品",
  "subtotal", "total", "cash", "change", "discount", "qty", "price", "amount"
]

// 把小票 OCR / 粘贴的文字解析成候选食材名列表
function parseReceiptText(text) {
  if (!text) return []
  const lines = String(text).split(/[\n\r]+/)
  const items = []

  for (let raw of lines) {
    let line = raw.replace(/^\s*\d+[\.、)]\s*/, "").trim() // 去掉行首序号 1. 2、
    if (!line) continue
    if (/^[\d.,\s¥￥$%-]+$/.test(line)) continue // 纯数字/符号行
    if (NON_ITEM.some(k => line.toLowerCase().includes(k.toLowerCase()))) continue

    // 去掉尾部价格，如 "12.50" "￥3.00" "1.500kg"
    line = line.replace(/[¥￥$]?\s*\d+(?:\.\d{1,3})?\s*(?:kg|g|克|千克|个|瓶|包|袋|盒|斤|升|l|ml)?\s*$/i, "")
    // 去掉中间出现的重量/规格，如 "1.500kg"
    line = line.replace(/\d+(?:\.\d+)?\s*(?:kg|g|克|千克|个|瓶|包|袋|盒|斤|升|l|ml)\b/i, "")
    line = line.replace(/\s{2,}/g, " ").trim()
    if (!line) continue
    if (/^[\d.,]+$/.test(line)) continue
    if (line.length > 30) continue // 过长的多半不是商品名

    items.push({ name: line })
  }
  return items
}

// 拍照识别：上传云存储后调用云函数 ocrReceipt，返回 parseReceiptText 的结果
function recognizeReceipt(filePath) {
  return new Promise((resolve, reject) => {
    if (!wx.cloud || !wx.cloud.uploadFile) {
      return reject(new Error("no-cloud"))
    }
    const ext = (filePath.match(/\.(\w+)$/) || [, "jpg"])[1]
    const cloudPath = `receipt/${Date.now()}-${Math.floor(Math.random() * 1e4)}.${ext}`
    wx.cloud
      .uploadFile({ cloudPath, filePath })
      .then(upload => {
        return wx.cloud.callFunction({
          name: "ocrReceipt",
          data: { fileID: upload.fileID }
        })
      })
      .then(res => {
        const result = (res && res.result) || {}
        const text = result.text || ""
        resolve(parseReceiptText(text))
      })
      .catch(err => reject(err))
  })
}

module.exports = {
  parseReceiptText,
  recognizeReceipt
}
