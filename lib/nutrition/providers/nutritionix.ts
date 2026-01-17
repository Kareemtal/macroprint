import type { FoodSearchResult, FoodDetail } from '@/lib/types'
import type { NutritionProvider, SearchOptions } from './types'

/**
 * Nutritionix provider (stub implementation)
 * TODO: Implement when Nutritionix integration is needed
 * https://developer.nutritionix.com/
 */
export class NutritionixProvider implements NutritionProvider {
  name = 'NUTRITIONIX'
  private appId: string
  private apiKey: string

  constructor(appId?: string, apiKey?: string) {
    this.appId = appId || process.env.NUTRITIONIX_APP_ID || ''
    this.apiKey = apiKey || process.env.NUTRITIONIX_API_KEY || ''
  }

  async searchFoods(_query: string, _options?: SearchOptions): Promise<FoodSearchResult[]> {
    if (!this.appId || !this.apiKey) {
      throw new Error('Nutritionix credentials not configured')
    }

    // TODO: Implement Nutritionix search
    // API docs: https://developer.nutritionix.com/docs/v2
    throw new Error('Nutritionix provider not yet implemented')
  }

  async getFood(_foodId: string): Promise<FoodDetail | null> {
    if (!this.appId || !this.apiKey) {
      throw new Error('Nutritionix credentials not configured')
    }

    // TODO: Implement Nutritionix food detail
    throw new Error('Nutritionix provider not yet implemented')
  }
}
