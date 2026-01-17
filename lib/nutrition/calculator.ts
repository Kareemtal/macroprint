import {
  NutrientsPer100g,
  NutrientTotals,
  RecipeIngredient,
  ComputedNutrition,
} from '@/lib/types'
import {
  FDA_DAILY_VALUES,
  FDA_DAILY_VALUES_VERSION,
  FDA_ROUNDING_RULES,
  ALLERGEN_KEYWORDS,
  FDAAllergen,
  FDA_MAJOR_ALLERGENS,
} from '@/lib/constants/fda'

// ============================================================================
// CORE CALCULATION FUNCTIONS
// ============================================================================

/**
 * Creates an empty nutrient totals object with all fields set to 0
 */
export function createEmptyNutrients(): NutrientTotals {
  return {
    calories: 0,
    totalFat: 0,
    saturatedFat: 0,
    transFat: 0,
    cholesterol: 0,
    sodium: 0,
    totalCarbohydrate: 0,
    dietaryFiber: 0,
    totalSugars: 0,
    addedSugars: 0,
    protein: 0,
    vitaminD: 0,
    calcium: 0,
    iron: 0,
    potassium: 0,
  }
}

/**
 * Calculate nutrient amounts for a given amount of an ingredient
 */
export function calculateIngredientNutrients(
  nutrientsPer100g: NutrientsPer100g,
  amountGrams: number
): NutrientTotals {
  const multiplier = amountGrams / 100
  const result = createEmptyNutrients()

  for (const key of Object.keys(result) as Array<keyof NutrientTotals>) {
    const value = nutrientsPer100g[key]
    result[key] = value !== null ? value * multiplier : null
  }

  return result
}

/**
 * Sum nutrients from multiple ingredients
 */
export function sumNutrients(
  ingredients: Array<{ nutrientsPer100g: NutrientsPer100g; amountGrams: number }>
): NutrientTotals {
  const totals = createEmptyNutrients()

  for (const ingredient of ingredients) {
    const ingredientNutrients = calculateIngredientNutrients(
      ingredient.nutrientsPer100g,
      ingredient.amountGrams
    )

    for (const key of Object.keys(totals) as Array<keyof NutrientTotals>) {
      const current = totals[key]
      const add = ingredientNutrients[key]
      
      if (add !== null) {
        totals[key] = (current ?? 0) + add
      }
    }
  }

  return totals
}

/**
 * Divide nutrients by number of servings
 */
export function divideNutrients(
  totals: NutrientTotals,
  servings: number
): NutrientTotals {
  if (servings <= 0) {
    throw new Error('Servings must be greater than 0')
  }

  const result = createEmptyNutrients()

  for (const key of Object.keys(result) as Array<keyof NutrientTotals>) {
    const value = totals[key]
    result[key] = value !== null ? value / servings : null
  }

  return result
}

// ============================================================================
// FDA ROUNDING FUNCTIONS
// ============================================================================

/**
 * Apply FDA rounding rules to a single nutrient value
 */
export function roundNutrient(
  nutrientKey: string,
  value: number | null
): number | null {
  if (value === null) return null

  const rules = FDA_ROUNDING_RULES[nutrientKey]
  if (!rules) {
    // Default: round to nearest 1
    return Math.round(value)
  }

  for (const rule of rules) {
    if (value < rule.threshold) {
      if (rule.increment === 0) {
        return rule.declarationRule === 'round-down' ? 0 : value
      }
      return Math.round(value / rule.increment) * rule.increment
    }
  }

  // Should never reach here
  return Math.round(value)
}

/**
 * Apply FDA rounding rules to all nutrients
 */
export function roundAllNutrients(
  nutrients: NutrientTotals
): NutrientTotals {
  const rounded = createEmptyNutrients()

  for (const key of Object.keys(nutrients) as Array<keyof NutrientTotals>) {
    rounded[key] = roundNutrient(key, nutrients[key])
  }

  return rounded
}

// ============================================================================
// PERCENT DAILY VALUE CALCULATION
// ============================================================================

