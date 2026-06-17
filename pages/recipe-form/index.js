const store = require("../../utils/store")

const emptyForm = {
  id: "",
  name: "",
  category: "",
  ingredients: "",
  steps: "",
  note: "",
  createdAt: ""
}

Page({
  data: {
    form: { ...emptyForm }
  },

  onLoad(options) {
    if (!options.id) return

    const recipe = store.getRecipes().find(item => item.id === options.id)
    if (recipe) {
      this.setData({ form: { ...emptyForm, ...recipe } })
    }
  },

  onInput(event) {
    const field = event.currentTarget.dataset.field
    this.setData({
      form: {
        ...this.data.form,
        [field]: event.detail.value
      }
    })
  },

  saveRecipe() {
    const form = {
      ...this.data.form,
      name: this.data.form.name.trim(),
      category: this.data.form.category.trim(),
      ingredients: this.data.form.ingredients.trim(),
      steps: this.data.form.steps.trim(),
      note: this.data.form.note.trim()
    }

    if (!form.name) {
      wx.showToast({ title: "先写菜名", icon: "none" })
      return
    }

    store.saveRecipe(form)
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
