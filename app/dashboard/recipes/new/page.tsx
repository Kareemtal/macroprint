'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/context/auth-context'
import { createRecipe } from '@/lib/firebase/recipes'
import { toast } from '@/components/ui/use-toast'
import { generateId } from '@/lib/utils'
import { computeRecipeNutrition, detectAllergens } from '@/lib/nutrition/calculator'
import type { RecipeIngredient, NutrientsPer100g } from '@/lib/types'
import {
  ArrowLeft,
  Plus,
  Trash2,
  Search,
  Loader2,
  Save,
  AlertCircle,
} from 'lucide-react'

interface IngredientLine {
  id: string
  name: string
  grams: number
  nutrients: NutrientsPer100g | null
  isSearching: boolean
  searchResults: Array<{ id: string; name: string; brandName?: string }>
  showResults: boolean
  allergens: string[]
  providerFoodId: string
}

export default function NewRecipePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)

  const [recipeName, setRecipeName] = useState('')
  const [servingsPerBatch, setServingsPerBatch] = useState(4)
  const [servingSizeText, setServingSizeText] = useState('1 serving')
  const [servingSizeGrams, setServingSizeGrams] = useState<number | null>(null)

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
      providerFoodId: '',
    },
  ])

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
        providerFoodId: '',
      },
    ])
  }

  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((ing) => ing.id !== id))
    }
  }

  const updateIngredient = (id: string, updates: Partial<IngredientLine>) => {
    setIngredients(
      ingredients.map((ing) => (ing.id === id ? { ...ing, ...updates } : ing))
    )
  }

  const searchIngredients = useCallback(async (id: string, query: string) => {
    if (query.length < 2) {
      updateIngredient(id, { searchResults: [], showResults: false })
      return
    }

    updateIngredient(id, { isSearching: true })

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
      providerFoodId: foodId,
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

  const handleSave = async () => {
    if (!user) return

    if (!recipeName.trim()) {
      toast({
        title: 'Recipe name required',
        description: 'Please enter a name for your recipe.',
        variant: 'destructive',
      })
      return
    }

    const validIngredients = ingredients.filter(
      (ing) => ing.nutrients !== null && ing.name.trim()
    )

    if (validIngredients.length === 0) {
      toast({
        title: 'No ingredients',
        description: 'Please add at least one ingredient with nutrition data.',
        variant: 'destructive',
      })
      return
    }

    setIsSaving(true)

    try {
      const recipeIngredients: RecipeIngredient[] = validIngredients.map((ing) => ({
        lineId: ing.id,
        queryText: ing.name,
        provider: 'USDA' as const,
        providerFoodId: ing.providerFoodId,
        selectedFoodName: ing.name,
        matchConfidence: 0.95,
        amountGrams: ing.grams,
        nutrientSnapshotPer100g: ing.nutrients!,
        allergensDetected: ing.allergens,
        userAllergenOverride: null,
      }))

      const recipe = await createRecipe(user.uid, {
        name: recipeName,
        servingsPerBatch,
        servingSizeText,
        servingSizeGrams,
        ingredients: recipeIngredients,
      })

      toast({
        title: 'Recipe created',
        description: 'Your recipe has been saved successfully.',
      })

      router.push(`/dashboard/recipes/${recipe.id}`)
    } catch (error) {
      console.error('Save error:', error)
      toast({
        title: 'Error',
        description: 'Failed to save recipe. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Calculate preview nutrition
  const validIngredients = ingredients.filter((ing) => ing.nutrients !== null)
  const computed =
    validIngredients.length > 0
      ? computeRecipeNutrition({
        ingredients: validIngredients.map((ing) => ({
          lineId: ing.id,
          queryText: ing.name,
          provider: 'USDA' as const,
          providerFoodId: ing.providerFoodId,
          selectedFoodName: ing.name,
          matchConfidence: 1,
          amountGrams: ing.grams,
          nutrientSnapshotPer100g: ing.nutrients!,
          allergensDetected: ing.allergens,
          userAllergenOverride: null,
        })),
        servingsPerBatch,
      })
      : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">New Recipe</h1>
          <p className="text-muted-foreground">
            Add ingredients and calculate nutrition facts
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Recipe
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recipe Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recipe Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Recipe Name</Label>
                <Input
                  id="name"
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  placeholder="e.g., Grilled Chicken & Rice Bowl"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings per Batch</Label>
                  <Input
                    id="servings"
                    type="number"
                    value={servingsPerBatch}
                    onChange={(e) =>
                      setServingsPerBatch(parseInt(e.target.value) || 1)
                    }
                    min={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servingSize">Serving Size Text</Label>
                  <Input
                    id="servingSize"
                    value={servingSizeText}
                    onChange={(e) => setServingSizeText(e.target.value)}
                    placeholder="e.g., 1 container (350g)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servingGrams">Serving Size (grams)</Label>
                  <Input
                    id="servingGrams"
                    type="number"
                    value={servingSizeGrams || ''}
                    onChange={(e) =>
                      setServingSizeGrams(
                        e.target.value ? parseFloat(e.target.value) : null
                      )
                    }
                    placeholder="Optional"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Ingredients
              </CardTitle>
              <CardDescription>
                Search for ingredients and enter amounts in grams
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ingredients.map((ingredient) => (
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
                        onBlur={() => {
                          // Delay hiding results to allow click events to fire
                          setTimeout(() => {
                            updateIngredient(ingredient.id, { showResults: false })
                          }, 200)
                        }}
                      />
                      {ingredient.isSearching && (
                        <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                      )}
                      {ingredient.showResults &&
                        ingredient.searchResults.length > 0 && (
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
                        {Math.round(
                          (ingredient.nutrients.calories ?? 0) *
                          (ingredient.grams / 100)
                        )}{' '}
                        cal
                      </span>
                      <span>
                        {(
                          (ingredient.nutrients.protein ?? 0) *
                          (ingredient.grams / 100)
                        ).toFixed(1)}
                        g protein
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
        </div>

        {/* Nutrition Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Summary</CardTitle>
              <CardDescription>Per serving values</CardDescription>
            </CardHeader>
            <CardContent>
              {computed ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <div className="text-2xl font-bold text-primary">
                        {Math.round(computed.perServing.calories ?? 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Calories
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-2xl font-bold">
                        {(computed.perServing.protein ?? 0).toFixed(1)}g
                      </div>
                      <div className="text-xs text-muted-foreground">Protein</div>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-2xl font-bold">
                        {(computed.perServing.totalCarbohydrate ?? 0).toFixed(1)}g
                      </div>
                      <div className="text-xs text-muted-foreground">Carbs</div>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <div className="text-2xl font-bold">
                        {(computed.perServing.totalFat ?? 0).toFixed(1)}g
                      </div>
                      <div className="text-xs text-muted-foreground">Fat</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sodium</span>
                      <span>
                        {Math.round(computed.perServing.sodium ?? 0)}mg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fiber</span>
                      <span>
                        {(computed.perServing.dietaryFiber ?? 0).toFixed(1)}g
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sugars</span>
                      <span>
                        {(computed.perServing.totalSugars ?? 0).toFixed(1)}g
                      </span>
                    </div>
                  </div>

                  {computed.allergenStatement.contains.length > 0 && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-amber-800">
                        <AlertCircle className="h-4 w-4" />
                        Allergens Detected
                      </div>
                      <p className="mt-1 text-xs text-amber-700">
                        Contains: {computed.allergenStatement.contains.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  Add ingredients to see nutrition summary
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
