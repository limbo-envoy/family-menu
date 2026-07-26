const store = require("../../utils/store")

Page({
  data: {
    recipes: [],
    filteredRecipes: [],
    keyword: ""
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const recipes = store.getRecipes()
    this.setData({ recipes }, () => this.applyFilter())
  },

  applyFilter() {
    const keyword = this.data.keyword.trim().toLowerCase()
    const filteredRecipes = this.data.recipes
      .filter(item => {
        const text = `${item.name} ${item.category}`.toLowerCase()
        return !keyword || text.includes(keyword)
      })
      .map(item => {
        const ingredients = store.normalizeIngredients(item)
        const preview = ingredients
          .slice(0, 3)
          .map(it => (it.qty ? `${it.name}${it.qty}${it.unit}` : it.name))
          .join("、")
        return { ...item, ingredients, preview }
      })

    this.setData({ filteredRecipes })
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
