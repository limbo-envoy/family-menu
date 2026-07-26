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
    today: todayStr(),
    storageTip: "",
    hintDays: 0,
    hintMatched: false
  },

  async onLoad(options) {
    if (!options.id) return
    const item = await store.getInventoryItem(options.id)
    if (item) {
      const categoryIndex = Math.max(0, store.CATEGORIES.indexOf(item.category))
      const form = { ...emptyForm, ...item, quantity: item.quantity === 0 ? "0" : String(item.quantity) }
      this.setData({ form, categoryIndex }, () => {
        // 仅展示保存方法，不覆盖用户已填的分类/日期
        if (item.name) this.applyHint(form, item.name, false)
      })
    }
  },

  onInput(event) {
    const field = event.currentTarget.dataset.field
    const value = event.detail.value
    const form = { ...this.data.form, [field]: value }
    if (field === "name") {
      // 输英文名时自动归类、算保质期、展示保存方法
      this.applyHint(form, value, true)
    } else {
      this.setData({ form })
    }
  },

  // 根据食材名自动带出分类、保质期与保存方法
  // overwrite=true：用于输入名称时，自动填分类/购入日/到期日；
  // overwrite=false：用于编辑已有项时，仅展示保存方法，不覆盖原值。
  applyHint(baseForm, name, overwrite) {
    const hint = store.getIngredientHint(name)
    const form = { ...baseForm }
    const patch = {
      storageTip: hint.tip,
      hintDays: hint.days,
      hintMatched: hint.matched
    }
    if (overwrite) {
      const idx = Math.max(0, store.CATEGORIES.indexOf(hint.category))
      form.category = hint.category
      patch.categoryIndex = idx
      const purchase = form.purchaseDate || this.data.today
      form.purchaseDate = purchase
      form.expiryDate = store.addDays(purchase, hint.days)
    }
    patch.form = form
    this.setData(patch)
  },

  onCategoryChange(event) {
    const categoryIndex = Number(event.detail.value)
    this.setData({
      categoryIndex,
      form: { ...this.data.form, category: store.CATEGORIES[categoryIndex] }
    })
  },

  onPurchaseDate(event) {
    const purchaseDate = event.detail.value
    const form = { ...this.data.form, purchaseDate }
    // 改了购入日，按保存方法对应的保质期重算到期日
    if (this.data.hintDays > 0) {
      form.expiryDate = store.addDays(purchaseDate, this.data.hintDays)
    }
    this.setData({ form })
  },

  onExpiryDate(event) {
    this.setData({ form: { ...this.data.form, expiryDate: event.detail.value } })
  },

  async saveItem() {
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

    await store.saveInventoryItem({
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
      success: async result => {
        if (!result.confirm) return
        await store.removeInventoryItem(this.data.form.id)
        wx.showToast({ title: "已删除" })
        setTimeout(() => wx.navigateBack(), 500)
      }
    })
  }
})
