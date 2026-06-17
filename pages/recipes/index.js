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
    this.setData({ recipes }, this.applyFilter)
  },

  applyFilter() {
    const keyword = this.data.keyword.trim().toLowerCase()
    const filteredRecipes = this.data.recipes
      .filter(item => {
        const text = `${item.name} ${item.category} ${item.ingredients}`.toLowerCase()
        return !keyword || text.includes(keyword)
      })
      .map(item => ({
        ...item,
        ingredientsPreview: (item.ingredients || "").split("\n").slice(0, 2).join("、")
      }))

    this.setData({ filteredRecipes })
  },

  onSearch(event) {
    this.setData({ keyword: event.detail.value }, this.applyFilter)
  },

  addRecipe() {
    wx.navigateTo({ url: "/pages/recipe-form/index" })
  },

  editRecipe(event) {
    const id = event.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/recipe-form/index?id=${id}` })
  }
})
