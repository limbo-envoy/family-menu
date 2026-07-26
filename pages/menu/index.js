const store = require("../../utils/store")

const MODE_RECIPE = "recipe"
const MODE_CUSTOM = "custom"

let plannedKeySeq = 0

Page({
  data: {
    mode: MODE_RECIPE,
    keyword: "",
    expandedId: "",
    categories: ["全部"],
    activeCategory: "全部",
    recipes: [],
    filteredRecipes: [],
    recommended: [],
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

  async refresh() {
    try {
      const recipes = await store.getRecipes()
      const inventory = await store.getInventory()
      const recommended = await store.recommendRecipes(6)
      const categories = store.orderedCategories(recipes)
      this.setData({ recipes, inventory, recommended, categories }, async () => {
        await this.applyRecipeFilter()
        this.buildCustomView()
      })
    } catch (e) {
      console.error("[menu] 加载失败：", e)
    }
  },

  /* ---------- 模式切换 ---------- */
  switchMode(event) {
    this.setData({ mode: event.currentTarget.dataset.mode })
  },

  /* ---------- 选菜谱模式 ---------- */
  async applyRecipeFilter() {
    const keyword = this.data.keyword.trim().toLowerCase()
    const active = this.data.activeCategory
    const filteredRecipes = []
    for (const item of this.data.recipes) {
      const text = `${item.name} ${item.category}`.toLowerCase()
      if (keyword && !text.includes(keyword)) continue
      if (active !== "全部" && (item.category || "未分类") !== active) continue
      const check = await store.checkRecipe(item)
      filteredRecipes.push({
        ...item,
        missingCount: check.missing.length,
        enough: check.ok,
        ingredientLines: check.lines.map(l => ({
          name: l.name,
          unit: l.unit,
          qty: l.required,
          available: l.available,
          sufficient: l.sufficient
        }))
      })
    }
    this.setData({ filteredRecipes })
  },

  onSearch(event) {
    this.setData({ keyword: event.detail.value }, () => this.applyRecipeFilter())
  },

  setCategory(event) {
    this.setData({ activeCategory: event.currentTarget.dataset.cat }, () => this.applyRecipeFilter())
  },

  // 点击菜名展开/收起食材清单
  toggleRecipe(event) {
    const id = event.currentTarget.dataset.id
    this.setData({ expandedId: this.data.expandedId === id ? "" : id })
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
  async openConfirm() {
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
    const lines = []
    for (const a of Object.values(agg)) {
      const available = await store.getInventoryTotalByName(a.name)
      const consume = Math.min(a.required, available)
      lines.push({
        name: a.name,
        unit: a.unit,
        required: a.required,
        available,
        consume,
        shortage: Math.max(0, a.required - consume)
      })
    }
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

  async confirmCook() {
    const lines = this.data.confirm.lines
    const finalReqs = lines.map(l => ({
      name: l.name,
      qty: Number(l.consume) || 0,
      unit: l.unit
    }))
    const results = await store.consumeInventory(finalReqs)
    const consumed = results.map(r => ({
      name: r.name,
      unit: r.unit,
      required: r.required,
      consumed: r.consumed,
      shortage: r.shortage
    }))
    await store.saveOrder({
      note: this.data.note.trim(),
      dishes: this.data.planned.map(d => ({ name: d.name, type: d.type })),
      consumed
    })

    this.setData({
      planned: [],
      note: "",
      confirm: { open: false, lines: [], hasShortage: false, totalShort: 0 }
    })
    await this.refresh()
    wx.showToast({ title: "已扣减并记账", icon: "success" })
  },

  goInventory() {
    wx.switchTab({ url: "/pages/inventory/index" })
  }
})
