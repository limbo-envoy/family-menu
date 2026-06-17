const store = require("../../utils/store")

Page({
  data: {
    orders: []
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const orders = store.getOrders().map(order => ({
      ...order,
      totalQty: order.items.reduce((sum, item) => sum + item.qty, 0)
    }))
    this.setData({ orders })
  },

  confirmRemove(event) {
    const id = event.currentTarget.dataset.id
    wx.showModal({
      title: "删除记录",
      content: "这条点菜记录删除后不能恢复。",
      confirmColor: "#b94732",
      success: result => {
        if (!result.confirm) return
        store.removeOrder(id)
        this.refresh()
        wx.showToast({ title: "已删除" })
      }
    })
  }
})
