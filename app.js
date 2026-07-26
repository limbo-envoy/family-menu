const store = require("./utils/store")

// 云开发环境 ID：想用「扫小票」功能时，在这里填入你的云开发环境 ID；
// 留空则小票拍照识别走「粘贴文字」本地解析，其余功能不受影响。
const CLOUD_ENV = ""

App({
  onLaunch() {
    store.ensureSeedRecipes()
    store.ensureSeedInventory()
    if (CLOUD_ENV && wx.cloud) {
      wx.cloud.init({ env: CLOUD_ENV, traceUser: true })
    }
  }
})
