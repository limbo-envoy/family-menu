const cloud = require("wx-server-sdk")
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const https = require("https")
const url = require("url")

function downloadBuffer(fileUrl) {
  return new Promise((resolve, reject) => {
    const parsed = url.parse(fileUrl)
    https
      .get({ hostname: parsed.hostname, path: parsed.path }, res => {
        const contentType = res.headers["content-type"] || "image/jpeg"
        const chunks = []
        res.on("data", chunk => chunks.push(chunk))
        res.on("end", () => resolve({ buffer: Buffer.concat(chunks), contentType }))
      })
      .on("error", reject)
  })
}

exports.main = async (event) => {
  const { fileID } = event
  if (!fileID) return { error: "缺少 fileID" }

  try {
    // 1. 把云存储 fileID 转成可下载的 HTTPS 临时链接
    const { fileList } = await cloud.getTempFileURL({ fileList: [fileID] })
    const fileUrl = fileList[0].tempFileURL
    if (!fileUrl) return { error: "无法获取图片下载链接" }

    // 2. 下载图片 Buffer
    const { buffer, contentType } = await downloadBuffer(fileUrl)

    // 3. 调用微信 OCR 通用印刷体文字识别
    const res = await cloud.openapi.ocr.printedTextOCR({
      img: { contentType, value: buffer }
    })

    // 4. 把识别结果拼接成纯文本返回（兼容云调用的两种返回结构）
    const items = (res && res.items) || (res && res.result && res.result.items) || []
    const text = items.map(i => i.text).join("\n")
    return { text }
  } catch (err) {
    console.error("[ocrReceipt] 识别失败：", err)
    return { error: err.errMsg || err.message || String(err) }
  }
}
