const store = require("../../utils/store")

Page({
  data: {
    orders: []
  },

  onShow() {
    this.refresh()
  },

  async refresh() {
    const rawOrders = await store.getOrders()
    const orders = rawOrders.map(order => {
      const isNew = Array.isArray(order.dishes)
      const dishes = isNew
        ? order.dishes
        : (order.items || []).map(it => ({ name: it.name, type: "recipe" }))
      const consumed = isNew ? order.consumed || [] : []
      const shortageCount = consumed.filter(c => c.shortage > 0).length
      const dishCount = dishes.length
      return {
        ...order,
        dishes,
        consumed,
        shortageCount,
        dishCount
      }
    })
    this.setData({ orders })
  },

  confirmRemove(event) {
    const id = event.currentTarget.dataset.id
    wx.showModal({
      title: "删除记录",
      content: "这条点菜记录删除后不能恢复。",
      confirmColor: "#b94732",
      success: async result => {
        if (!result.confirm) return
        await store.removeOrder(id)
        await this.refresh()
        wx.showToast({ title: "已删除" })
      }
    })
  }
})
