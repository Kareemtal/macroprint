'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { NutritionLabel } from '@/components/label/nutrition-label'
import {
  Plus,
  Trash2,
  Search,
  Loader2,
  AlertCircle,
  Info
} from 'lucide-react'
import { generateId } from '@/lib/utils'
import type { LabelData, NutrientsPer100g } from '@/lib/types'
import { computeRecipeNutrition, detectAllergens } from '@/lib/nutrition/calculator'

interface IngredientLine {
  id: string
  name: string
  grams: number
  nutrients: NutrientsPer100g | null
  isSearching: boolean
  searchResults: Array<{ id: string; name: string; brandName?: string }>
  showResults: boolean
  allergens: string[]
}

const EMPTY_NUTRIENTS: NutrientsPer100g = {
  calories: 0,
  totalFat: 0,
  saturatedFat: 0,
  transFat: 0,
  cholesterol: 0,
  sodium: 0,
  totalCarbohydrate: 0,
  dietaryFiber: 0,
  totalSugars: 0,
  addedSugars: null,
  protein: 0,
  vitaminD: 0,
  calcium: 0,
  iron: 0,
  potassium: 0,
}

export function MacroCalculator() {
  const [ingredients, setIngredients] = useState<IngredientLine[]>([
    {
      id: generateId(),
      name: '',
      grams: 100,
      nutrients: null,
      isSearching: false,
      searchResults: [],
      showResults: false,
      allergens: [],
    },
  ])
  const [servings, setServings] = useState(1)
  const [servingSize, setServingSize] = useState('1 serving')

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        id: generateId(),
        name: '',
        grams: 100,
        nutrients: null,
        isSearching: false,
        searchResults: [],
        showResults: false,
        allergens: [],
      },
    ])
  }

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ing) => ing.id !== id))
    }
  }

  const updateIngredient = useCallback((id: string, updates: Partial<IngredientLine>) => {
    setIngredients((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, ...updates } : ing))
    )
  }, [])

  const searchIngredients = useCallback(async (id: string, query: string) => {
    if (query.length < 2) {
      setIngredients((prev) =>
        prev.map((ing) =>
          ing.id === id ? { ...ing, searchResults: [], showResults: false } : ing
        )
      )
      return
    }

    setIngredients((prev) =>
      prev.map((ing) =>
        ing.id === id ? { ...ing, isSearching: true } : ing
      )
    )

    try {
      const response = await fetch(`/api/foods/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (data.success && data.data) {
        setIngredients((prev) =>
          prev.map((ing) =>
            ing.id === id
              ? {
                ...ing,
                searchResults: data.data.slice(0, 10),
                showResults: true,
                isSearching: false,
              }
              : ing
          )
        )
      } else {
        setIngredients((prev) =>
          prev.map((ing) =>
            ing.id === id
              ? { ...ing, searchResults: [], showResults: false, isSearching: false }
              : ing
          )
        )
      }
    } catch (error) {
      console.error('Search error:', error)
      setIngredients((prev) =>
        prev.map((ing) =>
          ing.id === id
            ? { ...ing, searchResults: [], showResults: false, isSearching: false }
            : ing
        )
      )
    }
  }, [])

  const selectFood = async (ingredientId: string, foodId: string, foodName: string) => {
    updateIngredient(ingredientId, {
      name: foodName,
      showResults: false,
      isSearching: true,
    })

    try {
      const response = await fetch(`/api/foods/${foodId}`)
      const data = await response.json()

      if (data.success && data.data) {
        const allergens = detectAllergens(foodName)
        updateIngredient(ingredientId, {
          nutrients: data.data.nutrientsPer100g,
          allergens,
          isSearching: false,
        })
      } else {
        updateIngredient(ingredientId, { isSearching: false })
      }
    } catch (error) {
      console.error('Food detail error:', error)
      updateIngredient(ingredientId, { isSearching: false })
    }
  }

  // Calculate totals
  const validIngredients = ingredients.filter((ing) => ing.nutrients !== null)

  const computed = validIngredients.length > 0
    ? computeRecipeNutrition({
      ingredients: validIngredients.map((ing) => ({
        lineId: ing.id,
        queryText: ing.name,
        provider: 'USDA' as const,
        providerFoodId: '',
        selectedFoodName: ing.name,
        matchConfidence: 1,
        amountGrams: ing.grams,
        nutrientSnapshotPer100g: ing.nutrients || EMPTY_NUTRIENTS,
        allergensDetected: ing.allergens,
        userAllergenOverride: null,
      })),
      servingsPerBatch: servings,
    })
    : null

  const labelData: LabelData | null = computed
    ? {
      servingsPerContainer: servings,
      servingSize,
      calories: computed.perServing.calories ?? 0,
      totalFat: computed.perServing.totalFat ?? 0,
      saturatedFat: computed.perServing.saturatedFat ?? 0,
      transFat: computed.perServing.transFat ?? 0,
      cholesterol: computed.perServing.cholesterol ?? 0,
      sodium: computed.perServing.sodium ?? 0,
      totalCarbohydrate: computed.perServing.totalCarbohydrate ?? 0,
      dietaryFiber: computed.perServing.dietaryFiber ?? 0,
      totalSugars: computed.perServing.totalSugars ?? 0,
      addedSugars: computed.perServing.addedSugars,
      protein: computed.perServing.protein ?? 0,
      vitaminD: computed.perServing.vitaminD,
      calcium: computed.perServing.calcium,
      iron: computed.perServing.iron,
      potassium: computed.perServing.potassium,
      allergenStatement:
        computed.allergenStatement.contains.length > 0
          ? `Contains: ${computed.allergenStatement.contains.join(', ')}`
          : undefined,
    }
    : null

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Input Section */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Ingredients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="relative space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Search ingredient (e.g., chicken breast)"
                      value={ingredient.name}
                      onChange={(e) => {
                        updateIngredient(ingredient.id, { name: e.target.value })
                        searchIngredients(ingredient.id, e.target.value)
                      }}
                      onFocus={() => {
                        if (ingredient.searchResults.length > 0) {
                          updateIngredient(ingredient.id, { showResults: true })
                        }
                      }}
                    />
                    {ingredient.isSearching && (
                      <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                    {ingredient.showResults && ingredient.searchResults.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-lg">
                        {ingredient.searchResults.map((result) => (
                          <button
                            key={result.id}
                            type="button"
                            className="w-full px-3 py-2 text-left text-sm hover:bg-muted"
                            onClick={() =>
                              selectFood(ingredient.id, result.id, result.name)
                            }
                          >
                            <div className="font-medium">{result.name}</div>
                            {result.brandName && (
                              <div className="text-xs text-muted-foreground">
                                {result.brandName}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      placeholder="Grams"
                      value={ingredient.grams}
                      onChange={(e) =>
                        updateIngredient(ingredient.id, {
                          grams: parseFloat(e.target.value) || 0,
                        })
                      }
                      min={0}
                    />
                  </div>
                  {ingredients.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeIngredient(ingredient.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {ingredient.nutrients && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-primary">
                      ✓ Selected
                    </span>
                    <span>
                      {Math.round((ingredient.nutrients.calories ?? 0) * (ingredient.grams / 100))} cal
                    </span>
                    <span>
                      {((ingredient.nutrients.protein ?? 0) * (ingredient.grams / 100)).toFixed(1)}g protein
                    </span>
                  </div>
                )}
                {ingredient.allergens.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <AlertCircle className="h-3 w-3" />
                    Contains: {ingredient.allergens.join(', ')}
                  </div>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addIngredient}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Ingredient
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Serving Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="servings">Servings per batch</Label>
                <Input
                  id="servings"
                  type="number"
                  value={servings}
                  onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                  min={1}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servingSize">Serving size</Label>
                <Input
                  id="servingSize"
                  value={servingSize}
                  onChange={(e) => setServingSize(e.target.value)}
                  placeholder="e.g., 1 container (350g)"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        {computed && (
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Summary (Per Serving)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(computed.perServing.calories ?? 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {(computed.perServing.protein ?? 0).toFixed(1)}g
                  </div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {(computed.perServing.totalCarbohydrate ?? 0).toFixed(1)}g
                  </div>
                  <div className="text-xs text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {(computed.perServing.totalFat ?? 0).toFixed(1)}g
                  </div>
                  <div className="text-xs text-muted-foreground">Fat</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Label Preview Section */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Label Preview
              <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-normal text-amber-700">
                Sample
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            {labelData ? (
              <NutritionLabel
                data={labelData}
                preset="3x4"
                showWatermark={true}
                className="max-w-[250px]"
              />
            ) : (
              <div className="flex h-64 w-48 items-center justify-center rounded-lg border-2 border-dashed text-center text-sm text-muted-foreground">
                <div>
                  <Info className="mx-auto mb-2 h-8 w-8" />
                  <p>Add ingredients to see</p>
                  <p>your nutrition label</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
            <div className="text-sm text-amber-800">
              <p className="font-medium">This is a preview</p>
              <p className="mt-1">
                Sign up free to remove the watermark, save recipes, and export
                print-ready PDF labels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
