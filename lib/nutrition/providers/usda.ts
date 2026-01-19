import type { FoodSearchResult, FoodDetail, NutrientsPer100g } from '@/lib/types'
import type {
  NutritionProvider,
  SearchOptions,
  USDASearchResponse,
  USDAFoodDetailResponse,
  USDAFoodNutrient,
} from './types'
import { USDA_NUTRIENT_IDS, USDA_NUTRIENT_ID_TO_KEY } from './types'
import { detectAllergens } from '../calculator'

const USDA_API_BASE = 'https://api.nal.usda.gov/fdc/v1'

/**
 * USDA FoodData Central provider
 * https://fdc.nal.usda.gov/api-guide.html
 */
export class USDAProvider implements NutritionProvider {
  name = 'USDA'
  private apiKey: string

  constructor(apiKey?: string) {
    this.apiKey = (apiKey || process.env.USDA_API_KEY || '').trim()
    if (!this.apiKey) {
      console.warn('USDA API key not configured')
    }
  }

  async searchFoods(query: string, options?: SearchOptions): Promise<FoodSearchResult[]> {
    if (!this.apiKey) {
      throw new Error('USDA API key not configured')
    }

    const limit = options?.limit || 25
    const dataTypes = options?.dataType || ['Foundation', 'SR Legacy', 'Survey (FNDDS)', 'Branded']

    const params = new URLSearchParams({
      api_key: this.apiKey,
      query,
      pageSize: limit.toString(),
      dataType: dataTypes.join(','),
    })

    if (options?.brandOwner) {
      params.set('brandOwner', options.brandOwner)
    }

    const response = await fetch(`${USDA_API_BASE}/foods/search?${params}`)

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`USDA API error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data: USDASearchResponse = await response.json()

    return data.foods.map((food) => ({
      id: food.fdcId.toString(),
      provider: 'USDA' as const,
      name: food.description,
      brandName: food.brandOwner || food.brandName,
      category: food.dataType,
      score: food.score,
    }))
  }

  async getFood(foodId: string): Promise<FoodDetail | null> {
    if (!this.apiKey) {
      throw new Error('USDA API key not configured')
    }

    const params = new URLSearchParams({
      api_key: this.apiKey,
    })

    const response = await fetch(`${USDA_API_BASE}/food/${foodId}?${params}`)

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`USDA API error: ${response.status} ${response.statusText}`)
    }

    const data: USDAFoodDetailResponse = await response.json()

    const nutrients = this.extractNutrients(data.foodNutrients)
    const allergenHints = detectAllergens(data.description)

    // Check ingredients list for additional allergens
    if (data.ingredients) {
      const ingredientAllergens = detectAllergens(data.ingredients)
      ingredientAllergens.forEach((allergen) => {
        if (!allergenHints.includes(allergen)) {
          allergenHints.push(allergen)
        }
      })
    }

    return {
      id: data.fdcId.toString(),
      provider: 'USDA',
      name: data.description,
      brandName: data.brandOwner || data.brandName,
      nutrientsPer100g: nutrients,
      servingSize: data.servingSize
        ? `${data.servingSize}${data.servingSizeUnit || 'g'}`
        : undefined,
      servingSizeGrams: data.servingSize,
      allergenHints,
    }
  }

  private extractNutrients(nutrients: USDAFoodNutrient[]): NutrientsPer100g {
    const result: NutrientsPer100g = {
      calories: null,
      totalFat: null,
      saturatedFat: null,
      transFat: null,
      cholesterol: null,
      sodium: null,
      totalCarbohydrate: null,
      dietaryFiber: null,
      totalSugars: null,
      addedSugars: null,
      protein: null,
      vitaminD: null,
      calcium: null,
      iron: null,
      potassium: null,
    }

    // Map of nutrient ID to value for quick lookup
    const nutrientMap = new Map<number, number>()
    for (const nutrient of nutrients) {
      // Handle both flat and nested structures
      const id = nutrient.nutrientId ?? nutrient.nutrient?.id
      const val = nutrient.value ?? nutrient.amount

      if (id && typeof val === 'number') {
        nutrientMap.set(id, val)
      }
    }

    // 1. Try standard mappings first
    for (const nutrient of nutrients) {
      const id = nutrient.nutrientId ?? nutrient.nutrient?.id
      if (!id) continue

      const key = USDA_NUTRIENT_ID_TO_KEY[id]
      if (key && key in result) {
        // USDA API returns 'value' for Foundation foods but 'amount' for Branded foods
        const val = nutrient.value ?? nutrient.amount

        if (typeof val === 'number') {
          result[key] = val
        }
      }
    }

    // 2. Check fallbacks for missing values
    // USDA often uses different IDs for the same nutrient based on source (survey vs label vs legacy)
    const FALLBACK_NUTRIENT_IDS: Partial<Record<keyof NutrientsPer100g, number[]>> = {
      calories: [
        2047, // Energy (Atwater Specific Factors)
        2048, // Energy (Atwater General Factors)
      ],
      totalCarbohydrate: [
        1005, // Carbohydrate, by difference is standard (1005), but sometimes...
        // Add more if identified. Currently 1005 is the main one.
      ],
      // Add other fallbacks as discovered necessary
    }

    for (const [key, fallbacks] of Object.entries(FALLBACK_NUTRIENT_IDS)) {
      const nutrientKey = key as keyof NutrientsPer100g
      if (result[nutrientKey] === null || result[nutrientKey] === 0) {
        for (const fallbackId of fallbacks) {
          if (nutrientMap.has(fallbackId)) {
            const value = nutrientMap.get(fallbackId)
            // Only use if valid value (some might be 0 which we might accept as 0, or prefer a non-zero if multiple exist)
            // But usually the first valid one we find is better than nothing.
            if (value !== undefined && value !== null) {
              result[nutrientKey] = value
              break // Found a value, stop looking for this nutrient
            }
          }
        }
      }
    }

    return result
  }
}

// Default instance using environment variable
export const usdaProvider = new USDAProvider()
