const KEYS = {
  recipes: "family_menu_recipes",
  cart: "family_menu_cart",
  orders: "family_menu_orders",
  inventory: "family_menu_inventory"
}

// 食材四大分类
const CATEGORIES = ["普通食材类", "调味料类", "冷冻类", "水果类"]

// 食材保存知识库：名称(归一化) -> { category, days, tip }
// days 为该保存方式下的建议保质期（天），tip 是具体保存方法
const INGREDIENT_HINTS = {
  /* ---- 普通食材类（多为生鲜蔬果、豆腐、米面干货）---- */
  "番茄": { category: "普通食材类", days: 5, tip: "冷藏存放，吃前再洗，约 5 天内吃完" },
  "土豆": { category: "普通食材类", days: 30, tip: "阴凉通风、避光处存放，发芽变绿后不要食用" },
  "黄瓜": { category: "普通食材类", days: 5, tip: "冷藏并用保鲜膜包好，约 5 天内吃完" },
  "青椒": { category: "普通食材类", days: 7, tip: "冷藏保存，约 1 周内吃完" },
  "茄子": { category: "普通食材类", days: 5, tip: "冷藏存放，不要水洗，约 5 天内吃完" },
  "洋葱": { category: "普通食材类", days: 30, tip: "阴凉通风处存放，避免发芽，可放约 1 个月" },
  "胡萝卜": { category: "普通食材类", days: 14, tip: "冷藏保存，擦干装袋，约 2 周内吃完" },
  "白菜": { category: "普通食材类", days: 7, tip: "冷藏保存，外层菜帮易坏先吃" },
  "西兰花": { category: "普通食材类", days: 5, tip: "冷藏并用保鲜膜包裹，约 5 天内吃完" },
  "包菜": { category: "普通食材类", days: 7, tip: "冷藏保存，整颗可放约 1 周" },
  "生菜": { category: "普通食材类", days: 4, tip: "冷藏并用纸巾包裹吸潮，约 4 天内吃完" },
  "油麦菜": { category: "普通食材类", days: 3, tip: "冷藏保存，易蔫，尽快食用" },
  "空心菜": { category: "普通食材类", days: 3, tip: "冷藏保存，叶菜易坏，2-3 天内吃完" },
  "芹菜": { category: "普通食材类", days: 7, tip: "冷藏并用湿纸巾包根部，约 1 周" },
  "西葫芦": { category: "普通食材类", days: 5, tip: "冷藏保存，约 5 天内吃完" },
  "四季豆": { category: "普通食材类", days: 5, tip: "冷藏保存，务必彻底煮熟后食用" },
  "豆芽": { category: "普通食材类", days: 2, tip: "冷藏保存，极易变质，2 天内吃完" },
  "青菜": { category: "普通食材类", days: 3, tip: "冷藏保存，叶菜尽快食用" },
  "菜心": { category: "普通食材类", days: 3, tip: "冷藏保存，约 3 天内吃完" },
  "萝卜": { category: "普通食材类", days: 14, tip: "冷藏保存，切开的需包好，约 2 周内吃完" },
  "莲藕": { category: "普通食材类", days: 7, tip: "去皮后泡水冷藏，约 1 周内吃完" },
  "香菇": { category: "普通食材类", days: 5, tip: "冷藏保存，鲜菇约 5 天内吃完" },
  "蘑菇": { category: "普通食材类", days: 4, tip: "冷藏并用纸袋装，约 4 天内吃完" },
  "玉米": { category: "普通食材类", days: 5, tip: "冷藏保存，带皮更新鲜，约 5 天内吃完" },
  "冬瓜": { category: "普通食材类", days: 7, tip: "切块后冷藏并盖保鲜膜，约 1 周内吃完" },
  "豆腐": { category: "普通食材类", days: 2, tip: "冷藏保存，泡淡盐水可稍延长时间，2 天内吃完" },
  "香干": { category: "普通食材类", days: 5, tip: "冷藏保存，开封后尽快食用" },
  "皮蛋": { category: "普通食材类", days: 30, tip: "常温阴凉处存放即可，开封后冷藏并尽快吃" },
  "火腿": { category: "普通食材类", days: 30, tip: "冷藏保存，切片后尽快食用" },
  "腊肉": { category: "普通食材类", days: 120, tip: "阴凉通风或冷冻保存，腊味可存放较久" },
  "河粉": { category: "普通食材类", days: 3, tip: "冷藏保存，湿河粉易坏，3 天内吃完" },
  "粉丝": { category: "普通食材类", days: 180, tip: "阴凉干燥处存放，干货可长期保存" },
  "木耳": { category: "普通食材类", days: 180, tip: "干品阴凉干燥处存放，泡发后需当天吃完" },
  "海带": { category: "普通食材类", days: 180, tip: "干品阴凉干燥处存放，泡发后冷藏并尽快吃" },
  "银耳": { category: "普通食材类", days: 180, tip: "干品阴凉干燥处存放" },
  "莲子": { category: "普通食材类", days: 180, tip: "干品阴凉干燥处存放" },
  "绿豆": { category: "普通食材类", days: 180, tip: "干品阴凉干燥处存放，注意防虫" },
  "小米": { category: "普通食材类", days: 180, tip: "阴凉干燥处密封存放，防虫防潮" },
  "大米": { category: "普通食材类", days: 180, tip: "阴凉干燥处密封存放，防虫防潮" },
  "黄豆": { category: "普通食材类", days: 180, tip: "阴凉干燥处存放" },
  "面粉": { category: "普通食材类", days: 180, tip: "阴凉干燥处密封存放，防结块" },
  "燕麦": { category: "普通食材类", days: 180, tip: "阴凉干燥处存放" },
  "面条": { category: "普通食材类", days: 90, tip: "干面阴凉干燥处存放，湿面需冷藏" },
  "牛奶": { category: "普通食材类", days: 7, tip: "冷藏保存，开封后 1-2 天内喝完" },
  "鸡蛋": { category: "普通食材类", days: 30, tip: "冷藏保存，大头朝上，约 1 个月内吃完" },
  "面包": { category: "普通食材类", days: 7, tip: "常温密封或冷冻保存，冷藏反而易干硬" },
  "米饭": { category: "普通食材类", days: 2, tip: "熟食冷藏，2 天内吃完，吃前务必热透" },
  "可乐": { category: "普通食材类", days: 180, tip: "常温阴凉处存放，开封后冷藏并尽快喝完" },
  "啤酒": { category: "普通食材类", days: 180, tip: "阴凉处存放，鲜啤需冷藏并尽快喝" },
  "腐竹": { category: "普通食材类", days: 180, tip: "干品阴凉干燥处存放，泡发后当天吃完" },
  "葱": { category: "普通食材类", days: 7, tip: "冷藏保存，洗净擦干装袋，约 1 周" },
  "姜": { category: "普通食材类", days: 21, tip: "冷藏或用沙土埋存，约 3 周内吃完" },
  "蒜": { category: "普通食材类", days: 60, tip: "阴凉通风处悬挂存放，可放较久" },
  "蒜末": { category: "普通食材类", days: 7, tip: "冷藏保存，现做现用，1 周内吃完" },
  "豆角": { category: "普通食材类", days: 5, tip: "冷藏保存，务必彻底煮熟，5 天内吃完" },
  "鸭血": { category: "普通食材类", days: 5, tip: "冷藏保存，血制品极易变质，5 天内吃完" },
  "菠菜": { category: "普通食材类", days: 3, tip: "冷藏保存，叶菜易坏，3 天内吃完" },
  "韭菜": { category: "普通食材类", days: 4, tip: "冷藏保存，易蔫，尽快食用" },
  "南瓜": { category: "普通食材类", days: 30, tip: "阴凉通风处存放，整瓜可放较久" },
  "苦瓜": { category: "普通食材类", days: 5, tip: "冷藏保存，约 5 天内吃完" },
  "山药": { category: "普通食材类", days: 30, tip: "常温或冷藏存放，防潮" },
  "芋头": { category: "普通食材类", days: 30, tip: "阴凉干燥处存放，勿冷藏" },
  "金针菇": { category: "普通食材类", days: 5, tip: "冷藏保存，约 5 天内吃完" },
  "平菇": { category: "普通食材类", days: 4, tip: "冷藏并用纸袋装，约 4 天内吃完" },
  "辣椒": { category: "普通食材类", days: 7, tip: "冷藏保存，约 1 周内吃完" },
  "香菜": { category: "普通食材类", days: 5, tip: "冷藏并用湿纸巾包根部，尽快食用" },
  "毛豆": { category: "普通食材类", days: 3, tip: "冷藏保存，3 天内吃完，煮熟食用" },
  "红薯": { category: "普通食材类", days: 30, tip: "阴凉干燥处存放，勿冷藏" },
  "紫薯": { category: "普通食材类", days: 30, tip: "阴凉干燥处存放，勿冷藏" },

  /* ---- 冷冻类（肉禽鱼海鲜冻品，-18℃）---- */
  "五花肉": { category: "冷冻类", days: 90, tip: "冷冻保存，分装防反复解冻，约 3 个月内吃完" },
  "里脊肉": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "瘦肉": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "猪肉": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "鸡肉": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "鸡胸肉": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "鸡腿肉": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "鸡翅": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "鸭肉": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "牛腩": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "牛肉": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "黄牛肉": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "羊肉": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "排骨": { category: "冷冻类", days: 90, tip: "冷冻保存，约 3 个月内吃完" },
  "虾": { category: "冷冻类", days: 60, tip: "冷冻保存，海鲜易冻伤，约 2 个月内吃完" },
  "大虾": { category: "冷冻类", days: 60, tip: "冷冻保存，约 2 个月内吃完" },
  "鱼": { category: "冷冻类", days: 60, tip: "冷冻保存，鱼易变干，约 2 个月内吃完" },
  "鲈鱼": { category: "冷冻类", days: 60, tip: "冷冻保存，约 2 个月内吃完" },
  "鲫鱼": { category: "冷冻类", days: 60, tip: "冷冻保存，约 2 个月内吃完" },
  "鱼头": { category: "冷冻类", days: 60, tip: "冷冻保存，约 2 个月内吃完" },
  "花蛤": { category: "冷冻类", days: 30, tip: "鲜活现吃最佳，冷藏尽快食用，冷冻可存约 1 个月" },
  "扇贝": { category: "冷冻类", days: 60, tip: "冷冻保存，约 2 个月内吃完" },
  "螃蟹": { category: "冷冻类", days: 30, tip: "鲜活现吃最佳，冷冻可存约 1 个月" },
  "午餐肉": { category: "冷冻类", days: 90, tip: "冷冻保存，罐头未开可常温久放" },
  "牛肚": { category: "冷冻类", days: 60, tip: "冷冻保存，约 2 个月内吃完" },

  /* ---- 调味料类（常温阴凉，多数可存半年以上）---- */
  "盐": { category: "调味料类", days: 365, tip: "阴凉干燥处存放，防潮结块" },
  "生抽": { category: "调味料类", days: 365, tip: "阴凉处存放，开封后冷藏更佳，约 1 年" },
  "老抽": { category: "调味料类", days: 365, tip: "阴凉处存放，开封后冷藏" },
  "白糖": { category: "调味料类", days: 365, tip: "密封阴凉干燥处存放，防受潮" },
  "冰糖": { category: "调味料类", days: 365, tip: "密封阴凉干燥处存放" },
  "醋": { category: "调味料类", days: 365, tip: "阴凉处存放，开封后冷藏" },
  "食用油": { category: "调味料类", days: 365, tip: "阴凉避光处存放，防氧化" },
  "紫菜": { category: "调味料类", days: 180, tip: "阴凉干燥处存放，防潮" },
  "干辣椒": { category: "调味料类", days: 365, tip: "阴凉干燥处存放，防霉" },
  "豆瓣酱": { category: "调味料类", days: 365, tip: "阴凉处存放，开封后冷藏" },
  "甜面酱": { category: "调味料类", days: 180, tip: "冷藏保存，开封后尽快食用" },
  "蚝油": { category: "调味料类", days: 180, tip: "开封后务必冷藏，约半年内吃完" },
  "番茄酱": { category: "调味料类", days: 180, tip: "开封后冷藏保存" },
  "辣椒油": { category: "调味料类", days: 180, tip: "阴凉避光处存放，开封后冷藏" },
  "胡椒粉": { category: "调味料类", days: 365, tip: "阴凉干燥处存放，防结块" },
  "酵母": { category: "调味料类", days: 180, tip: "密封冷藏或冷冻，保持活性" },
  "梅菜": { category: "调味料类", days: 180, tip: "干品阴凉干燥处存放" },
  "剁椒": { category: "调味料类", days: 180, tip: "冷藏保存，开封后尽快食用" },
  "花椒": { category: "调味料类", days: 365, tip: "阴凉干燥处存放，防结块" },

  /* ---- 水果类 ---- */
  "苹果": { category: "水果类", days: 30, tip: "冷藏保存，可放约 1 个月" },
  "香蕉": { category: "水果类", days: 5, tip: "常温存放，勿冷藏（易变黑），尽快吃完" },
  "橙": { category: "水果类", days: 21, tip: "冷藏保存，约 3 周内吃完" },
  "梨": { category: "水果类", days: 21, tip: "冷藏保存，约 3 周内吃完" },
  "葡萄": { category: "水果类", days: 5, tip: "冷藏保存，吃前再洗，5 天内吃完" },
  "草莓": { category: "水果类", days: 3, tip: "冷藏保存，极易坏，2-3 天内吃完" }
}

