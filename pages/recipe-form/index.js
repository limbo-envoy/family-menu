const store = require("../../utils/store")

const emptyForm = {
  id: "",
  name: "",
  category: "",
  steps: "",
  note: "",
  createdAt: ""
}

Page({
  data: {
    form: { ...emptyForm },
    ingredients: []
  },

  onLoad(options) {
    if (!options.id) return
    const recipe = store.getRecipeById(options.id)
    if (recipe) {
      const ingredients = store.normalizeIngredients(recipe)
      this.setData({
        form: { ...emptyForm, id: recipe.id, name: recipe.name, category: recipe.category, steps: recipe.steps, note: recipe.note, createdAt: recipe.createdAt },
        ingredients
      })
    }
  },

  onInput(event) {
    const field = event.currentTarget.dataset.field
    this.setData({ form: { ...this.data.form, [field]: event.detail.value } })
  },

  onIngredientInput(event) {
    const { index, field } = event.currentTarget.dataset
    const ingredients = this.data.ingredients.slice()
    ingredients[index] = { ...ingredients[index], [field]: event.detail.value }
    this.setData({ ingredients })
  },

  addIngredient() {
    this.setData({ ingredients: [...this.data.ingredients, { name: "", qty: "", unit: "" }] })
  },

  removeIngredient(event) {
    const index = event.currentTarget.dataset.index
    const ingredients = this.data.ingredients.slice()
    ingredients.splice(index, 1)
    this.setData({ ingredients })
  },

  saveRecipe() {
    const form = {
      ...this.data.form,
      name: this.data.form.name.trim(),
      category: this.data.form.category.trim(),
      steps: this.data.form.steps.trim(),
      note: this.data.form.note.trim()
    }

    if (!form.name) {
      wx.showToast({ title: "先写菜名", icon: "none" })
      return
    }

    const ingredients = this.data.ingredients
      .map(it => ({
        name: String(it.name || "").trim(),
        qty: Number(it.qty) || 0,
        unit: String(it.unit || "").trim()
      }))
      .filter(it => it.name)

    store.saveRecipe({ ...form, ingredients })
    wx.showToast({ title: "已保存" })
    setTimeout(() => wx.navigateBack(), 500)
  },

  confirmRemove() {
    wx.showModal({
      title: "删除菜谱",
      content: "删除后，今日菜单里的这道菜也会移除。",
      confirmColor: "#b94732",
      success: result => {
        if (!result.confirm) return
        store.removeRecipe(this.data.form.id)
        wx.showToast({ title: "已删除" })
        setTimeout(() => wx.navigateBack(), 500)
      }
    })
  }
})
