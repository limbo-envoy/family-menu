// 云函数 ocrReceipt：接收小程序上传的小票图片 fileID，
// 下载后用腾讯云 OCR（通用印刷体识别）识别文字并返回。
//
// 部署前准备：
// 1. 在腾讯云控制台开通「文字识别 OCR」服务。
// 2. 在云函数环境变量里配置：
//      TENCENT_SECRET_ID=你的SecretId
//      TENCENT_SECRET_KEY=你的SecretKey
//    （不要用明文写进代码）
// 3. 在云函数目录执行 npm install 安装依赖后再上传部署。

const cloud = require("wx-server-sdk")
const tencentcloud = require("tencentcloud-sdk-nodejs")

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const OcrClient = tencentcloud.ocr.v20181119.Client
const client = new OcrClient({
  credential: {
    secretId: process.env.TENCENT_SECRET_ID,
    secretKey: process.env.TENCENT_SECRET_KEY
  },
  region: "ap-guangzhou",
  profile: { httpProfile: { endpoint: "ocr.tencentcloudapi.com" } }
})

exports.main = async event => {
  const { fileID } = event
  if (!fileID) return { text: "" }

  // 1. 从云存储下载图片
  const file = await cloud.downloadFile({ fileID })
  const base64 = file.fileContent.toString("base64")

  // 2. 调用通用印刷体识别
  const res = await client.GeneralBasicOCR({ ImageBase64: base64 })
  const text = (res.TextDetections || [])
    .map(item => item.DetectedText)
    .join("\n")

  return { text }
}
