const store = require("../../utils/store")

function todayStr() {
  const d = new Date()
  const pad = v => String(v).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

Page({
  data: {
    categories: ["全部", ...store.CATEGORIES],
    activeCategory: "全部",
    sortMode: "status", // status=状态优先 / expiry=按保质期最早
    inventory: [],
    filtered: [],
    reminder: null // { expired, soon }
  },

  onShow() {
    this.refresh()
  },

  async refresh() {
    const inventory = await store.getInventory()
    this.setData({ inventory }, () => this.applyFilter())
  },

  applyFilter() {
    const active = this.data.activeCategory
    const now = todayStr()
    let list = this.data.inventory
      .filter(item => active === "全部" || item.category === active)
      .map(item => ({
        ...item,
        status: store.expiryStatus(item.expiryDate),
        quantityText: `${item.quantity} ${item.unit || ""}`.trim(),
        expiryText: item.expiryDate ? `保质期至 ${item.expiryDate}` : "未填保质期"
      }))

    if (this.data.sortMode === "expiry") {
      list = list.sort((a, b) => {
        const ax = a.expiryDate ? new Date(a.expiryDate.replace(/-/g, "/")).getTime() : Infinity
        const bx = b.expiryDate ? new Date(b.expiryDate.replace(/-/g, "/")).getTime() : Infinity
        return ax - bx
      })
    } else {
      list = list.sort((a, b) => {
        const rank = { expired: 0, soon: 1, ok: 2, none: 3 }
        return (rank[a.status] || 9) - (rank[b.status] || 9)
      })
    }
    this.setData({ filtered: list, reminder: this.buildReminder(list, now) })
  },

  buildReminder(list) {
    const expired = list.filter(i => i.status === "expired").length
    const soon = list.filter(i => i.status === "soon").length
    if (!expired && !soon) return null
    return { expired, soon }
  },

  onCategory(event) {
    this.setData({ activeCategory: event.currentTarget.dataset.cat }, () => this.applyFilter())
  },

  onSort(event) {
    this.setData({ sortMode: event.currentTarget.dataset.mode }, () => this.applyFilter())
  },

  addItem() {
    wx.navigateTo({ url: "/pages/inventory-form/index" })
  },

  scanReceipt() {
    wx.navigateTo({ url: "/pages/receipt-scan/index" })
  },

  editItem(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/inventory-form/index?id=${id}` })
  }
})
