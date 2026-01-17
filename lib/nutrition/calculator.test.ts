import { describe, it, expect } from 'vitest'
import {
  createEmptyNutrients,
  calculateIngredientNutrients,
  sumNutrients,
  divideNutrients,
  roundNutrient,
  roundAllNutrients,
  calculatePercentDV,
  detectAllergens,
  computeRecipeNutrition,
  scaleRecipe,
} from './calculator'
import type { RecipeIngredient, NutrientsPer100g } from '@/lib/types'

describe('createEmptyNutrients', () => {
  it('should create an object with all nutrient fields set to 0', () => {
    const empty = createEmptyNutrients()
    expect(empty.calories).toBe(0)
    expect(empty.totalFat).toBe(0)
    expect(empty.protein).toBe(0)
    expect(empty.sodium).toBe(0)
  })
})

describe('calculateIngredientNutrients', () => {
  const chickenPer100g: NutrientsPer100g = {
    calories: 165,
    totalFat: 3.6,
    saturatedFat: 1,
    transFat: 0,
    cholesterol: 85,
    sodium: 74,
    totalCarbohydrate: 0,
    dietaryFiber: 0,
    totalSugars: 0,
    addedSugars: null,
    protein: 31,
    vitaminD: 0.1,
    calcium: 11,
    iron: 1,
    potassium: 256,
  }

  it('should calculate nutrients for 100g correctly', () => {
    const result = calculateIngredientNutrients(chickenPer100g, 100)
    expect(result.calories).toBe(165)
    expect(result.protein).toBe(31)
  })

  it('should calculate nutrients for 200g correctly', () => {
    const result = calculateIngredientNutrients(chickenPer100g, 200)
    expect(result.calories).toBe(330)
    expect(result.protein).toBe(62)
  })

  it('should calculate nutrients for 50g correctly', () => {
    const result = calculateIngredientNutrients(chickenPer100g, 50)
    expect(result.calories).toBe(82.5)
    expect(result.protein).toBe(15.5)
  })

  it('should handle null values', () => {
    const result = calculateIngredientNutrients(chickenPer100g, 100)
    expect(result.addedSugars).toBeNull()
  })
})

describe('sumNutrients', () => {
  it('should sum nutrients from multiple ingredients', () => {
    const ingredients = [
      {
        nutrientsPer100g: { calories: 100, protein: 10, totalFat: 5 } as NutrientsPer100g,
        amountGrams: 100,
      },
      {
        nutrientsPer100g: { calories: 200, protein: 20, totalFat: 10 } as NutrientsPer100g,
        amountGrams: 100,
      },
    ]
    const result = sumNutrients(ingredients)
    expect(result.calories).toBe(300)
    expect(result.protein).toBe(30)
    expect(result.totalFat).toBe(15)
  })
})

describe('divideNutrients', () => {
  it('should divide nutrients by serving count', () => {
    const totals = createEmptyNutrients()
    totals.calories = 1000
    totals.protein = 100
    totals.sodium = 2000

    const perServing = divideNutrients(totals, 4)
    expect(perServing.calories).toBe(250)
    expect(perServing.protein).toBe(25)
    expect(perServing.sodium).toBe(500)
  })

  it('should throw error for zero servings', () => {
    const totals = createEmptyNutrients()
    expect(() => divideNutrients(totals, 0)).toThrow()
  })
})

describe('roundNutrient', () => {
  describe('calories rounding', () => {
    it('should round calories < 5 to 0', () => {
      expect(roundNutrient('calories', 4)).toBe(0)
    })

    it('should round calories 5-50 to nearest 5', () => {
      expect(roundNutrient('calories', 23)).toBe(25)
      expect(roundNutrient('calories', 21)).toBe(20)
    })

    it('should round calories > 50 to nearest 10', () => {
      expect(roundNutrient('calories', 156)).toBe(160)
      expect(roundNutrient('calories', 152)).toBe(150)
    })
  })

  describe('fat rounding', () => {
    it('should round fat < 0.5g to 0', () => {
      expect(roundNutrient('totalFat', 0.4)).toBe(0)
    })

    it('should round fat 0.5-5g to nearest 0.5', () => {
      expect(roundNutrient('totalFat', 2.3)).toBe(2.5)
      expect(roundNutrient('totalFat', 2.1)).toBe(2)
    })

    it('should round fat > 5g to nearest 1', () => {
      expect(roundNutrient('totalFat', 7.4)).toBe(7)
      expect(roundNutrient('totalFat', 7.6)).toBe(8)
    })
  })

  describe('sodium rounding', () => {
    it('should round sodium < 5mg to 0', () => {
      expect(roundNutrient('sodium', 3)).toBe(0)
    })

    it('should round sodium 5-140mg to nearest 5', () => {
      expect(roundNutrient('sodium', 73)).toBe(75)
    })

    it('should round sodium > 140mg to nearest 10', () => {
      expect(roundNutrient('sodium', 456)).toBe(460)
    })
  })
})

describe('calculatePercentDV', () => {
  it('should calculate percent daily values correctly', () => {
    const nutrients = createEmptyNutrients()
    nutrients.totalFat = 39 // 50% of 78g DV
    nutrients.sodium = 1150 // 50% of 2300mg DV
    nutrients.dietaryFiber = 14 // 50% of 28g DV

    const dv = calculatePercentDV(nutrients)
    expect(dv.totalFat).toBe(50)
    expect(dv.sodium).toBe(50)
    expect(dv.dietaryFiber).toBe(50)
  })
})

