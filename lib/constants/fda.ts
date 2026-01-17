// ============================================================================
// FDA DAILY VALUES (2020+ Reference)
// https://www.fda.gov/food/new-nutrition-facts-label/daily-value-new-nutrition-and-supplement-facts-labels
// ============================================================================

export const FDA_DAILY_VALUES_VERSION = '2020'

export const FDA_DAILY_VALUES = {
  totalFat: 78, // g
  saturatedFat: 20, // g
  transFat: null, // No DV established
  cholesterol: 300, // mg
  sodium: 2300, // mg
  totalCarbohydrate: 275, // g
  dietaryFiber: 28, // g
  addedSugars: 50, // g
  protein: 50, // g (when declared)
  vitaminD: 20, // mcg
  calcium: 1300, // mg
  iron: 18, // mg
  potassium: 4700, // mg
}

// ============================================================================
// FDA ROUNDING RULES
// https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-nutrition-labeling-manual-guide-developing-and-using-data-bases
// ============================================================================

export interface RoundingRule {
  threshold: number
  increment: number
  declarationRule: 'round' | 'round-down' | 'round-nearest'
}

export const FDA_ROUNDING_RULES: Record<string, RoundingRule[]> = {
  calories: [
    { threshold: 5, increment: 0, declarationRule: 'round-down' }, // <5 cal = 0
    { threshold: 50, increment: 5, declarationRule: 'round-nearest' }, // 5-50 = nearest 5
    { threshold: Infinity, increment: 10, declarationRule: 'round-nearest' }, // >50 = nearest 10
  ],
  totalFat: [
    { threshold: 0.5, increment: 0, declarationRule: 'round-down' }, // <0.5g = 0
    { threshold: 5, increment: 0.5, declarationRule: 'round-nearest' }, // 0.5-5g = nearest 0.5
    { threshold: Infinity, increment: 1, declarationRule: 'round-nearest' }, // >5g = nearest 1
  ],
  saturatedFat: [
    { threshold: 0.5, increment: 0, declarationRule: 'round-down' },
    { threshold: 5, increment: 0.5, declarationRule: 'round-nearest' },
    { threshold: Infinity, increment: 1, declarationRule: 'round-nearest' },
  ],
  transFat: [
    { threshold: 0.5, increment: 0, declarationRule: 'round-down' },
    { threshold: 5, increment: 0.5, declarationRule: 'round-nearest' },
    { threshold: Infinity, increment: 1, declarationRule: 'round-nearest' },
  ],
  cholesterol: [
    { threshold: 2, increment: 0, declarationRule: 'round-down' }, // <2mg = 0
    { threshold: 5, increment: 0, declarationRule: 'round-down' }, // 2-5mg = "less than 5mg"
    { threshold: Infinity, increment: 5, declarationRule: 'round-nearest' }, // >5mg = nearest 5
  ],
  sodium: [
    { threshold: 5, increment: 0, declarationRule: 'round-down' }, // <5mg = 0
    { threshold: 140, increment: 5, declarationRule: 'round-nearest' }, // 5-140mg = nearest 5
    { threshold: Infinity, increment: 10, declarationRule: 'round-nearest' }, // >140mg = nearest 10
  ],
  totalCarbohydrate: [
    { threshold: 0.5, increment: 0, declarationRule: 'round-down' },
    { threshold: Infinity, increment: 1, declarationRule: 'round-nearest' },
  ],
  dietaryFiber: [
    { threshold: 0.5, increment: 0, declarationRule: 'round-down' },
    { threshold: Infinity, increment: 1, declarationRule: 'round-nearest' },
  ],
  totalSugars: [
    { threshold: 0.5, increment: 0, declarationRule: 'round-down' },
    { threshold: Infinity, increment: 1, declarationRule: 'round-nearest' },
  ],
  addedSugars: [
    { threshold: 0.5, increment: 0, declarationRule: 'round-down' },
    { threshold: Infinity, increment: 1, declarationRule: 'round-nearest' },
  ],
  protein: [
    { threshold: 0.5, increment: 0, declarationRule: 'round-down' },
    { threshold: Infinity, increment: 1, declarationRule: 'round-nearest' },
  ],
}

// ============================================================================
// COMMON ALLERGENS (FDA Big 9)
// ============================================================================

export const FDA_MAJOR_ALLERGENS = [
  'Milk',
  'Eggs',
  'Fish',
  'Crustacean Shellfish',
  'Tree Nuts',
  'Peanuts',
  'Wheat',
  'Soybeans',
  'Sesame',
] as const

export type FDAAllergen = typeof FDA_MAJOR_ALLERGENS[number]

// Keywords that indicate allergen presence
export const ALLERGEN_KEYWORDS: Record<FDAAllergen, string[]> = {
  'Milk': ['milk', 'cream', 'butter', 'cheese', 'yogurt', 'whey', 'casein', 'lactose', 'ghee', 'dairy'],
  'Eggs': ['egg', 'eggs', 'albumin', 'mayonnaise', 'meringue', 'eggnog'],
  'Fish': ['fish', 'salmon', 'tuna', 'cod', 'tilapia', 'halibut', 'anchovy', 'bass', 'trout', 'mackerel'],
  'Crustacean Shellfish': ['shrimp', 'crab', 'lobster', 'crawfish', 'crayfish', 'prawn'],
  'Tree Nuts': ['almond', 'cashew', 'walnut', 'pecan', 'pistachio', 'hazelnut', 'macadamia', 'brazil nut', 'chestnut', 'pine nut'],
  'Peanuts': ['peanut', 'peanuts', 'groundnut'],
  'Wheat': ['wheat', 'flour', 'bread', 'pasta', 'semolina', 'spelt', 'kamut', 'durum', 'farina', 'couscous'],
  'Soybeans': ['soy', 'soya', 'tofu', 'tempeh', 'edamame', 'miso', 'soybean'],
  'Sesame': ['sesame', 'tahini', 'halvah'],
}

// ============================================================================
// UNIT CONVERSIONS
// ============================================================================

export const VOLUME_TO_GRAMS: Record<string, number> = {
  // These are approximate - actual conversion depends on ingredient density
  // Users should override with actual gram weights when possible
  'tsp': 5,
  'teaspoon': 5,
  'tbsp': 15,
  'tablespoon': 15,
  'cup': 240,
  'fl oz': 30,
  'ml': 1,
  'liter': 1000,
  'l': 1000,
}

export const WEIGHT_TO_GRAMS: Record<string, number> = {
  'g': 1,
  'gram': 1,
  'grams': 1,
  'kg': 1000,
  'kilogram': 1000,
  'oz': 28.35,
  'ounce': 28.35,
  'lb': 453.6,
  'pound': 453.6,
  'mg': 0.001,
  'milligram': 0.001,
}
