import type { FoodSearchResult, FoodDetail } from '@/lib/types'

/**
 * Interface for nutrition data providers
 * Allows swapping between USDA, Nutritionix, or other data sources
 */
export interface NutritionProvider {
  name: string

  /**
   * Search for foods by query string
   */
  searchFoods(query: string, options?: SearchOptions): Promise<FoodSearchResult[]>

  /**
   * Get detailed food information by ID
   */
  getFood(foodId: string): Promise<FoodDetail | null>
}

export interface SearchOptions {
  limit?: number
  dataType?: string[]
  brandOwner?: string
}

// USDA FoodData Central API types
export interface USDASearchResponse {
  totalHits: number
  currentPage: number
  totalPages: number
  foods: USDAFoodItem[]
}

export interface USDAFoodItem {
  fdcId: number
  description: string
  dataType: string
  brandOwner?: string
  brandName?: string
  gtinUpc?: string
  ingredients?: string
  servingSize?: number
  servingSizeUnit?: string
  foodNutrients: USDAFoodNutrient[]
  score?: number
}

export interface USDAFoodNutrient {
  nutrientId?: number
  nutrientName?: string
  nutrientNumber?: string
  unitName?: string
  value?: number
  amount?: number
  nutrient?: {
    id: number
    name: string
    number: string
    unitName: string
  }
  derivationCode?: string
  derivationDescription?: string
}

export interface USDAFoodDetailResponse extends USDAFoodItem {
  foodCategory?: string
  foodCategoryId?: number
  publicationDate?: string
}

// Nutrient ID mappings for USDA
export const USDA_NUTRIENT_IDS = {
  calories: 1008, // Energy (kcal)
  totalFat: 1004, // Total lipid (fat)
  saturatedFat: 1258, // Fatty acids, total saturated
  transFat: 1257, // Fatty acids, total trans
  cholesterol: 1253, // Cholesterol
  sodium: 1093, // Sodium, Na
  totalCarbohydrate: 1005, // Carbohydrate, by difference
  dietaryFiber: 1079, // Fiber, total dietary
  totalSugars: 2000, // Sugars, total including NLEA
  addedSugars: 1235, // Sugars, added
  protein: 1003, // Protein
  vitaminD: 1114, // Vitamin D (D2 + D3)
  calcium: 1087, // Calcium, Ca
  iron: 1089, // Iron, Fe
  potassium: 1092, // Potassium, K
} as const

// Reverse mapping for quick lookup
export const USDA_NUTRIENT_ID_TO_KEY = Object.entries(USDA_NUTRIENT_IDS).reduce(
  (acc, [key, id]) => {
    acc[id] = key as keyof typeof USDA_NUTRIENT_IDS
    return acc
  },
  {} as Record<number, keyof typeof USDA_NUTRIENT_IDS>
)