export interface PercentDailyValues {
  totalFat: number | null
  saturatedFat: number | null
  cholesterol: number | null
  sodium: number | null
  totalCarbohydrate: number | null
  dietaryFiber: number | null
  addedSugars: number | null
  protein: number | null
  vitaminD: number | null
  calcium: number | null
  iron: number | null
  potassium: number | null
}

/**
 * Calculate percent daily values for nutrients
 */
export function calculatePercentDV(
  nutrients: NutrientTotals
): PercentDailyValues {
  const dv: PercentDailyValues = {
    totalFat: null,
    saturatedFat: null,
    cholesterol: null,
    sodium: null,
    totalCarbohydrate: null,
    dietaryFiber: null,
    addedSugars: null,
    protein: null,
    vitaminD: null,
    calcium: null,
    iron: null,
    potassium: null,
  }

  if (nutrients.totalFat !== null && FDA_DAILY_VALUES.totalFat) {
    dv.totalFat = Math.round((nutrients.totalFat / FDA_DAILY_VALUES.totalFat) * 100)
  }
  if (nutrients.saturatedFat !== null && FDA_DAILY_VALUES.saturatedFat) {
    dv.saturatedFat = Math.round((nutrients.saturatedFat / FDA_DAILY_VALUES.saturatedFat) * 100)
  }
  if (nutrients.cholesterol !== null && FDA_DAILY_VALUES.cholesterol) {
    dv.cholesterol = Math.round((nutrients.cholesterol / FDA_DAILY_VALUES.cholesterol) * 100)
  }
  if (nutrients.sodium !== null && FDA_DAILY_VALUES.sodium) {
    dv.sodium = Math.round((nutrients.sodium / FDA_DAILY_VALUES.sodium) * 100)
  }
  if (nutrients.totalCarbohydrate !== null && FDA_DAILY_VALUES.totalCarbohydrate) {
    dv.totalCarbohydrate = Math.round((nutrients.totalCarbohydrate / FDA_DAILY_VALUES.totalCarbohydrate) * 100)
  }
  if (nutrients.dietaryFiber !== null && FDA_DAILY_VALUES.dietaryFiber) {
    dv.dietaryFiber = Math.round((nutrients.dietaryFiber / FDA_DAILY_VALUES.dietaryFiber) * 100)
  }
  if (nutrients.addedSugars !== null && FDA_DAILY_VALUES.addedSugars) {
    dv.addedSugars = Math.round((nutrients.addedSugars / FDA_DAILY_VALUES.addedSugars) * 100)
  }
  if (nutrients.protein !== null && FDA_DAILY_VALUES.protein) {
    dv.protein = Math.round((nutrients.protein / FDA_DAILY_VALUES.protein) * 100)
  }
  if (nutrients.vitaminD !== null && FDA_DAILY_VALUES.vitaminD) {
    dv.vitaminD = Math.round((nutrients.vitaminD / FDA_DAILY_VALUES.vitaminD) * 100)
  }
  if (nutrients.calcium !== null && FDA_DAILY_VALUES.calcium) {
    dv.calcium = Math.round((nutrients.calcium / FDA_DAILY_VALUES.calcium) * 100)
  }
  if (nutrients.iron !== null && FDA_DAILY_VALUES.iron) {
    dv.iron = Math.round((nutrients.iron / FDA_DAILY_VALUES.iron) * 100)
  }
  if (nutrients.potassium !== null && FDA_DAILY_VALUES.potassium) {
    dv.potassium = Math.round((nutrients.potassium / FDA_DAILY_VALUES.potassium) * 100)
  }

  return dv
}

// ============================================================================
// ALLERGEN DETECTION
// ============================================================================

/**
 * Detect allergens from ingredient name
 */
export function detectAllergens(ingredientName: string): FDAAllergen[] {
  const detected: FDAAllergen[] = []
  const lowerName = ingredientName.toLowerCase()

  for (const allergen of FDA_MAJOR_ALLERGENS) {
    const keywords = ALLERGEN_KEYWORDS[allergen]
    if (keywords.some(keyword => lowerName.includes(keyword))) {
      detected.push(allergen)
    }
  }

  return detected
}

/**
 * Compile allergen statement from all ingredients
 */
