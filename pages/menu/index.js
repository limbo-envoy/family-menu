const store = require("../../utils/store")

const MODE_RECIPE = "recipe"
const MODE_CUSTOM = "custom"

let plannedKeySeq = 0

Page({
  data: {
    mode: MODE_RECIPE,
    keyword: "",
    recipes: [],
    filteredRecipes: [],
    inventory: [],
    customIngredients: [], // 配食材视图：库存项 + useQty
    customName: "",
    planned: [], // [{key, type, name, requirements:[{name,qty,unit}]}]
    note: "",
    confirm: {
      open: false,
      lines: [],
      hasShortage: false,
      totalShort: 0
    }
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const recipes = store.getRecipes()
    const inventory = store.getInventory()
    this.setData({ recipes, inventory }, () => {
      this.applyRecipeFilter()
      this.buildCustomView()
    })
  },

  /* ---------- 模式切换 ---------- */
  switchMode(event) {
    this.setData({ mode: event.currentTarget.dataset.mode })
  },

  /* ---------- 选菜谱模式 ---------- */
  applyRecipeFilter() {
    const keyword = this.data.keyword.trim().toLowerCase()
    const filteredRecipes = this.data.recipes
      .filter(item => {
        const text = `${item.name} ${item.category}`.toLowerCase()
        return !keyword || text.includes(keyword)
      })
      .map(item => {
        const check = store.checkRecipe(item)
        return {
          ...item,
          missingCount: check.missing.length,
          enough: check.ok
        }
      })
    this.setData({ filteredRecipes })
  },

  onSearch(event) {
    this.setData({ keyword: event.detail.value }, () => this.applyRecipeFilter())
  },

  addRecipeDish(event) {
    const id = event.currentTarget.dataset.id
    const recipe = this.data.recipes.find(r => r.id === id)
    if (!recipe) return
    const requirements = store.normalizeIngredients(recipe)
    const dish = {
      key: `dish-${++plannedKeySeq}`,
      type: MODE_RECIPE,
      name: recipe.name,
      recipeId: id,
      requirements
    }
    this.setData({ planned: [...this.data.planned, dish] })
    wx.showToast({ title: "已加入本餐", icon: "none" })
  },

  /* ---------- 配食材模式 ---------- */
  buildCustomView() {
    const customIngredients = this.data.inventory.map(item => ({
      id: item.id,
      name: item.name,
      unit: item.unit,
      remaining: Number(item.quantity) || 0,
      useQty: 0
    }))
    this.setData({ customIngredients })
  },

  onCustomName(event) {
    this.setData({ customName: event.detail.value })
  },

  stepCustom(event) {
    const { id, delta } = event.currentTarget.dataset
    const customIngredients = this.data.customIngredients.map(it => {
      if (it.id !== id) return it
      let useQty = it.useQty + Number(delta)
      if (useQty < 0) useQty = 0
      if (useQty > it.remaining) useQty = it.remaining
      return { ...it, useQty }
    })
    this.setData({ customIngredients })
  },

  addCustomDish() {
    const picked = this.data.customIngredients.filter(it => it.useQty > 0)
    if (!picked.length) {
      wx.showToast({ title: "先选点食材", icon: "none" })
      return
    }
    const name = this.data.customName.trim() || "自制菜"
    const requirements = picked.map(it => ({
      name: it.name,
      qty: it.useQty,
      unit: it.unit
    }))
    const dish = {
      key: `dish-${++plannedKeySeq}`,
      type: MODE_CUSTOM,
      name,
      requirements
    }
    this.setData({
      planned: [...this.data.planned, dish],
      customName: "",
      customIngredients: this.data.customIngredients.map(it => ({ ...it, useQty: 0 }))
    })
    wx.showToast({ title: "已加入本餐", icon: "none" })
  },

  /* ---------- 本餐清单 ---------- */
  removeDish(event) {
    const key = event.currentTarget.dataset.key
    this.setData({ planned: this.data.planned.filter(d => d.key !== key) })
  },

  onNote(event) {
    this.setData({ note: event.detail.value })
  },

  /* ---------- 确认开做（弹层） ---------- */
  openConfirm() {
    if (!this.data.planned.length) {
      wx.showToast({ title: "先加几道菜到本餐", icon: "none" })
      return
    }
    const agg = {}
    this.data.planned.forEach(d => {
      d.requirements.forEach(req => {
        const key = store.normalizeName(req.name)
        if (!agg[key]) agg[key] = { name: req.name, unit: req.unit, required: 0 }
        agg[key].required += Number(req.qty) || 0
      })
    })
    const lines = Object.values(agg).map(a => {
      const available = store.getInventoryTotalByName(a.name)
      const consume = Math.min(a.required, available)
      return {
        name: a.name,
        unit: a.unit,
        required: a.required,
        available,
        consume,
        shortage: Math.max(0, a.required - consume)
      }
    })
    const totalShort = lines.reduce((s, l) => s + l.shortage, 0)
    const hasShortage = totalShort > 0
    this.setData({
      confirm: { open: true, lines, hasShortage, totalShort }
    })
  },

  closeConfirm() {
    this.setData({ confirm: { ...this.data.confirm, open: false } })
  },

  noop() {},

  onConsumeInput(event) {
    const index = event.currentTarget.dataset.index
    let value = Number(event.detail.value) || 0
    const line = this.data.confirm.lines[index]
    if (value < 0) value = 0
    if (value > line.available) value = line.available
    const lines = this.data.confirm.lines.slice()
    lines[index] = {
      ...line,
      consume: value,
      shortage: Math.max(0, line.required - value)
    }
    const totalShort = lines.reduce((s, l) => s + l.shortage, 0)
    this.setData({
      confirm: { ...this.data.confirm, lines, totalShort, hasShortage: totalShort > 0 }
    })
  },

  confirmCook() {
    const lines = this.data.confirm.lines
    const finalReqs = lines.map(l => ({
      name: l.name,
      qty: Number(l.consume) || 0,
      unit: l.unit
    }))
    const results = store.consumeInventory(finalReqs)
    const consumed = results.map(r => ({
      name: r.name,
      unit: r.unit,
      required: r.required,
      consumed: r.consumed,
      shortage: r.shortage
    }))
    store.saveOrder({
      note: this.data.note.trim(),
      dishes: this.data.planned.map(d => ({ name: d.name, type: d.type })),
      consumed
    })

    this.setData({
      planned: [],
      note: "",
      confirm: { open: false, lines: [], hasShortage: false, totalShort: 0 }
    })
    this.refresh()
    wx.showToast({ title: "已扣减并记账", icon: "success" })
  },

  goInventory() {
    wx.switchTab({ url: "/pages/inventory/index" })
  }
})
