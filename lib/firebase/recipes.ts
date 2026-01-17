import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from './config'
import type { Recipe, RecipeIngredient, LabelSettings, ComputedNutrition } from '@/lib/types'
import { computeRecipeNutrition } from '@/lib/nutrition/calculator'

const RECIPES_COLLECTION = 'recipes'

/**
 * Convert Firestore data to Recipe type
 */
function fromFirestore(id: string, data: Record<string, unknown>): Recipe {
  return {
    id,
    uid: data.uid as string,
    name: data.name as string,
    servingsPerBatch: data.servingsPerBatch as number,
    servingSizeText: data.servingSizeText as string,
    servingSizeGrams: data.servingSizeGrams as number | null,
    createdAt: (data.createdAt as Timestamp)?.toDate?.() || new Date(),
    updatedAt: (data.updatedAt as Timestamp)?.toDate?.() || new Date(),
    ingredients: data.ingredients as RecipeIngredient[],
    computed: data.computed as ComputedNutrition | null,
    labelSettings: data.labelSettings as LabelSettings,
    exports: (data.exports as Recipe['exports']) || [],
  }
}

/**
 * Get all recipes for a user
 */
export async function getUserRecipes(uid: string): Promise<Recipe[]> {
  const recipesRef = collection(db, RECIPES_COLLECTION)
  const q = query(
    recipesRef,
    where('uid', '==', uid),
    orderBy('updatedAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => fromFirestore(doc.id, doc.data()))
}

/**
 * Get a single recipe by ID
 */
export async function getRecipe(recipeId: string): Promise<Recipe | null> {
  const recipeRef = doc(db, RECIPES_COLLECTION, recipeId)
  const snapshot = await getDoc(recipeRef)

  if (!snapshot.exists()) {
    return null
  }

  return fromFirestore(snapshot.id, snapshot.data())
}

/**
 * Create a new recipe
 */
export async function createRecipe(
  uid: string,
  data: {
    name: string
    servingsPerBatch: number
    servingSizeText: string
    servingSizeGrams?: number | null
    ingredients?: RecipeIngredient[]
  }
): Promise<Recipe> {
  const ingredients = data.ingredients || []
  
  // Compute nutrition if we have ingredients
  const computed = ingredients.length > 0
    ? computeRecipeNutrition({
        ingredients,
        servingsPerBatch: data.servingsPerBatch,
      })
    : null

  const defaultLabelSettings: LabelSettings = {
    formatPreset: '3x4',
    includeMicros: true,
    showCaloriesFromFat: false,
    brandingEnabled: true,
    customFooterText: null,
  }

  const recipeData = {
    uid,
    name: data.name,
    servingsPerBatch: data.servingsPerBatch,
    servingSizeText: data.servingSizeText,
    servingSizeGrams: data.servingSizeGrams || null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ingredients,
    computed,
    labelSettings: defaultLabelSettings,
    exports: [],
  }

  const recipesRef = collection(db, RECIPES_COLLECTION)
  const docRef = await addDoc(recipesRef, recipeData)

  return {
    id: docRef.id,
    ...recipeData,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Recipe
}

/**
 * Update a recipe
 */
export async function updateRecipe(
  recipeId: string,
  data: Partial<{
    name: string
    servingsPerBatch: number
    servingSizeText: string
    servingSizeGrams: number | null
    ingredients: RecipeIngredient[]
    labelSettings: LabelSettings
  }>
): Promise<void> {
  const recipeRef = doc(db, RECIPES_COLLECTION, recipeId)

  // Get current recipe to compute nutrition if ingredients changed
  const current = await getRecipe(recipeId)
  if (!current) {
    throw new Error('Recipe not found')
  }

  const ingredients = data.ingredients || current.ingredients
  const servingsPerBatch = data.servingsPerBatch || current.servingsPerBatch

  // Recompute nutrition
  const computed = ingredients.length > 0
    ? computeRecipeNutrition({ ingredients, servingsPerBatch })
    : null

  await updateDoc(recipeRef, {
    ...data,
    computed,
    updatedAt: serverTimestamp(),
  })
}

/**
 * Delete a recipe
 */
export async function deleteRecipe(recipeId: string): Promise<void> {
  const recipeRef = doc(db, RECIPES_COLLECTION, recipeId)
  await deleteDoc(recipeRef)
}

/**
 * Add an export record to a recipe
 */
export async function addRecipeExport(
  recipeId: string,
  exportData: Recipe['exports'][0]
): Promise<void> {
  const recipe = await getRecipe(recipeId)
  if (!recipe) {
    throw new Error('Recipe not found')
  }

  const recipeRef = doc(db, RECIPES_COLLECTION, recipeId)
  await updateDoc(recipeRef, {
    exports: [...recipe.exports, exportData],
    updatedAt: serverTimestamp(),
  })
}

/**
 * Count user's recipes
 */
export async function countUserRecipes(uid: string): Promise<number> {
  const recipesRef = collection(db, RECIPES_COLLECTION)
  const q = query(
    recipesRef,
    where('uid', '==', uid),
    limit(1000) // Practical limit
  )

  const snapshot = await getDocs(q)
  return snapshot.size
}
