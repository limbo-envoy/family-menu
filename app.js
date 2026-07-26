const store = require("./utils/store")

// 云开发环境 ID：在微信开发者工具开通云开发后，把环境 ID 填到这里（形如 "xxx-env-xxxx"）
// 留空则自动降级为本地存储；填入后菜谱/库存/记录会存到云端，全家共享同一份数据
const CLOUD_ENV = "cloud1-d5g4i84qv287cdcbe"

App({
  async onLaunch() {
    if (CLOUD_ENV && wx.cloud) {
      wx.cloud.init({ env: CLOUD_ENV, traceUser: true })
    }
    store.initCloud(CLOUD_ENV)
    try {
      await store.ensureSeedRecipes()
      await store.ensureSeedInventory()
    } catch (e) {
      console.error('[seed] 云端数据初始化失败，请检查云集合是否已创建并设置权限：', e)
    }
  }
})