// 根据食材名给出保存建议（分类 + 保质期天数 + 方法），未匹配给通用默认
function getIngredientHint(name) {
  const key = normalizeName(name)
  if (INGREDIENT_HINTS[key]) return { ...INGREDIENT_HINTS[key], matched: true }
  // 部分匹配：食材名包含某个已知食材（如「五花肉末」匹配「五花肉」）
  const partialKey = Object.keys(INGREDIENT_HINTS).find(k => k.length >= 1 && key.includes(k))
  if (partialKey) return { ...INGREDIENT_HINTS[partialKey], matched: true }
  return { category: "普通食材类", days: 7, tip: "建议冷藏保存，并尽快食用", matched: false }
}

// 日期加天数，返回 YYYY-MM-DD
function addDays(dateStr, days) {
  const base = new Date(String(dateStr || todayStr()).replace(/-/g, "/"))
  base.setDate(base.getDate() + (Number(days) || 0))
  return formatDay(base)
}

const seedRecipes = [
  /* ---------- 家常菜 ---------- */
  {
    id: "seed-tomato-egg",
    name: "番茄炒蛋",
    category: "家常菜",
    ingredients: [
      { name: "番茄", qty: 2, unit: "个" },
      { name: "鸡蛋", qty: 3, unit: "个" },
      { name: "葱", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡蛋打散炒至定型盛出\n2. 番茄切块炒出汁，加少许盐和糖\n3. 倒回鸡蛋翻匀，撒葱花",
    note: "想拌饭就多留一点汤汁",
    createdAt: "2026-01-01 12:00"
  },
  {
    id: "seed-pepper-egg",
    name: "青椒炒蛋",
    category: "家常菜",
    ingredients: [
      { name: "青椒", qty: 2, unit: "个" },
      { name: "鸡蛋", qty: 3, unit: "个" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡蛋炒熟盛出\n2. 青椒丝炒断生\n3. 倒回鸡蛋，加盐翻匀"
  },
  {
    id: "seed-potato-shred",
    name: "酸辣土豆丝",
    category: "家常菜",
    ingredients: [
      { name: "土豆", qty: 2, unit: "个" },
      { name: "青椒", qty: 1, unit: "个" },
      { name: "醋", qty: 1, unit: "份" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 土豆、青椒切丝\n2. 热油先炒土豆丝\n3. 加青椒、醋、盐快炒出锅"
  },
  {
    id: "seed-mapo-tofu",
    name: "麻婆豆腐",
    category: "家常菜",
    ingredients: [
      { name: "豆腐", qty: 1, unit: "块" },
      { name: "瘦肉", qty: 100, unit: "g" },
      { name: "豆瓣酱", qty: 1, unit: "份" },
      { name: "蒜", qty: 1, unit: "份" }
    ],
    steps: "1. 豆腐切块焯水\n2. 炒肉末和豆瓣酱出红油\n3. 加水放豆腐烧入味，撒蒜末"
  },
  {
    id: "seed-di-san-xian",
    name: "地三鲜",
    category: "家常菜",
    ingredients: [
      { name: "土豆", qty: 1, unit: "个" },
      { name: "茄子", qty: 1, unit: "个" },
      { name: "青椒", qty: 1, unit: "个" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 土豆、茄子煎软\n2. 爆香后同炒\n3. 加生抽和少许水收汁"
  },
  {
    id: "seed-carrot-egg",
    name: "胡萝卜炒鸡蛋",
    category: "家常菜",
    ingredients: [
      { name: "胡萝卜", qty: 1, unit: "根" },
      { name: "鸡蛋", qty: 2, unit: "个" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡蛋炒熟盛出\n2. 胡萝卜丝炒软\n3. 倒回鸡蛋加盐翻匀"
  },

  /* ---------- 家常菜（续） ---------- */
  {
    id: "seed2-zucchini-egg",
    name: "西葫芦炒鸡蛋",
    category: "家常菜",
    ingredients: [
      { name: "西葫芦", qty: 1, unit: "个" },
      { name: "鸡蛋", qty: 2, unit: "个" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡蛋炒熟盛出\n2. 西葫芦片炒软\n3. 倒回鸡蛋加盐翻匀"
  },
  {
    id: "seed2-onion-egg",
    name: "洋葱炒鸡蛋",
    category: "家常菜",
    ingredients: [
      { name: "洋葱", qty: 1, unit: "个" },
      { name: "鸡蛋", qty: 2, unit: "个" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡蛋炒熟盛出\n2. 洋葱丝炒透明\n3. 倒回鸡蛋加盐"
  },
  {
    id: "seed2-cabbage",
    name: "手撕包菜",
    category: "家常菜",
    ingredients: [
      { name: "包菜", qty: 1, unit: "个" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 包菜手撕成片\n2. 蒜末爆香\n3. 大火快炒加生抽"
  },
  {
    id: "seed2-scallion-tofu",
    name: "葱烧豆腐",
    category: "家常菜",
    ingredients: [
      { name: "豆腐", qty: 1, unit: "块" },
      { name: "葱", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 豆腐煎至两面金黄\n2. 下葱段\n3. 加生抽和少许水烧入味"
  },
  {
    id: "seed2-celery-dried",
    name: "芹菜炒香干",
    category: "家常菜",
    ingredients: [
      { name: "芹菜", qty: 200, unit: "g" },
      { name: "香干", qty: 100, unit: "g" },
      { name: "蒜", qty: 1, unit: "份" }
    ],
    steps: "1. 香干、芹菜切段\n2. 蒜末爆香\n3. 同炒加盐"
  },
  {
    id: "seed2-mushroom-greens",
    name: "香菇炒青菜",
    category: "家常菜",
    ingredients: [
      { name: "香菇", qty: 100, unit: "g" },
      { name: "青菜", qty: 200, unit: "g" },
      { name: "蒜", qty: 1, unit: "份" }
    ],
    steps: "1. 香菇切片炒香\n2. 下青菜\n3. 蒜末、盐调味出锅"
  },

  /* ---------- 荤菜 ---------- */
  {
    id: "seed-braised-pork",
    name: "土豆红烧肉",
    category: "荤菜",
    ingredients: [
      { name: "五花肉", qty: 500, unit: "g" },
      { name: "土豆", qty: 2, unit: "个" },
      { name: "冰糖", qty: 1, unit: "份" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 五花肉焯水后煸出油\n2. 冰糖炒糖色，放肉块翻炒\n3. 加调料和热水炖 35 分钟\n4. 放土豆再炖 15 分钟",
    note: "第二顿加热更入味",
    createdAt: "2026-01-01 12:00"
  },
  {
    id: "seed-cola-chicken",
    name: "可乐鸡翅",
    category: "荤菜",
    ingredients: [
      { name: "鸡翅", qty: 8, unit: "个" },
      { name: "可乐", qty: 1, unit: "罐" },
      { name: "生抽", qty: 1, unit: "份" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡翅煎两面金黄\n2. 加姜片、生抽\n3. 倒可乐没过，收汁"
  },
  {
    id: "seed-kungpao",
    name: "宫保鸡丁",
    category: "荤菜",
    ingredients: [
      { name: "鸡胸肉", qty: 300, unit: "g" },
      { name: "花生", qty: 50, unit: "g" },
      { name: "干辣椒", qty: 5, unit: "个" },
      { name: "葱", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡丁滑炒变色\n2. 加干辣椒、花生、葱段\n3. 调汁（生抽、醋、糖）翻炒"
  },
  {
    id: "seed-pepper-pork",
    name: "青椒肉丝",
    category: "荤菜",
    ingredients: [
      { name: "青椒", qty: 2, unit: "个" },
      { name: "瘦肉", qty: 200, unit: "g" },
      { name: "生抽", qty: 1, unit: "份" },
      { name: "蒜", qty: 1, unit: "份" }
    ],
    steps: "1. 肉丝滑炒\n2. 加青椒丝、蒜末\n3. 生抽调味出锅"
  },
  {
    id: "seed-ribs-braised",
    name: "红烧排骨",
    category: "荤菜",
    ingredients: [
      { name: "排骨", qty: 500, unit: "g" },
      { name: "冰糖", qty: 1, unit: "份" },
      { name: "姜", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 排骨焯水\n2. 冰糖炒色放排骨\n3. 加生抽、热水炖 40 分钟收汁"
  },

  /* ---------- 荤菜（续） ---------- */
  {
    id: "seed2-sweet-pork",
    name: "糖醋里脊",
    category: "荤菜",
    ingredients: [
      { name: "里脊肉", qty: 300, unit: "g" },
      { name: "鸡蛋", qty: 1, unit: "个" },
      { name: "番茄酱", qty: 1, unit: "份" },
      { name: "白糖", qty: 1, unit: "份" }
    ],
    steps: "1. 里脊裹蛋液炸金黄\n2. 调糖醋汁（番茄酱、糖、醋）\n3. 倒入翻匀裹汁"
  },
  {
    id: "seed2-braised-chicken",
    name: "红烧鸡块",
    category: "荤菜",
    ingredients: [
      { name: "鸡腿肉", qty: 500, unit: "g" },
      { name: "冰糖", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡块焯水煸干\n2. 冰糖炒色放鸡块\n3. 加生抽、热水炖 20 分钟"
  },
  {
    id: "seed2-beer-duck",
    name: "啤酒鸭",
    category: "荤菜",
    ingredients: [
      { name: "鸭肉", qty: 500, unit: "g" },
      { name: "啤酒", qty: 1, unit: "罐" },
      { name: "姜", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 鸭肉焯水煸出油\n2. 加姜片、生抽\n3. 倒啤酒炖 30 分钟收汁"
  },
  {
    id: "seed2-sweet-ribs",
    name: "糖醋排骨",
    category: "荤菜",
    ingredients: [
      { name: "排骨", qty: 500, unit: "g" },
      { name: "醋", qty: 1, unit: "份" },
      { name: "白糖", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 排骨焯水炸一下\n2. 调糖醋汁（醋、糖、生抽）\n3. 收汁裹匀"
  },
  {
    id: "seed2-meicai-pork",
    name: "梅菜扣肉",
    category: "荤菜",
    ingredients: [
      { name: "五花肉", qty: 500, unit: "g" },
      { name: "梅菜", qty: 100, unit: "g" },
      { name: "生抽", qty: 1, unit: "份" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 五花肉煮后煎皮\n2. 切片铺碗，梅菜垫底\n3. 蒸 40 分钟倒扣"
  },
  {
    id: "seed2-garlic-ribs",
    name: "蒜香排骨",
    category: "荤菜",
    ingredients: [
      { name: "排骨", qty: 500, unit: "g" },
      { name: "蒜", qty: 2, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 排骨腌蒜末\n2. 煎/炸至熟\n3. 撒蒜蓉翻匀"
  },
  {
    id: "seed2-jingjiang",
    name: "京酱肉丝",
    category: "荤菜",
    ingredients: [
      { name: "瘦肉", qty: 200, unit: "g" },
      { name: "甜面酱", qty: 1, unit: "份" },
      { name: "葱", qty: 1, unit: "份" }
    ],
    steps: "1. 肉丝滑炒\n2. 加甜面酱炒香\n3. 配葱丝"
  },
  {
    id: "seed2-braised-beef",
    name: "红烧牛腩",
    category: "荤菜",
    ingredients: [
      { name: "牛腩", qty: 500, unit: "g" },
      { name: "番茄", qty: 2, unit: "个" },
      { name: "姜", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 牛腩焯水\n2. 加番茄、姜片\n3. 炖 60 分钟调味"
  },
  {
    id: "seed2-lamb-scallion",
    name: "葱爆羊肉",
    category: "荤菜",
    ingredients: [
      { name: "羊肉", qty: 300, unit: "g" },
      { name: "葱", qty: 2, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 羊肉大火快炒\n2. 下葱段\n3. 生抽调味出锅"
  },
  {
    id: "seed2-beef-pepper",
    name: "小炒黄牛肉",
    category: "荤菜",
    ingredients: [
      { name: "黄牛肉", qty: 300, unit: "g" },
      { name: "青椒", qty: 2, unit: "个" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 牛肉大火快炒变色\n2. 加青椒、蒜\n3. 生抽调味"
  },

  /* ---------- 素菜 ---------- */
  {
    id: "seed-cucumber",
    name: "拍黄瓜",
    category: "凉菜",
    ingredients: [
      { name: "黄瓜", qty: 2, unit: "根" },
      { name: "蒜", qty: 1, unit: "份" }
    ],
    steps: "1. 黄瓜拍裂切段\n2. 加蒜末和调料拌匀\n3. 冷藏 10 分钟再吃",
    note: "适合配油腻一点的主菜",
    createdAt: "2026-01-01 12:00"
  },
  {
    id: "seed-cabbage",
    name: "清炒白菜",
    category: "素菜",
    ingredients: [
      { name: "白菜", qty: 1, unit: "棵" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 白菜切段\n2. 蒜末爆香\n3. 大火快炒加盐"
  },
  {
    id: "seed-broccoli",
    name: "蒜蓉西兰花",
    category: "素菜",
    ingredients: [
      { name: "西兰花", qty: 1, unit: "棵" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 西兰花焯水\n2. 蒜末爆香\n3. 下西兰花加盐炒匀"
  },
  {
    id: "seed-tomato-cold",
    name: "凉拌西红柿",
    category: "凉菜",
    ingredients: [
      { name: "番茄", qty: 2, unit: "个" },
      { name: "白糖", qty: 1, unit: "份" }
    ],
    steps: "1. 番茄切片\n2. 撒白糖\n3. 冷藏更爽口"
  },

  /* ---------- 素菜（续） ---------- */
  {
    id: "seed2-tiger-pepper",
    name: "虎皮青椒",
    category: "素菜",
    ingredients: [
      { name: "青椒", qty: 4, unit: "个" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 青椒干煸起虎皮\n2. 蒜末爆香\n3. 生抽、少许水烧入味"
  },
  {
    id: "seed2-green-beans",
    name: "干煸四季豆",
    category: "素菜",
    ingredients: [
      { name: "四季豆", qty: 300, unit: "g" },
      { name: "蒜末", qty: 1, unit: "份" },
      { name: "干辣椒", qty: 3, unit: "个" }
    ],
    steps: "1. 四季豆煸至皱皮\n2. 蒜末、干辣椒爆香\n3. 加盐出锅"
  },
  {
    id: "seed2-oil-veg",
    name: "蒜蓉油麦菜",
    category: "素菜",
    ingredients: [
      { name: "油麦菜", qty: 300, unit: "g" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 蒜末爆香\n2. 下油麦菜大火炒\n3. 加盐"
  },
  {
    id: "seed2-water-spinach",
    name: "清炒空心菜",
    category: "素菜",
    ingredients: [
      { name: "空心菜", qty: 300, unit: "g" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 蒜末爆香\n2. 下空心菜快炒\n3. 加盐"
  },
  {
    id: "seed2-oyster-lettuce",
    name: "蚝油生菜",
    category: "素菜",
    ingredients: [
      { name: "生菜", qty: 300, unit: "g" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "蚝油", qty: 1, unit: "份" }
    ],
    steps: "1. 生菜焯水摆盘\n2. 蒜末、蚝油调汁\n3. 淋上"
  },
  {
    id: "seed2-mushroom-heart",
    name: "香菇菜心",
    category: "素菜",
    ingredients: [
      { name: "菜心", qty: 300, unit: "g" },
      { name: "香菇", qty: 100, unit: "g" },
      { name: "蒜", qty: 1, unit: "份" }
    ],
    steps: "1. 菜心焯水\n2. 香菇蒜末炒香\n3. 铺在菜心上"
  },
  {
    id: "seed2-vinegar-cabbage",
    name: "醋溜白菜",
    category: "素菜",
    ingredients: [
      { name: "白菜", qty: 300, unit: "g" },
      { name: "醋", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 白菜帮切片\n2. 大火快炒\n3. 加醋、生抽调味"
  },

  /* ---------- 汤羹 ---------- */
  {
    id: "seed-tomato-soup",
    name: "番茄蛋花汤",
    category: "汤羹",
    ingredients: [
      { name: "番茄", qty: 1, unit: "个" },
      { name: "鸡蛋", qty: 2, unit: "个" },
      { name: "盐", qty: 1, unit: "份" },
      { name: "葱", qty: 1, unit: "份" }
    ],
    steps: "1. 番茄炒软加水煮开\n2. 淋蛋液成花\n3. 盐调味撒葱花"
  },
  {
    id: "seed-seaweed-soup",
    name: "紫菜蛋汤",
    category: "汤羹",
    ingredients: [
      { name: "紫菜", qty: 1, unit: "份" },
      { name: "鸡蛋", qty: 2, unit: "个" },
      { name: "盐", qty: 1, unit: "份" },
      { name: "葱", qty: 1, unit: "份" }
    ],
    steps: "1. 水开下紫菜\n2. 淋蛋液\n3. 盐调味撒葱花"
  },
  {
    id: "seed-corn-ribs",
    name: "玉米排骨汤",
    category: "汤羹",
    ingredients: [
      { name: "排骨", qty: 400, unit: "g" },
      { name: "玉米", qty: 2, unit: "根" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 排骨焯水\n2. 加玉米、姜片\n3. 炖 1 小时调味"
  },
  {
    id: "seed-wintermelon-ribs",
    name: "冬瓜排骨汤",
    category: "汤羹",
    ingredients: [
      { name: "排骨", qty: 400, unit: "g" },
      { name: "冬瓜", qty: 300, unit: "g" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 排骨焯水炖 30 分钟\n2. 加冬瓜再炖 20 分钟\n3. 加盐"
  },

  /* ---------- 汤羹（续） ---------- */
  {
    id: "seed2-tomato-beef-soup",
    name: "西红柿牛腩汤",
    category: "汤羹",
    ingredients: [
      { name: "牛腩", qty: 300, unit: "g" },
      { name: "番茄", qty: 2, unit: "个" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 牛腩焯水\n2. 加番茄块炖 50 分钟\n3. 加盐"
  },
  {
    id: "seed2-hot-sour-soup",
    name: "酸辣汤",
    category: "汤羹",
    ingredients: [
      { name: "豆腐", qty: 1, unit: "块" },
      { name: "木耳", qty: 30, unit: "g" },
      { name: "鸡蛋", qty: 1, unit: "个" },
      { name: "醋", qty: 1, unit: "份" },
      { name: "胡椒粉", qty: 1, unit: "份" }
    ],
    steps: "1. 水开下豆腐、木耳\n2. 淋蛋液\n3. 醋、胡椒粉调味"
  },
  {
    id: "seed2-lotus-ribs",
    name: "排骨莲藕汤",
    category: "汤羹",
    ingredients: [
      { name: "排骨", qty: 400, unit: "g" },
      { name: "莲藕", qty: 300, unit: "g" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 排骨焯水\n2. 加莲藕、姜片\n3. 炖 1 小时"
  },
  {
    id: "seed2-radish-ribs",
    name: "萝卜排骨汤",
    category: "汤羹",
    ingredients: [
      { name: "排骨", qty: 400, unit: "g" },
      { name: "萝卜", qty: 300, unit: "g" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 排骨焯水炖 30 分钟\n2. 加萝卜再炖 20 分钟\n3. 加盐"
  },
  {
    id: "seed2-mushroom-chicken-soup",
    name: "蘑菇鸡汤",
    category: "汤羹",
    ingredients: [
      { name: "鸡肉", qty: 400, unit: "g" },
      { name: "蘑菇", qty: 200, unit: "g" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡肉焯水\n2. 加蘑菇、姜片\n3. 炖 40 分钟"
  },
  {
    id: "seed2-tremella-soup",
    name: "银耳莲子羹",
    category: "汤羹",
    ingredients: [
      { name: "银耳", qty: 1, unit: "朵" },
      { name: "莲子", qty: 30, unit: "g" },
      { name: "冰糖", qty: 1, unit: "份" }
    ],
    steps: "1. 银耳泡发撕小朵\n2. 加莲子炖 40 分钟\n3. 放冰糖"
  },
  {
    id: "seed2-mung-bean-soup",
    name: "绿豆汤",
    category: "汤羹",
    ingredients: [
      { name: "绿豆", qty: 200, unit: "g" },
      { name: "冰糖", qty: 1, unit: "份" }
    ],
    steps: "1. 绿豆泡 30 分钟\n2. 加水煮开花\n3. 放冰糖"
  },

  /* ---------- 主食 ---------- */
  {
    id: "seed-egg-fried-rice",
    name: "蛋炒饭",
    category: "主食",
    ingredients: [
      { name: "鸡蛋", qty: 2, unit: "个" },
      { name: "米饭", qty: 2, unit: "碗" },
      { name: "葱", qty: 1, unit: "份" },
      { name: "盐", qty: 1, unit: "份" },
      { name: "火腿", qty: 50, unit: "g" }
    ],
    steps: "1. 鸡蛋炒散\n2. 下米饭炒散\n3. 加火腿、葱、盐翻匀"
  },
  {
    id: "seed-plain-noodle",
    name: "阳春面",
    category: "主食",
    ingredients: [
      { name: "面条", qty: 1, unit: "把" },
      { name: "葱", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 碗里放生抽、葱、盐\n2. 煮面捞入\n3. 冲热汤"
  },

  /* ---------- 主食（续） ---------- */
  {
    id: "seed2-fried-noodle",
    name: "炒面",
    category: "主食",
    ingredients: [
      { name: "面条", qty: 1, unit: "把" },
      { name: "鸡蛋", qty: 1, unit: "个" },
      { name: "青菜", qty: 100, unit: "g" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 面条煮熟过凉\n2. 鸡蛋炒散下青菜\n3. 下面条、生抽炒匀"
  },
  {
    id: "seed2-beef-noodle",
    name: "牛肉面",
    category: "主食",
    ingredients: [
      { name: "面条", qty: 1, unit: "把" },
      { name: "牛肉", qty: 200, unit: "g" },
      { name: "葱", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 牛肉加生抽卤好\n2. 煮面捞碗\n3. 浇牛肉汤撒葱"
  },
  {
    id: "seed2-wonton",
    name: "馄饨",
    category: "主食",
    ingredients: [
      { name: "馄饨皮", qty: 20, unit: "张" },
      { name: "瘦肉", qty: 150, unit: "g" },
      { name: "葱", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 肉馅加葱、生抽\n2. 包馄饨\n3. 水开煮浮起"
  },
  {
    id: "seed2-steam-dumpling",
    name: "蒸饺",
    category: "主食",
    ingredients: [
      { name: "饺子皮", qty: 20, unit: "张" },
      { name: "瘦肉", qty: 150, unit: "g" },
      { name: "白菜", qty: 100, unit: "g" },
      { name: "葱", qty: 1, unit: "份" }
    ],
    steps: "1. 肉馅拌白菜、葱\n2. 包饺子\n3. 上锅蒸 15 分钟"
  },
  {
    id: "seed2-scallion-pancake",
    name: "葱油饼",
    category: "主食",
    ingredients: [
      { name: "面粉", qty: 200, unit: "g" },
      { name: "葱", qty: 2, unit: "份" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 面团擀开抹油撒葱\n2. 卷起擀饼\n3. 小火煎至两面金黄"
  },
  {
    id: "seed2-fried-hefen",
    name: "炒河粉",
    category: "主食",
    ingredients: [
      { name: "河粉", qty: 300, unit: "g" },
      { name: "牛肉", qty: 100, unit: "g" },
      { name: "豆芽", qty: 100, unit: "g" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 牛肉滑炒盛出\n2. 下河粉、豆芽\n3. 加生抽、牛肉炒匀"
  },
  {
    id: "seed2-liangpi",
    name: "凉皮",
    category: "主食",
    ingredients: [
      { name: "凉皮", qty: 300, unit: "g" },
      { name: "黄瓜", qty: 1, unit: "根" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "醋", qty: 1, unit: "份" },
      { name: "辣椒油", qty: 1, unit: "份" }
    ],
    steps: "1. 凉皮切条\n2. 加黄瓜丝、蒜水\n3. 醋、辣椒油拌匀"
  },
  {
    id: "seed2-claypot-rice",
    name: "煲仔饭",
    category: "主食",
    ingredients: [
      { name: "米饭", qty: 2, unit: "碗" },
      { name: "腊肉", qty: 100, unit: "g" },
      { name: "青菜", qty: 100, unit: "g" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 米加水小火焖\n2. 铺腊肉、青菜\n3. 熟后淋生抽"
  },
  {
    id: "seed2-braised-noodle",
    name: "焖面",
    category: "主食",
    ingredients: [
      { name: "面条", qty: 1, unit: "把" },
      { name: "五花肉", qty: 150, unit: "g" },
      { name: "豆角", qty: 200, unit: "g" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 肉片、豆角炒香\n2. 加水煮开下面\n3. 焖至收汁"
  },

  /* ---------- 早餐 ---------- */
  {
    id: "seed-fried-egg",
    name: "煎蛋",
    category: "早餐",
    ingredients: [
      { name: "鸡蛋", qty: 2, unit: "个" },
      { name: "盐", qty: 1, unit: "份" }
    ],
    steps: "1. 小火热油\n2. 打入鸡蛋\n3. 煎至边缘金黄撒盐"
  },

  /* ---------- 早餐（续） ---------- */
  {
    id: "seed2-millet-porridge",
    name: "小米粥",
    category: "早餐",
    ingredients: [
      { name: "小米", qty: 100, unit: "g" }
    ],
    steps: "1. 小米洗净\n2. 加水大火煮开转小火\n3. 熬 25 分钟"
  },
  {
    id: "seed2-rice-porridge",
    name: "白粥",
    category: "早餐",
    ingredients: [
      { name: "大米", qty: 100, unit: "g" }
    ],
    steps: "1. 大米洗净\n2. 加水煮开转小火\n3. 熬 30 分钟"
  },
  {
    id: "seed2-soybean-milk",
    name: "豆浆",
    category: "早餐",
    ingredients: [
      { name: "黄豆", qty: 100, unit: "g" }
    ],
    steps: "1. 黄豆泡发\n2. 加豆浆机打熟\n3. 过滤"
  },
  {
    id: "seed2-baozi",
    name: "包子",
    category: "早餐",
    ingredients: [
      { name: "面粉", qty: 200, unit: "g" },
      { name: "瘦肉", qty: 100, unit: "g" },
      { name: "葱", qty: 1, unit: "份" }
    ],
    steps: "1. 发面包肉馅\n2. 醒发\n3. 上锅蒸 15 分钟"
  },
  {
    id: "seed2-youtiao",
    name: "油条",
    category: "早餐",
    ingredients: [
      { name: "面粉", qty: 200, unit: "g" },
      { name: "酵母", qty: 1, unit: "份" }
    ],
    steps: "1. 和面发酵\n2. 切条扭一起\n3. 油炸金黄"
  },
  {
    id: "seed2-jianbing",
    name: "煎饼",
    category: "早餐",
    ingredients: [
      { name: "面粉", qty: 150, unit: "g" },
      { name: "鸡蛋", qty: 1, unit: "个" },
      { name: "葱", qty: 1, unit: "份" }
    ],
    steps: "1. 面糊摊薄\n2. 打蛋撒葱\n3. 翻面煎脆"
  },
  {
    id: "seed2-milk-oats",
    name: "牛奶燕麦",
    category: "早餐",
    ingredients: [
      { name: "牛奶", qty: 1, unit: "杯" },
      { name: "燕麦", qty: 50, unit: "g" }
    ],
    steps: "1. 牛奶加热\n2. 加燕麦\n3. 煮 3 分钟"
  },
  {
    id: "seed2-sandwich",
    name: "三明治",
    category: "早餐",
    ingredients: [
      { name: "面包", qty: 2, unit: "片" },
      { name: "鸡蛋", qty: 1, unit: "个" },
      { name: "生菜", qty: 100, unit: "g" }
    ],
    steps: "1. 煎蛋\n2. 面包夹蛋和生菜\n3. 对半切"
  },

  /* ---------- 凉菜 ---------- */
  {
    id: "seed2-fungus-cold",
    name: "凉拌木耳",
    category: "凉菜",
    ingredients: [
      { name: "木耳", qty: 50, unit: "g" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "醋", qty: 1, unit: "份" }
    ],
    steps: "1. 木耳泡发焯水\n2. 加蒜末、醋\n3. 拌匀冷藏"
  },
  {
    id: "seed2-kelp-cold",
    name: "凉拌海带丝",
    category: "凉菜",
    ingredients: [
      { name: "海带丝", qty: 200, unit: "g" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "醋", qty: 1, unit: "份" },
      { name: "辣椒油", qty: 1, unit: "份" }
    ],
    steps: "1. 海带丝焯水\n2. 加蒜、醋、辣椒油\n3. 拌匀"
  },
  {
    id: "seed2-egg-tofu",
    name: "皮蛋豆腐",
    category: "凉菜",
    ingredients: [
      { name: "皮蛋", qty: 2, unit: "个" },
      { name: "豆腐", qty: 1, unit: "块" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 豆腐切块垫底\n2. 皮蛋切瓣放上\n3. 淋生抽"
  },
  {
    id: "seed2-fuzhu-cold",
    name: "凉拌腐竹",
    category: "凉菜",
    ingredients: [
      { name: "腐竹", qty: 100, unit: "g" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "醋", qty: 1, unit: "份" },
      { name: "黄瓜", qty: 1, unit: "根" }
    ],
    steps: "1. 腐竹泡发焯水\n2. 加黄瓜、蒜、醋\n3. 拌匀"
  },
  {
    id: "seed2-koushui-chicken",
    name: "口水鸡",
    category: "凉菜",
    ingredients: [
      { name: "鸡腿", qty: 2, unit: "个" },
      { name: "辣椒油", qty: 1, unit: "份" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡腿煮熟过凉\n2. 调辣椒油、蒜、生抽汁\n3. 淋上"
  },

  /* ---------- 川湘菜 ---------- */
  {
    id: "seed2-huiguorou",
    name: "回锅肉",
    category: "川湘菜",
    ingredients: [
      { name: "五花肉", qty: 300, unit: "g" },
      { name: "青椒", qty: 2, unit: "个" },
      { name: "豆瓣酱", qty: 1, unit: "份" },
      { name: "蒜", qty: 1, unit: "份" }
    ],
    steps: "1. 五花肉煮八分熟切片\n2. 煸出油加豆瓣酱\n3. 下青椒、蒜炒匀"
  },
  {
    id: "seed2-yuxiang",
    name: "鱼香肉丝",
    category: "川湘菜",
    ingredients: [
      { name: "里脊肉", qty: 200, unit: "g" },
      { name: "木耳", qty: 50, unit: "g" },
      { name: "胡萝卜", qty: 1, unit: "根" },
      { name: "醋", qty: 1, unit: "份" },
      { name: "白糖", qty: 1, unit: "份" }
    ],
    steps: "1. 肉丝滑炒盛出\n2. 下木耳、胡萝卜\n3. 调鱼香汁（醋、糖、生抽）翻匀"
  },
  {
    id: "seed2-shuizhu",
    name: "水煮肉片",
    category: "川湘菜",
    ingredients: [
      { name: "瘦肉", qty: 300, unit: "g" },
      { name: "豆芽", qty: 200, unit: "g" },
      { name: "干辣椒", qty: 5, unit: "个" },
      { name: "豆瓣酱", qty: 1, unit: "份" }
    ],
    steps: "1. 肉片滑熟铺豆芽上\n2. 炒豆瓣酱淋上\n3. 撒干辣椒热油激香"
  },
  {
    id: "seed2-laziji",
    name: "辣子鸡",
    category: "川湘菜",
    ingredients: [
      { name: "鸡腿肉", qty: 500, unit: "g" },
      { name: "干辣椒", qty: 10, unit: "个" },
      { name: "花椒", qty: 1, unit: "份" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 鸡块炸至金黄\n2. 干辣椒、花椒爆香\n3. 下鸡块翻匀"
  },
  {
    id: "seed2-duojiao-yutou",
    name: "剁椒鱼头",
    category: "川湘菜",
    ingredients: [
      { name: "鱼头", qty: 1, unit: "个" },
      { name: "剁椒", qty: 100, unit: "g" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "姜", qty: 1, unit: "份" }
    ],
    steps: "1. 鱼头铺剁椒、蒜、姜\n2. 上锅蒸 15 分钟\n3. 淋热油"
  },
  {
    id: "seed2-maoxuewang",
    name: "毛血旺",
    category: "川湘菜",
    ingredients: [
      { name: "鸭血", qty: 200, unit: "g" },
      { name: "午餐肉", qty: 100, unit: "g" },
      { name: "豆芽", qty: 200, unit: "g" },
      { name: "豆瓣酱", qty: 1, unit: "份" },
      { name: "干辣椒", qty: 5, unit: "个" }
    ],
    steps: "1. 豆芽垫底，鸭血午餐肉铺上\n2. 炒豆瓣酱加汤淋上\n3. 撒干辣椒热油激香"
  },
  {
    id: "seed2-fuqi-feipian",
    name: "夫妻肺片",
    category: "川湘菜",
    ingredients: [
      { name: "牛肚", qty: 200, unit: "g" },
      { name: "牛肉", qty: 200, unit: "g" },
      { name: "辣椒油", qty: 1, unit: "份" },
      { name: "蒜", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 牛肚、牛肉煮熟切片\n2. 调辣椒油、蒜、生抽汁\n3. 拌匀"
  },

  /* ---------- 海鲜河鲜 ---------- */
  {
    id: "seed2-steam-bass",
    name: "清蒸鲈鱼",
    category: "海鲜河鲜",
    ingredients: [
      { name: "鲈鱼", qty: 1, unit: "条" },
      { name: "姜", qty: 2, unit: "份" },
      { name: "葱", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" }
    ],
    steps: "1. 鱼身铺姜丝葱段\n2. 上锅蒸 8 分钟\n3. 淋生抽和热油"
  },
  {
    id: "seed2-braised-fish",
    name: "红烧鱼",
    category: "海鲜河鲜",
    ingredients: [
      { name: "鲫鱼", qty: 1, unit: "条" },
      { name: "姜", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" },
      { name: "白糖", qty: 1, unit: "份" }
    ],
    steps: "1. 鱼煎至两面金黄\n2. 加姜、生抽、糖和水\n3. 烧入味收汁"
  },
  {
    id: "seed2-scallop-fan",
    name: "蒜蓉粉丝蒸扇贝",
    category: "海鲜河鲜",
    ingredients: [
      { name: "扇贝", qty: 6, unit: "个" },
      { name: "粉丝", qty: 50, unit: "g" },
      { name: "蒜", qty: 2, unit: "份" }
    ],
    steps: "1. 扇贝铺粉丝、蒜蓉\n2. 上锅蒸 5 分钟\n3. 淋热油"
  },
  {
    id: "seed2-braised-shrimp",
    name: "油焖大虾",
    category: "海鲜河鲜",
    ingredients: [
      { name: "大虾", qty: 300, unit: "g" },
      { name: "姜", qty: 1, unit: "份" },
      { name: "生抽", qty: 1, unit: "份" },
      { name: "白糖", qty: 1, unit: "份" }
    ],
    steps: "1. 虾煎红\n2. 加姜、生抽、糖\n3. 焖收汁"
  },
  {
    id: "seed2-spicy-shrimp",
    name: "香辣虾",
    category: "海鲜河鲜",
    ingredients: [
      { name: "虾", qty: 300, unit: "g" },
      { name: "干辣椒", qty: 5, unit: "个" },
      { name: "花椒", qty: 1, unit: "份" },
      { name: "蒜", qty: 1, unit: "份" }
    ],
    steps: "1. 虾炸/煎红盛出\n2. 干辣椒、花椒、蒜爆香\n3. 下虾翻匀"
  },
  {
    id: "seed2-spicy-clam",
    name: "辣炒花蛤",
    category: "海鲜河鲜",
    ingredients: [
      { name: "花蛤", qty: 500, unit: "g" },
      { name: "蒜", qty: 2, unit: "份" },
      { name: "干辣椒", qty: 3, unit: "个" }
    ],
    steps: "1. 花蛤吐沙焯水\n2. 蒜、干辣椒爆香\n3. 下花蛤翻炒出锅"
  },
  {
    id: "seed2-steam-crab",
    name: "清蒸螃蟹",
    category: "海鲜河鲜",
    ingredients: [
      { name: "螃蟹", qty: 3, unit: "只" },
      { name: "姜", qty: 2, unit: "份" },
      { name: "醋", qty: 1, unit: "份" }
    ],
    steps: "1. 螃蟹上锅蒸 12 分钟\n2. 姜末加醋蘸食"
  }
]

// 示例库存：方便第一次试用就能看到「检查食材」「扣减」和「按库存推荐」的效果
const seedInventory = [
  { id: "seed-inv-egg", name: "鸡蛋", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-08-08", quantity: 10, unit: "个" },
  { id: "seed-inv-tomato", name: "番茄", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 4, unit: "个" },
  { id: "seed-inv-pork", name: "五花肉", category: "冷冻类", purchaseDate: "2026-07-20", expiryDate: "2026-08-10", quantity: 500, unit: "g" },
  { id: "seed-inv-salt", name: "盐", category: "调味料类", purchaseDate: "2026-06-01", expiryDate: "2027-06-01", quantity: 1, unit: "瓶" },
  { id: "seed-inv-apple", name: "苹果", category: "水果类", purchaseDate: "2026-07-24", expiryDate: "2026-07-31", quantity: 6, unit: "个" },
  { id: "seed-inv-scallion", name: "葱", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 1, unit: "把" },
  { id: "seed-inv-ginger", name: "姜", category: "普通食材类", purchaseDate: "2026-07-22", expiryDate: "2026-08-05", quantity: 1, unit: "块" },
  { id: "seed-inv-garlic", name: "蒜", category: "普通食材类", purchaseDate: "2026-07-22", expiryDate: "2026-08-05", quantity: 1, unit: "头" },
  { id: "seed-inv-soy", name: "生抽", category: "调味料类", purchaseDate: "2026-06-01", expiryDate: "2027-06-01", quantity: 1, unit: "瓶" },
  { id: "seed-inv-sugar", name: "白糖", category: "调味料类", purchaseDate: "2026-06-01", expiryDate: "2027-06-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-rock-sugar", name: "冰糖", category: "调味料类", purchaseDate: "2026-06-01", expiryDate: "2027-06-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-vinegar", name: "醋", category: "调味料类", purchaseDate: "2026-06-01", expiryDate: "2027-06-01", quantity: 1, unit: "瓶" },
  { id: "seed-inv-oil", name: "食用油", category: "调味料类", purchaseDate: "2026-06-01", expiryDate: "2027-06-01", quantity: 1, unit: "瓶" },
  { id: "seed-inv-potato", name: "土豆", category: "普通食材类", purchaseDate: "2026-07-24", expiryDate: "2026-08-10", quantity: 5, unit: "个" },
  { id: "seed-inv-cucumber", name: "黄瓜", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 3, unit: "根" },
  { id: "seed-inv-pepper", name: "青椒", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 4, unit: "个" },
  { id: "seed-inv-tofu", name: "豆腐", category: "普通食材类", purchaseDate: "2026-07-26", expiryDate: "2026-07-28", quantity: 2, unit: "块" },
  { id: "seed-inv-carrot", name: "胡萝卜", category: "普通食材类", purchaseDate: "2026-07-24", expiryDate: "2026-08-05", quantity: 3, unit: "根" },
  { id: "seed-inv-cabbage", name: "白菜", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-31", quantity: 1, unit: "棵" },
  { id: "seed-inv-broccoli", name: "西兰花", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-29", quantity: 1, unit: "棵" },
  { id: "seed-inv-chicken", name: "鸡胸肉", category: "冷冻类", purchaseDate: "2026-07-22", expiryDate: "2026-08-05", quantity: 400, unit: "g" },
  { id: "seed-inv-lean", name: "瘦肉", category: "冷冻类", purchaseDate: "2026-07-23", expiryDate: "2026-08-02", quantity: 300, unit: "g" },
  { id: "seed-inv-ribs", name: "排骨", category: "冷冻类", purchaseDate: "2026-07-22", expiryDate: "2026-08-08", quantity: 600, unit: "g" },
  { id: "seed-inv-ham", name: "火腿", category: "普通食材类", purchaseDate: "2026-07-20", expiryDate: "2026-08-01", quantity: 1, unit: "根" },
  { id: "seed-inv-noodle", name: "面条", category: "普通食材类", purchaseDate: "2026-07-20", expiryDate: "2026-09-01", quantity: 2, unit: "把" },
  { id: "seed-inv-corn", name: "玉米", category: "普通食材类", purchaseDate: "2026-07-24", expiryDate: "2026-08-03", quantity: 3, unit: "根" },
  { id: "seed-inv-wintermelon", name: "冬瓜", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-08-02", quantity: 1, unit: "个" },
  { id: "seed-inv-seaweed", name: "紫菜", category: "调味料类", purchaseDate: "2026-06-01", expiryDate: "2027-06-01", quantity: 1, unit: "包" },
  { id: "seed-inv-peanut", name: "花生", category: "普通食材类", purchaseDate: "2026-06-10", expiryDate: "2027-01-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-chili", name: "干辣椒", category: "调味料类", purchaseDate: "2026-06-10", expiryDate: "2027-03-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-beanpaste", name: "豆瓣酱", category: "调味料类", purchaseDate: "2026-06-10", expiryDate: "2027-03-01", quantity: 1, unit: "瓶" },
  { id: "seed-inv-cola", name: "可乐", category: "普通食材类", purchaseDate: "2026-07-20", expiryDate: "2026-12-31", quantity: 2, unit: "罐" },
  { id: "seed-inv-rice", name: "米饭", category: "普通食材类", purchaseDate: "2026-07-26", expiryDate: "2026-07-27", quantity: 2, unit: "碗" },
  { id: "seed-inv-onion", name: "洋葱", category: "普通食材类", purchaseDate: "2026-07-24", expiryDate: "2026-08-06", quantity: 2, unit: "个" },
  { id: "seed-inv-pork-loin", name: "里脊肉", category: "冷冻类", purchaseDate: "2026-07-22", expiryDate: "2026-08-08", quantity: 300, unit: "g" },
  { id: "seed-inv-chicken-leg", name: "鸡腿肉", category: "冷冻类", purchaseDate: "2026-07-22", expiryDate: "2026-08-05", quantity: 500, unit: "g" },
  { id: "seed-inv-duck", name: "鸭肉", category: "冷冻类", purchaseDate: "2026-07-20", expiryDate: "2026-08-08", quantity: 500, unit: "g" },
  { id: "seed-inv-beef-brisket", name: "牛腩", category: "冷冻类", purchaseDate: "2026-07-20", expiryDate: "2026-08-12", quantity: 500, unit: "g" },
  { id: "seed-inv-lamb", name: "羊肉", category: "冷冻类", purchaseDate: "2026-07-22", expiryDate: "2026-08-06", quantity: 300, unit: "g" },
  { id: "seed-inv-beef", name: "牛肉", category: "冷冻类", purchaseDate: "2026-07-22", expiryDate: "2026-08-06", quantity: 300, unit: "g" },
  { id: "seed-inv-yellow-beef", name: "黄牛肉", category: "冷冻类", purchaseDate: "2026-07-22", expiryDate: "2026-08-06", quantity: 300, unit: "g" },
  { id: "seed-inv-eggplant", name: "茄子", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 3, unit: "个" },
  { id: "seed-inv-cabbage2", name: "包菜", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 1, unit: "个" },
  { id: "seed-inv-fungus", name: "木耳", category: "普通食材类", purchaseDate: "2026-07-10", expiryDate: "2026-12-01", quantity: 50, unit: "g" },
  { id: "seed-inv-kelp", name: "海带", category: "普通食材类", purchaseDate: "2026-07-10", expiryDate: "2026-12-01", quantity: 200, unit: "g" },
  { id: "seed-inv-lotus", name: "莲藕", category: "普通食材类", purchaseDate: "2026-07-24", expiryDate: "2026-08-02", quantity: 300, unit: "g" },
  { id: "seed-inv-radish", name: "萝卜", category: "普通食材类", purchaseDate: "2026-07-24", expiryDate: "2026-08-05", quantity: 1, unit: "个" },
  { id: "seed-inv-mushroom", name: "蘑菇", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 200, unit: "g" },
  { id: "seed-inv-shiitake", name: "香菇", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 100, unit: "g" },
  { id: "seed-inv-fans", name: "粉丝", category: "普通食材类", purchaseDate: "2026-06-10", expiryDate: "2027-01-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-shrimp", name: "虾", category: "冷冻类", purchaseDate: "2026-07-23", expiryDate: "2026-07-30", quantity: 300, unit: "g" },
  { id: "seed-inv-bass", name: "鲈鱼", category: "冷冻类", purchaseDate: "2026-07-25", expiryDate: "2026-07-28", quantity: 1, unit: "条" },
  { id: "seed-inv-clam", name: "花蛤", category: "冷冻类", purchaseDate: "2026-07-25", expiryDate: "2026-07-28", quantity: 500, unit: "g" },
  { id: "seed-inv-scallop", name: "扇贝", category: "冷冻类", purchaseDate: "2026-07-25", expiryDate: "2026-07-28", quantity: 6, unit: "个" },
  { id: "seed-inv-crab", name: "螃蟹", category: "冷冻类", purchaseDate: "2026-07-25", expiryDate: "2026-07-28", quantity: 3, unit: "只" },
  { id: "seed-inv-lettuce", name: "生菜", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 300, unit: "g" },
  { id: "seed-inv-oil-veg", name: "油麦菜", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 300, unit: "g" },
  { id: "seed-inv-water-spinach", name: "空心菜", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-29", quantity: 300, unit: "g" },
  { id: "seed-inv-celery", name: "芹菜", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 200, unit: "g" },
  { id: "seed-inv-zucchini", name: "西葫芦", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 2, unit: "个" },
  { id: "seed-inv-dried-tofu", name: "香干", category: "普通食材类", purchaseDate: "2026-07-24", expiryDate: "2026-08-01", quantity: 100, unit: "g" },
  { id: "seed-inv-green-bean", name: "四季豆", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-30", quantity: 300, unit: "g" },
  { id: "seed-inv-bean-sprout", name: "豆芽", category: "普通食材类", purchaseDate: "2026-07-25", expiryDate: "2026-07-28", quantity: 200, unit: "g" },
  { id: "seed-inv-hefen", name: "河粉", category: "普通食材类", purchaseDate: "2026-07-20", expiryDate: "2026-08-05", quantity: 300, unit: "g" },
  { id: "seed-inv-millet", name: "小米", category: "普通食材类", purchaseDate: "2026-06-10", expiryDate: "2027-01-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-rice-grain", name: "大米", category: "普通食材类", purchaseDate: "2026-06-10", expiryDate: "2027-01-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-soybean", name: "黄豆", category: "普通食材类", purchaseDate: "2026-06-10", expiryDate: "2027-01-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-flour", name: "面粉", category: "普通食材类", purchaseDate: "2026-06-10", expiryDate: "2027-01-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-yeast", name: "酵母", category: "调味料类", purchaseDate: "2026-06-10", expiryDate: "2027-03-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-milk", name: "牛奶", category: "普通食材类", purchaseDate: "2026-07-24", expiryDate: "2026-07-30", quantity: 1, unit: "盒" },
  { id: "seed-inv-oats", name: "燕麦", category: "普通食材类", purchaseDate: "2026-06-10", expiryDate: "2027-01-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-sweet-bean", name: "甜面酱", category: "调味料类", purchaseDate: "2026-06-10", expiryDate: "2027-03-01", quantity: 1, unit: "瓶" },
  { id: "seed-inv-oyster", name: "蚝油", category: "调味料类", purchaseDate: "2026-06-10", expiryDate: "2027-03-01", quantity: 1, unit: "瓶" },
  { id: "seed-inv-ketchup", name: "番茄酱", category: "调味料类", purchaseDate: "2026-06-10", expiryDate: "2027-03-01", quantity: 1, unit: "瓶" },
  { id: "seed-inv-chili-oil", name: "辣椒油", category: "调味料类", purchaseDate: "2026-06-10", expiryDate: "2027-03-01", quantity: 1, unit: "瓶" },
  { id: "seed-inv-pepper", name: "胡椒粉", category: "调味料类", purchaseDate: "2026-06-10", expiryDate: "2027-03-01", quantity: 1, unit: "瓶" },
  { id: "seed-inv-tremella", name: "银耳", category: "普通食材类", purchaseDate: "2026-06-10", expiryDate: "2027-01-01", quantity: 1, unit: "朵" },
  { id: "seed-inv-lotus-seed", name: "莲子", category: "普通食材类", purchaseDate: "2026-06-10", expiryDate: "2027-01-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-mung", name: "绿豆", category: "普通食材类", purchaseDate: "2026-06-10", expiryDate: "2027-01-01", quantity: 1, unit: "袋" },
  { id: "seed-inv-bacon", name: "腊肉", category: "冷冻类", purchaseDate: "2026-07-20", expiryDate: "2026-12-01", quantity: 100, unit: "g" },
  { id: "seed-inv-bean-angle", name: "豆角", category: "普通食材类", purchaseDate: "2026-07-24", expiryDate: "2026-08-02", quantity: 200, unit: "g" }
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

/* ---------------- 存储后端：云数据库 / 本地存储 自动降级 ---------------- */
// 集合名映射（购物车 cart 仅本地，不进云）
function collName(key) {
  if (key === KEYS.recipes) return "recipes"
  if (key === KEYS.inventory) return "inventory"
  if (key === KEYS.orders) return "orders"
  return null
}

let _db = null
const _pending = new Map()

function runOnce(key, fn) {
  if (_pending.get(key)) return _pending.get(key)
  const p = fn().finally(() => _pending.delete(key))
  _pending.set(key, p)
  return p
}

function initCloud(env) {
  if (wx.cloud && env) {
    _db = wx.cloud.database({ env })
    _cloudEnvId = env
  }
}

function cloudReady() {
  return !!(wx.cloud && _db)
}

// 分页读取云数据库全部文档（.get 默认 limit 20）
async function cloudGetAll(col) {
  const batch = 100
  let all = []
  let skip = 0
  while (true) {
    const res = await col.limit(batch).skip(skip).get()
    const data = res.data || []
    all = all.concat(data)
    if (data.length < batch) break
    skip += batch
  }
  return all
}

// 读全部：云端分页拉取，否则本地存储
async function getList(key) {
  if (cloudReady()) {
    try {
      const col = _db.collection(collName(key))
      const all = await cloudGetAll(col)
      return all
    } catch (e) {
      _lastCloudError = e
      console.error(`[cloud] 读取集合「${collName(key)}」失败：`, e && (e.errMsg || e.message || e))
      wx.showToast({
        title: "云端读取失败，检查集合权限",
        icon: "none"
      })
      throw e
    }
  }
  return wx.getStorageSync(key) || []
}

let _lastCloudError = null
function getLastCloudError() {
  return _lastCloudError
}

let _cloudEnvId = null

// 云端自诊断：逐项检查基础库/环境/集合，返回一段人话结论
async function diagnoseCloud() {
  const lines = []
  if (!wx.cloud) {
    return "基础库不支持云开发（wx.cloud 不存在），请升级调试基础库版本"
  }
  if (!_db) {
    return "云数据库未初始化：app.js 里 CLOUD_ENV 为空或 initCloud 未执行"
  }
  lines.push(`环境 ID：${_cloudEnvId || "(未知)"}`)
  const cols = ["recipes", "inventory", "orders"]
  for (const name of cols) {
    try {
      const res = await _db.collection(name).count()
      lines.push(`集合 ${name}：可访问，共 ${res.total} 条`)
    } catch (e) {
      const msg = (e && (e.errMsg || e.message)) || String(e)
      if (/collection.*not.*exist|-502005/i.test(msg)) {
        lines.push(`集合 ${name}：不存在！请在该环境下创建`)
      } else if (/permission|-502003|access denied/i.test(msg)) {
        lines.push(`集合 ${name}：无权限！请把安全规则设为 read:true write:true`)
      } else {
        lines.push(`集合 ${name}：读取失败 ${msg}`)
      }
    }
  }
  return lines.join("\n")
}

// 覆盖写全部：云端做增量 diff（新增/更新/删除），避免全量删写，否则本地存储
async function setList(key, list) {
  if (cloudReady()) {
    const col = _db.collection(collName(key))
    const oldDocs = await cloudGetAll(col)
    const oldById = new Map()
    oldDocs.forEach(doc => {
      const id = doc._id || doc.id
      if (id) oldById.set(String(id), doc)
    })

    const newById = new Map()
    ;(list || []).forEach(item => {
      const id = String(item.id)
      newById.set(id, item)
    })

    const toRemove = []
    oldById.forEach((doc, id) => {
      if (!newById.has(id)) toRemove.push(doc._id)
    })

    const toSet = []
    newById.forEach((item, id) => {
      const old = oldById.get(id)
      // 简化判断：只要新对象存在就 set（云开发 set 会覆盖）
      toSet.push(item)
    })

    // 分批执行，避免一次性 Promise.all 过多触发并发限制
    const batchSize = 20
    for (let i = 0; i < toRemove.length; i += batchSize) {
      await Promise.all(toRemove.slice(i, i + batchSize).map(id => col.doc(id).remove()))
    }
    for (let i = 0; i < toSet.length; i += batchSize) {
      await Promise.all(toSet.slice(i, i + batchSize).map(item => col.doc(String(item.id)).set({ data: item })))
    }
    return
  }
  wx.setStorageSync(key, list)
}

/* ---------------- 菜谱 ---------------- */

async function ensureSeedRecipes() {
  return runOnce("ensureSeedRecipes", async () => {
    try {
      const existing = await getList(KEYS.recipes)
      if (!existing.length) {
        // 首次：若本地有旧数据则迁移到云端，否则写入种子
        const local = wx.getStorageSync(KEYS.recipes) || []
        await setList(KEYS.recipes, local.length ? local : seedRecipes)
        return
      }
      // 之后每次启动：把种子里「本地还没有」的菜按名称补全，老菜不受影响
      const existingNames = new Set(existing.map(r => normalizeName(r.name)))
      const toAdd = seedRecipes.filter(r => !existingNames.has(normalizeName(r.name)))
      if (toAdd.length) {
        await setList(KEYS.recipes, [...toAdd, ...existing])
      }
    } catch (e) {
      // 云端写入/更新失败时不阻断页面：已有数据可继续读，无数据时降级到本地种子
      console.error("[ensureSeedRecipes] 云端种子同步失败：", e)
      _lastCloudError = e
    }
  })
}

async function getRecipes() {
  await ensureSeedRecipes()
  try {
    return await getList(KEYS.recipes)
  } catch (e) {
    console.error("[getRecipes] 云端读取失败，降级到本地种子：", e)
    _lastCloudError = e
    return seedRecipes
  }
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

async function saveRecipe(recipe) {
  const recipes = await getRecipes()
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

  await setList(KEYS.recipes, recipes)
  return nextRecipe
}

async function removeRecipe(id) {
  const recipes = await getRecipes()
  await setList(KEYS.recipes, recipes.filter(item => item.id !== id))
  const cart = getCart()
  delete cart[id]
  setCart(cart)
}

async function getRecipeById(id) {
  const recipes = await getRecipes()
  return recipes.find(item => item.id === id) || null
}

/* ---------------- 购物车（兼容旧逻辑，保留但不再主用） ---------------- */

function getCart() {
  return wx.getStorageSync(KEYS.cart) || {}
}

function setCart(cart) {
  wx.setStorageSync(KEYS.cart, cart)
}

/* ---------------- 食材库存 ---------------- */

async function ensureSeedInventory() {
  return runOnce("ensureSeedInventory", async () => {
    const inventory = await getList(KEYS.inventory)
    if (!inventory.length) {
      const local = wx.getStorageSync(KEYS.inventory) || []
      await setList(KEYS.inventory, local.length ? local : seedInventory)
    }
  })
}

async function getInventory() {
  await ensureSeedInventory()
  return await getList(KEYS.inventory)
}

async function saveInventoryItem(item) {
  const inventory = await getInventory()
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

  await setList(KEYS.inventory, inventory)
  return nextItem
}

async function removeInventoryItem(id) {
  const inventory = await getInventory()
  await setList(KEYS.inventory, inventory.filter(it => it.id !== id))
}

async function getInventoryItem(id) {
  const inventory = await getInventory()
  return inventory.find(it => it.id === id) || null
}

// 按名称汇总某食材的库存总量
async function getInventoryTotalByName(name) {
  const inventory = await getInventory()
  return inventory
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
async function checkAvailability(requirements) {
  return Promise.all((requirements || []).map(async req => {
    const available = await getInventoryTotalByName(req.name)
    const required = Number(req.qty) || 0
    return {
      name: req.name,
      unit: req.unit || "",
      required,
      available,
      sufficient: available >= required
    }
  }))
}

// 检查单个菜谱是否食材充足，返回 {ok, missing:[{name,required,available}]}
async function checkRecipe(recipe) {
  const requirements = normalizeIngredients(recipe)
  const lines = await checkAvailability(requirements)
  const missing = lines.filter(l => !l.sufficient)
  return {
    ok: missing.length === 0,
    missing,
    lines
  }
}

// 根据当前库存推荐菜谱：先按「食材齐备数」降序，再按齐备比例降序
// 返回 [{id, name, category, total, available, enough, ingredients}]
async function recommendRecipes(limit) {
  const recipes = await getRecipes()
  const scored = await Promise.all(recipes.map(async recipe => {
    const lines = await checkAvailability(normalizeIngredients(recipe))
    const total = lines.length
    const available = lines.filter(l => l.sufficient).length
    return { recipe, total, available, ratio: total ? available / total : 0 }
  }))
  scored.sort((a, b) => {
    if (b.available !== a.available) return b.available - a.available
    return b.ratio - a.ratio
  })
  return scored
    .filter(s => s.available > 0)
    .slice(0, limit || 6)
    .map(s => ({
      id: s.recipe.id,
      name: s.recipe.name,
      category: s.recipe.category || "未分类",
      total: s.total,
      available: s.available,
      enough: s.available === s.total,
      ingredients: s.recipe.ingredients
    }))
}

// 扣减库存：requirements=[{name, qty, unit}]，按购入日期早的优先消耗（FIFO）
// 返回 [{name, unit, required, consumed, shortage}]
async function consumeInventory(requirements) {
  const inventory = await getInventory()
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
  await setList(KEYS.inventory, remain)

  return results
}

/* ---------------- 做饭记录（记账） ---------------- */

async function getOrders() {
  return getList(KEYS.orders)
}

// order: { note, dishes:[{name, type}], consumed:[{name, unit, required, consumed, shortage}] }
async function saveOrder(order) {
  const orders = await getOrders()
  const nextOrder = {
    id: createId("order"),
    createdAt: formatDate(new Date()),
    ...order
  }
  orders.unshift(nextOrder)
  await setList(KEYS.orders, orders)
  return nextOrder
}

async function removeOrder(id) {
  const orders = await getOrders()
  await setList(KEYS.orders, orders.filter(item => item.id !== id))
}

module.exports = {
  CATEGORIES,
  normalizeName,
  getIngredientHint,
  addDays,
  initCloud,
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
  recommendRecipes,
  consumeInventory,
  getOrders,
  saveOrder,
  removeOrder,
  getLastCloudError,
  diagnoseCloud
}
