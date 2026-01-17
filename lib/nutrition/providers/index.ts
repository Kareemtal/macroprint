import type { NutritionProvider } from './types'
import { USDAProvider, usdaProvider } from './usda'
import { NutritionixProvider } from './nutritionix'

export { USDAProvider, usdaProvider } from './usda'
export { NutritionixProvider } from './nutritionix'
export type { NutritionProvider, SearchOptions } from './types'

export type ProviderName = 'USDA' | 'NUTRITIONIX'

/**
 * Get a nutrition provider by name
 */
export function getProvider(name: ProviderName): NutritionProvider {
  switch (name) {
    case 'USDA':
      return usdaProvider
    case 'NUTRITIONIX':
      return new NutritionixProvider()
    default:
      throw new Error(`Unknown nutrition provider: ${name}`)
  }
}

/**
 * Default provider
 */
export const defaultProvider = usdaProvider