describe('detectAllergens', () => {
  it('should detect milk allergen', () => {
    expect(detectAllergens('Whole Milk')).toContain('Milk')
    expect(detectAllergens('Cheddar Cheese')).toContain('Milk')
    expect(detectAllergens('Heavy Cream')).toContain('Milk')
  })

  it('should detect wheat allergen', () => {
    expect(detectAllergens('All-purpose flour')).toContain('Wheat')
    expect(detectAllergens('Whole wheat bread')).toContain('Wheat')
  })

  it('should detect multiple allergens', () => {
    const allergens = detectAllergens('Peanut butter cookies with milk')
    expect(allergens).toContain('Peanuts')
    expect(allergens).toContain('Milk')
  })

  it('should return empty array for allergen-free ingredients', () => {
    expect(detectAllergens('Chicken breast')).toEqual([])
    expect(detectAllergens('Olive oil')).toEqual([])
  })
})

describe('computeRecipeNutrition', () => {
  const mockIngredients: RecipeIngredient[] = [
    {
      lineId: '1',
      queryText: 'chicken breast',
      provider: 'USDA',
      providerFoodId: '123',
      selectedFoodName: 'Chicken Breast, Grilled',
      matchConfidence: 0.95,
      amountGrams: 200,
      nutrientSnapshotPer100g: {
        calories: 165,
        totalFat: 3.6,
        saturatedFat: 1,
        transFat: 0,
        cholesterol: 85,
        sodium: 74,
        totalCarbohydrate: 0,
        dietaryFiber: 0,
        totalSugars: 0,
        addedSugars: null,
        protein: 31,
        vitaminD: 0.1,
        calcium: 11,
        iron: 1,
        potassium: 256,
      },
      allergensDetected: [],
      userAllergenOverride: null,
    },
    {
      lineId: '2',
      queryText: 'brown rice',
      provider: 'USDA',
      providerFoodId: '456',
      selectedFoodName: 'Brown Rice, Cooked',
      matchConfidence: 0.92,
      amountGrams: 150,
      nutrientSnapshotPer100g: {
        calories: 123,
        totalFat: 1,
        saturatedFat: 0.2,
        transFat: 0,
        cholesterol: 0,
        sodium: 4,
        totalCarbohydrate: 26,
        dietaryFiber: 1.6,
        totalSugars: 0.4,
        addedSugars: 0,
        protein: 2.7,
        vitaminD: 0,
        calcium: 3,
        iron: 0.6,
        potassium: 79,
      },
      allergensDetected: [],
      userAllergenOverride: null,
    },
  ]

  it('should compute total and per-serving nutrients', () => {
    const result = computeRecipeNutrition({
      ingredients: mockIngredients,
      servingsPerBatch: 2,
    })

    // Check that we have computed values
    expect(result.totalsPerBatch).toBeDefined()
    expect(result.perServing).toBeDefined()
    expect(result.perServing.calories).toBeDefined()
  })

  it('should include rounding notes when rounding is applied', () => {
    const result = computeRecipeNutrition({
      ingredients: mockIngredients,
      servingsPerBatch: 2,
      applyRounding: true,
    })

    expect(result.roundingNotes.length).toBeGreaterThan(0)
  })

  it('should compile allergen statement', () => {
    const ingredientsWithAllergens: RecipeIngredient[] = [
      ...mockIngredients,
      {
        lineId: '3',
        queryText: 'parmesan cheese',
        provider: 'USDA',
        providerFoodId: '789',
        selectedFoodName: 'Parmesan Cheese',
        matchConfidence: 0.9,
        amountGrams: 30,
        nutrientSnapshotPer100g: {
          calories: 431,
          totalFat: 29,
          saturatedFat: 17,
          transFat: 0,
          cholesterol: 88,
          sodium: 1529,
          totalCarbohydrate: 4,
          dietaryFiber: 0,
          totalSugars: 0.8,
          addedSugars: 0,
          protein: 38,
          vitaminD: 0.5,
          calcium: 1184,
          iron: 0.8,
          potassium: 92,
        },
        allergensDetected: ['Milk'],
        userAllergenOverride: null,
      },
    ]

    const result = computeRecipeNutrition({
      ingredients: ingredientsWithAllergens,
      servingsPerBatch: 2,
    })

    expect(result.allergenStatement.contains).toContain('Milk')
  })
})

describe('scaleRecipe', () => {
  const ingredients: RecipeIngredient[] = [
    {
      lineId: '1',
      queryText: 'chicken',
      provider: 'USDA',
      providerFoodId: '123',
      selectedFoodName: 'Chicken',
      matchConfidence: 0.95,
      amountGrams: 200,
      unitOriginal: { value: 2, unit: 'breast' },
      nutrientSnapshotPer100g: {} as NutrientsPer100g,
      allergensDetected: [],
      userAllergenOverride: null,
    },
  ]

  it('should scale ingredients correctly when doubling', () => {
    const scaled = scaleRecipe(ingredients, 4, 8)
    expect(scaled[0].amountGrams).toBe(400)
    expect(scaled[0].unitOriginal?.value).toBe(4)
  })

  it('should scale ingredients correctly when halving', () => {
    const scaled = scaleRecipe(ingredients, 4, 2)
    expect(scaled[0].amountGrams).toBe(100)
    expect(scaled[0].unitOriginal?.value).toBe(1)
  })
})
