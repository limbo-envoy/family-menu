const KEYS = {
  recipes: "family_menu_recipes",
  cart: "family_menu_cart",
  orders: "family_menu_orders"
}

const seedRecipes = [
  {
    id: "seed-tomato-egg",
    name: "番茄炒蛋",
    category: "家常菜",
    ingredients: "番茄 2 个\n鸡蛋 3 个\n葱花 少许",
    steps: "1. 鸡蛋打散，先炒到定型盛出\n2. 番茄炒出汁，加少量盐和糖\n3. 倒回鸡蛋，翻匀后撒葱花",
    note: "想拌饭就多留一点汤汁",
    createdAt: "2026-01-01 12:00"
  },
  {
    id: "seed-braised-pork",
    name: "土豆红烧肉",
    category: "硬菜",
    ingredients: "五花肉 500g\n土豆 2 个\n冰糖、姜片、生抽、老抽",
    steps: "1. 五花肉焯水后煸出油\n2. 冰糖炒糖色，放肉块翻炒\n3. 加调料和热水炖 35 分钟\n4. 放土豆再炖 15 分钟",
    note: "第二顿加热更入味",
    createdAt: "2026-01-01 12:00"
  },
  {
    id: "seed-cucumber",
    name: "拍黄瓜",
    category: "凉菜",
    ingredients: "黄瓜 2 根\n蒜末、香醋、生抽、香油",
    steps: "1. 黄瓜拍裂切段\n2. 加调料拌匀\n3. 冷藏 10 分钟再吃",
    note: "适合配油腻一点的主菜",
    createdAt: "2026-01-01 12:00"
  }
]

function formatDate(date) {
  const pad = value => String(value).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

function getList(key) {
  return wx.getStorageSync(key) || []
}

function setList(key, list) {
  wx.setStorageSync(key, list)
}

function ensureSeedRecipes() {
  const recipes = getList(KEYS.recipes)
  if (!recipes.length) {
    setList(KEYS.recipes, seedRecipes)
  }
}

function getRecipes() {
  ensureSeedRecipes()
  return getList(KEYS.recipes)
}

function saveRecipe(recipe) {
  const recipes = getRecipes()
  const now = formatDate(new Date())
  const nextRecipe = {
    ...recipe,
    id: recipe.id || createId("recipe"),
    updatedAt: now,
    createdAt: recipe.createdAt || now
  }
  const index = recipes.findIndex(item => item.id === nextRecipe.id)

  if (index >= 0) {
    recipes[index] = nextRecipe
  } else {
    recipes.unshift(nextRecipe)
  }

  setList(KEYS.recipes, recipes)
  return nextRecipe
}

function removeRecipe(id) {
  setList(KEYS.recipes, getRecipes().filter(item => item.id !== id))
  const cart = getCart()
  delete cart[id]
  setCart(cart)
}

function getCart() {
  return wx.getStorageSync(KEYS.cart) || {}
}

function setCart(cart) {
  wx.setStorageSync(KEYS.cart, cart)
}

function getOrders() {
  return getList(KEYS.orders)
}

function saveOrder(order) {
  const orders = getOrders()
  const nextOrder = {
    id: createId("order"),
    createdAt: formatDate(new Date()),
    ...order
  }
  orders.unshift(nextOrder)
  setList(KEYS.orders, orders)
  return nextOrder
}

function removeOrder(id) {
  setList(KEYS.orders, getOrders().filter(item => item.id !== id))
}

module.exports = {
  ensureSeedRecipes,
  getRecipes,
  saveRecipe,
  removeRecipe,
  getCart,
  setCart,
  getOrders,
  saveOrder,
  removeOrder
}
