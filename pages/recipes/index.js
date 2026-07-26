const store = require("../../utils/store")

Page({
  data: {
    recipes: [],
    groups: [],
    categories: ["全部"],
    activeCategory: "全部",
    keyword: ""
  },

  onShow() {
    this.refresh()
  },

  async refresh() {
    try {
      const recipes = await store.getRecipes()
      const categories = ["全部", ...Array.from(new Set(recipes.map(r => r.category || "未分类")))]
      this.setData({ recipes, categories }, () => this.applyFilter())
    } catch (e) {
      console.error("[recipes] 加载失败：", e)
    }
  },

  applyFilter() {
    const keyword = this.data.keyword.trim().toLowerCase()
    const active = this.data.activeCategory
    const visible = this.data.recipes.filter(item => {
      const text = `${item.name} ${item.category}`.toLowerCase()
      const matchKw = !keyword || text.includes(keyword)
      const matchCat = active === "全部" || (item.category || "未分类") === active
      return matchKw && matchCat
    })

    const groups = []
    visible.forEach(item => {
      const ingredients = store.normalizeIngredients(item)
      const preview = ingredients
        .slice(0, 3)
        .map(it => (it.qty ? `${it.name}${it.qty}${it.unit}` : it.name))
        .join("、")
      const entry = { ...item, ingredients, preview }
      let group = groups.find(g => g.category === (item.category || "未分类"))
      if (!group) {
        group = { category: item.category || "未分类", items: [] }
        groups.push(group)
      }
      group.items.push(entry)
    })

    this.setData({ groups })
  },

  setCategory(event) {
    this.setData({ activeCategory: event.currentTarget.dataset.cat }, () => this.applyFilter())
  },

  onSearch(event) {
    this.setData({ keyword: event.detail.value }, () => this.applyFilter())
  },

  addRecipe() {
    wx.navigateTo({ url: "/pages/recipe-form/index" })
  },

  editRecipe(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/recipe-form/index?id=${id}` })
  }
})
