// ============================================================================
// USER & AUTH TYPES
// ============================================================================

export type UserPlan = 'FREE' | 'BASIC' | 'PRO'

export interface UserProfile {
  uid: string
  email: string
  displayName: string | null
  photoURL: string | null
  createdAt: Date
  updatedAt: Date
  plan: UserPlan
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  businessProfile: BusinessProfile | null
  exportCountToday: number
  lastExportDate: string | null
  bonusExports?: number
  isAdmin?: boolean
}

export interface BusinessProfile {
  name: string
  address: string | null
  phone: string | null
  website: string | null
}

// ============================================================================
// NUTRITION TYPES
// ============================================================================

export interface NutrientsPer100g {
  calories: number | null
  totalFat: number | null
  saturatedFat: number | null
  transFat: number | null
  cholesterol: number | null
  sodium: number | null
  totalCarbohydrate: number | null
  dietaryFiber: number | null
  totalSugars: number | null
  addedSugars: number | null
  protein: number | null
  vitaminD: number | null
  calcium: number | null
  iron: number | null
  potassium: number | null
}

export interface NutrientTotals extends NutrientsPer100g {
  // Same shape, but represents totals for a recipe or per serving
}

export type NutritionProvider = 'USDA' | 'NUTRITIONIX' | 'MANUAL'

export interface FoodSearchResult {
  id: string
  provider: NutritionProvider
  name: string
  brandName?: string
  category?: string
  score?: number
}

export interface FoodDetail {
  id: string
  provider: NutritionProvider
  name: string
  brandName?: string
  nutrientsPer100g: NutrientsPer100g
  servingSize?: string
  servingSizeGrams?: number
  allergenHints: string[]
}

// ============================================================================
// RECIPE TYPES
// ============================================================================

export interface RecipeIngredient {
  lineId: string
  queryText: string
  provider: NutritionProvider
  providerFoodId: string
  selectedFoodName: string
  matchConfidence: number
  amountGrams: number
  unitOriginal?: {
    value: number
    unit: string
  }
  nutrientSnapshotPer100g: NutrientsPer100g
  allergensDetected: string[]
  userAllergenOverride: string[] | null
}

export interface ComputedNutrition {
  totalsPerBatch: NutrientTotals
  perServing: NutrientTotals
  roundingNotes: string[]
  missingFields: string[]
  allergenStatement: {
    contains: string[]
    mayContain: string[]
    note: string | null
  }
}

export type LabelFormatPreset = '2x4' | '3x4' | '4x6' | '8.5x11'

export interface LabelSettings {
  formatPreset: LabelFormatPreset
  includeMicros: boolean
  showCaloriesFromFat: boolean
  brandingEnabled: boolean
  customFooterText: string | null
}

export interface RecipeExport {
  exportId: string
  createdAt: Date
  format: 'PDF' | 'PNG'
  preset: LabelFormatPreset
  storagePath: string
  signedUrl: string | null
  hash: string
  version: string
  disclaimerAcceptedAt: Date
}

export interface Recipe {
  id: string
  uid: string
  name: string
  servingsPerBatch: number
  servingSizeText: string
  servingSizeGrams: number | null
  createdAt: Date
  updatedAt: Date
  ingredients: RecipeIngredient[]
  computed: ComputedNutrition | null
  labelSettings: LabelSettings
  exports: RecipeExport[]
}

// ============================================================================
// AUDIT TYPES
// ============================================================================

export type AuditEventType =
  | 'DISCLAIMER_ACCEPTED'
  | 'EXPORT_CREATED'
  | 'PLAN_CHANGED'
  | 'RECIPE_CREATED'
  | 'RECIPE_UPDATED'
  | 'RECIPE_DELETED'

export interface AuditEvent {
  id: string
  uid: string
  type: AuditEventType
  recipeId?: string
  timestamp: Date
  metadata: Record<string, unknown>
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  code?: string
}

// ============================================================================
// LABEL RENDERING TYPES
// ============================================================================

export interface LabelData {
  servingsPerContainer: number
  servingSize: string
  calories: number
  totalFat: number
  saturatedFat: number
  transFat: number
  cholesterol: number
  sodium: number
  totalCarbohydrate: number
  dietaryFiber: number
  totalSugars: number
  addedSugars: number | null
  protein: number
  vitaminD: number | null
  calcium: number | null
  iron: number | null
  potassium: number | null
  allergenStatement?: string
  businessName?: string
  businessAddress?: string
  netWeight?: string
  customFooter?: string
}

export interface LabelDimensions {
  width: number
  height: number
  unit: 'in' | 'px'
}

export const LABEL_PRESETS: Record<LabelFormatPreset, LabelDimensions> = {
  '2x4': { width: 2, height: 4, unit: 'in' },
  '3x4': { width: 3, height: 4, unit: 'in' },
  '4x6': { width: 4, height: 6, unit: 'in' },
  '8.5x11': { width: 8.5, height: 11, unit: 'in' },
}