export function compileAllergenStatement(
  ingredients: RecipeIngredient[]
): ComputedNutrition['allergenStatement'] {
  const allAllergens = new Set<string>()

  for (const ingredient of ingredients) {
    // Use user override if set, otherwise use detected
    const allergens = ingredient.userAllergenOverride ?? ingredient.allergensDetected
    allergens.forEach(a => allAllergens.add(a))
  }

  return {
    contains: Array.from(allAllergens).sort(),
    mayContain: [], // Users can add these manually
    note: allAllergens.size > 0
      ? 'Allergen detection is automated and may be incomplete. Please verify all allergens.'
      : null,
  }
}

// ============================================================================
// MISSING DATA DETECTION
// ============================================================================

/**
 * Identify which required nutrients are missing
 */
export function findMissingFields(
  ingredients: RecipeIngredient[]
): string[] {
  const requiredFields: Array<keyof NutrientsPer100g> = [
    'calories',
    'totalFat',
    'saturatedFat',
    'sodium',
    'totalCarbohydrate',
    'protein',
  ]

  const missingIngredients: string[] = []

  for (const ingredient of ingredients) {
    const missing: string[] = []
    for (const field of requiredFields) {
      if (ingredient.nutrientSnapshotPer100g[field] === null) {
        missing.push(field)
      }
    }
    if (missing.length > 0) {
      missingIngredients.push(`${ingredient.selectedFoodName}: missing ${missing.join(', ')}`)
    }
  }

  return missingIngredients
}

// ============================================================================
// MAIN COMPUTATION FUNCTION
// ============================================================================

export interface ComputeRecipeOptions {
  ingredients: RecipeIngredient[]
  servingsPerBatch: number
  applyRounding?: boolean
}

/**
 * Compute full nutrition data for a recipe
 */
export function computeRecipeNutrition(
  options: ComputeRecipeOptions
): ComputedNutrition {
  const { ingredients, servingsPerBatch, applyRounding = true } = options

  // Calculate batch totals
  const rawTotals = sumNutrients(
    ingredients.map(ing => ({
      nutrientsPer100g: ing.nutrientSnapshotPer100g,
      amountGrams: ing.amountGrams,
    }))
  )

  // Calculate per serving
  const rawPerServing = divideNutrients(rawTotals, servingsPerBatch)

  // Apply rounding if requested
  const totalsPerBatch = applyRounding ? roundAllNutrients(rawTotals) : rawTotals
  const perServing = applyRounding ? roundAllNutrients(rawPerServing) : rawPerServing

  // Build rounding notes
  const roundingNotes: string[] = []
  if (applyRounding) {
    roundingNotes.push(`FDA rounding rules applied (DV version: ${FDA_DAILY_VALUES_VERSION})`)
    
    // Check for values rounded to 0
    const keys = Object.keys(perServing) as Array<keyof NutrientTotals>
    for (const key of keys) {
      const raw = rawPerServing[key]
      const rounded = perServing[key]
      if (raw !== null && raw > 0 && rounded === 0) {
        roundingNotes.push(`${key}: ${raw.toFixed(2)} rounded to 0 per FDA rules`)
      }
    }
  }

  // Detect missing fields
  const missingFields = findMissingFields(ingredients)

  // Compile allergen statement
  const allergenStatement = compileAllergenStatement(ingredients)

  return {
    totalsPerBatch,
    perServing,
    roundingNotes,
    missingFields,
    allergenStatement,
  }
}

// ============================================================================
// SCALE RECIPE FUNCTION
// ============================================================================

/**
 * Scale a recipe from one serving count to another
 */
export function scaleRecipe(
  ingredients: RecipeIngredient[],
  currentServings: number,
  newServings: number
): RecipeIngredient[] {
  const scaleFactor = newServings / currentServings

  return ingredients.map(ingredient => ({
    ...ingredient,
    amountGrams: ingredient.amountGrams * scaleFactor,
    unitOriginal: ingredient.unitOriginal
      ? {
          ...ingredient.unitOriginal,
          value: ingredient.unitOriginal.value * scaleFactor,
        }
      : undefined,
  }))
}
