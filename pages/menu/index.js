const store = require("../../utils/store")

Page({
  data: {
    recipes: [],
    filteredRecipes: [],
    cart: {},
    cartItems: [],
    keyword: "",
    note: "",
    totalDishes: 0,
    totalQty: 0
  },

  onShow() {
    this.refresh()
  },

  refresh() {
    const recipes = store.getRecipes()
    const cart = store.getCart()
    this.setData({ recipes, cart }, this.applyFilter)
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
        qty: this.data.cart[item.id] || 0,
        ingredientsPreview: (item.ingredients || "").split("\n").slice(0, 2).join("、")
      }))

    const cartItems = this.data.recipes
      .filter(item => this.data.cart[item.id])
      .map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        qty: this.data.cart[item.id]
      }))
    const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0)

    this.setData({
      filteredRecipes,
      cartItems,
      totalDishes: cartItems.length,
      totalQty
    })
  },

  onSearch(event) {
    this.setData({ keyword: event.detail.value }, this.applyFilter)
  },

  onNoteInput(event) {
    this.setData({ note: event.detail.value })
  },

  plus(event) {
    const id = event.currentTarget.dataset.id
    const cart = { ...this.data.cart, [id]: (this.data.cart[id] || 0) + 1 }
    store.setCart(cart)
    this.setData({ cart }, this.applyFilter)
  },

  minus(event) {
    const id = event.currentTarget.dataset.id
    const cart = { ...this.data.cart }
    const nextQty = (cart[id] || 0) - 1

    if (nextQty > 0) {
      cart[id] = nextQty
    } else {
      delete cart[id]
    }

    store.setCart(cart)
    this.setData({ cart }, this.applyFilter)
  },

  saveOrder() {
    if (!this.data.cartItems.length) {
      wx.showToast({ title: "先点几道菜", icon: "none" })
      return
    }

    store.saveOrder({
      note: this.data.note.trim(),
      items: this.data.cartItems
    })
    store.setCart({})
    this.setData({ cart: {}, note: "" }, this.applyFilter)
    wx.showToast({ title: "已保存" })
  },

  goRecipes() {
    wx.switchTab({ url: "/pages/recipes/index" })
  }
})
