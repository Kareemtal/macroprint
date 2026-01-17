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
    this.apiKey = apiKey || process.env.USDA_API_KEY || ''
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
      throw new Error(`USDA API error: ${response.status} ${response.statusText}`)
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

    for (const nutrient of nutrients) {
      const key = USDA_NUTRIENT_ID_TO_KEY[nutrient.nutrientId]
      if (key && key in result) {
        // Convert units if needed
        let value = nutrient.value

        // USDA reports some nutrients in different units
        // Vitamin D is in IU or mcg depending on data type
        // Cholesterol is in mg
        // Most macros are in g

        // Store the value (already per 100g from USDA)
        result[key] = value
      }
    }

    return result
  }
}

// Default instance using environment variable
export const usdaProvider = new USDAProvider()
