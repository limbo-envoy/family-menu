const KEYS = {
  recipes: "family_menu_recipes",
  cart: "family_menu_cart",
  orders: "family_menu_orders",
  inventory: "family_menu_inventory"
}

// 食材四大分类
const CATEGORIES = ["普通食材类", "调味料类", "冷冻类", "水果类"]

const seedRecipes = [
  {
    id: "seed-tomato-egg",
    name: "番茄炒蛋",
    category: "家常菜",
    ingredients: [
      { name: "番茄", qty: 2, unit: "个" },
      { name: "鸡蛋", qty: 3, unit: "个" },
      { name: "葱花", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡蛋打散，先炒到定型盛出\n2. 番茄炒出汁，加少量盐和糖\n3. 倒回鸡蛋，翻匀后撒葱花",
    note: "想拌饭就多留一点汤汁",
    createdAt: "2026-01-01 12:00"
  },
  {
    id: "seed-braised-pork",
    name: "土豆红烧肉",
    category: "硬菜",
    ingredients: [
      { name: "五花肉", qty: 500, unit: "g" },
      { name: "土豆", qty: 2, unit: "个" },
      { name: "冰糖", qty: 1, unit: "份" },
      { name: "姜片", qty: 1, unit: "份" }
    ],
    steps: "1. 五花肉焯水后煸出油\n2. 冰糖炒糖色，放肉块翻炒\n3. 加调料和热水炖 35 分钟\n4. 放土豆再炖 15 分钟",
    note: "第二顿加热更入味",
    createdAt: "2026-01-01 12:00"
  },
  {
    id: "seed-cucumber",
    name: "拍黄瓜",
    category: "凉菜",
    ingredients: [
      { name: "黄瓜", qty: 2, unit: "根" },
      { name: "蒜末", qty: 1, unit: "份" }
    ],
    steps: "1. 黄瓜拍裂切段\n2. 加调料拌匀\n3. 冷藏 10 分钟再吃",
    note: "适合配油腻一点的主菜",
    createdAt: "2026-01-01 12:00"
  }
]

// 示例库存：方便第一次试用就能看到「检查食材」和「扣减」的效果
const seedInventory = [
  { id: "seed-inv-egg", name: "鸡蛋", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-08-08", quantity: 10, unit: "个" },
  { id: "seed-inv-tomato", name: "番茄", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 4, unit: "个" },
  { id: "seed-inv-pork", name: "五花肉", category: "冷冻类", purchaseDate: "2026-07-20", expiryDate: "2026-08-10", quantity: 500, unit: "g" },
  { id: "seed-inv-salt", name: "盐", category: "调味料类", purchaseDate: "2026-06-01", expiryDate: "2027-06-01", quantity: 1, unit: "瓶" },
  { id: "seed-inv-apple", name: "苹果", category: "水果类", purchaseDate: "2026-07-24", expiryDate: "2026-07-31", quantity: 6, unit: "个" }
]

function formatDate(date) {
  const pad = value => String(value).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function formatDay(date) {
  const pad = value => String(value).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function todayStr() {
  return formatDay(new Date())
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`
}

// 食材名称归一化：去空格、转小写，便于跨来源匹配
function normalizeName(name) {
  return String(name || "").trim().replace(/\s+/g, "").toLowerCase()
}

function getList(key) {
  return wx.getStorageSync(key) || []
}

function setList(key, list) {
  wx.setStorageSync(key, list)
}

/* ---------------- 菜谱 ---------------- */

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

// 把菜谱里的 ingredients 统一成 [{name, qty, unit}] 结构
// 兼容旧版的纯文本写法（按行拆分，缺用量按 1 处理）
function normalizeIngredients(recipe) {
  let list = recipe && recipe.ingredients
  if (typeof list === "string") {
    list = list
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => ({ name: line, qty: 1, unit: "" }))
  }
  if (!Array.isArray(list)) list = []
  return list
    .map(it => ({
      name: String(it.name || "").trim(),
      qty: Number(it.qty) || 0,
      unit: String(it.unit || "").trim()
    }))
    .filter(it => it.name)
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

function getRecipeById(id) {
  return getRecipes().find(item => item.id === id) || null
}

/* ---------------- 购物车（兼容旧逻辑，保留但不再主用） ---------------- */

function getCart() {
  return wx.getStorageSync(KEYS.cart) || {}
}

function setCart(cart) {
  wx.setStorageSync(KEYS.cart, cart)
}

/* ---------------- 食材库存 ---------------- */

function ensureSeedInventory() {
  const inventory = getList(KEYS.inventory)
  if (!inventory.length) {
    setList(KEYS.inventory, seedInventory)
  }
}

function getInventory() {
  ensureSeedInventory()
  return getList(KEYS.inventory)
}

function saveInventoryItem(item) {
  const inventory = getInventory()
  const now = formatDate(new Date())
  const nextItem = {
    ...item,
    id: item.id || createId("inv"),
    quantity: Number(item.quantity) || 0,
    createdAt: item.createdAt || now,
    updatedAt: now
  }
  const index = inventory.findIndex(it => it.id === nextItem.id)

  if (index >= 0) {
    inventory[index] = nextItem
  } else {
    inventory.unshift(nextItem)
  }

  setList(KEYS.inventory, inventory)
  return nextItem
}

function removeInventoryItem(id) {
  setList(KEYS.inventory, getInventory().filter(it => it.id !== id))
}

function getInventoryItem(id) {
  return getInventory().find(it => it.id === id) || null
}

// 按名称汇总某食材的库存总量
function getInventoryTotalByName(name) {
  return getInventory()
    .filter(it => normalizeName(it.name) === normalizeName(name))
    .reduce((sum, it) => sum + (Number(it.quantity) || 0), 0)
}

// 保质期状态：ok 正常 / soon 临期(<=3天) / expired 已过期 / none 未填
function expiryStatus(expiryDate) {
  if (!expiryDate) return "none"
  const today = new Date(todayStr().replace(/-/g, "/"))
  const exp = new Date(String(expiryDate).replace(/-/g, "/"))
  if (isNaN(exp.getTime())) return "none"
  const diff = Math.round((exp.getTime() - today.getTime()) / 86400000)
  if (diff < 0) return "expired"
  if (diff <= 3) return "soon"
  return "ok"
}

// 检查一组需求 [{name, qty, unit}] 的库存满足情况
function checkAvailability(requirements) {
  return (requirements || []).map(req => {
    const available = getInventoryTotalByName(req.name)
    const required = Number(req.qty) || 0
    return {
      name: req.name,
      unit: req.unit || "",
      required,
      available,
      sufficient: available >= required
    }
  })
}

// 检查单个菜谱是否食材充足，返回 {ok, missing:[{name,required,available}]}
function checkRecipe(recipe) {
  const requirements = normalizeIngredients(recipe)
  const lines = checkAvailability(requirements)
  const missing = lines.filter(l => !l.sufficient)
  return {
    ok: missing.length === 0,
    missing,
    lines
  }
}

  // 扣减库存：requirements=[{name, qty, unit}]，按购入日期早的优先消耗（FIFO）
  // 返回 [{name, unit, required, consumed, shortage}]
  function consumeInventory(requirements) {
    const inventory = getInventory()
    const results = []
    const toRemove = []

    ;(requirements || []).forEach(req => {
    const target = normalizeName(req.name)
    const needed = Number(req.qty) || 0
    // 同名称库存按购入日期升序（早买的先吃），未填购入日期的排后面
    const matched = inventory
      .filter(it => normalizeName(it.name) === target)
      .sort((a, b) => {
        const ta = a.purchaseDate ? new Date(a.purchaseDate.replace(/-/g, "/")).getTime() : Infinity
        const tb = b.purchaseDate ? new Date(b.purchaseDate.replace(/-/g, "/")).getTime() : Infinity
        return ta - tb
      })

    let need = needed
    let consumed = 0

    matched.forEach(item => {
      if (need <= 0) return
      const take = Math.min(Number(item.quantity) || 0, need)
      if (take <= 0) return
      item.quantity = Number(item.quantity) - take
      need -= take
      consumed += take
      if (item.quantity <= 0) toRemove.push(item.id)
    })

    results.push({
      name: req.name,
      unit: req.unit || "",
      required: needed,
      consumed,
      shortage: Math.max(0, needed - consumed)
    })
  })

  // 写回库存（移除归零项）
  const remain = inventory.filter(it => !toRemove.includes(it.id))
  setList(KEYS.inventory, remain)

  return results
}

/* ---------------- 做饭记录（记账） ---------------- */

function getOrders() {
  return getList(KEYS.orders)
}

// order: { note, dishes:[{name, type}], consumed:[{name, unit, required, consumed, shortage}] }
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
  CATEGORIES,
  normalizeName,
  ensureSeedRecipes,
  getRecipes,
  getRecipeById,
  normalizeIngredients,
  saveRecipe,
  removeRecipe,
  getCart,
  setCart,
  ensureSeedInventory,
  getInventory,
  getInventoryItem,
  getInventoryTotalByName,
  saveInventoryItem,
  removeInventoryItem,
  expiryStatus,
  checkAvailability,
  checkRecipe,
  consumeInventory,
  getOrders,
  saveOrder,
  removeOrder
}
