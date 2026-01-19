'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/auth-context'
import { createRecipe } from '@/lib/firebase/recipes'
import { toast } from '@/components/ui/use-toast'
import { RecipeForm, RecipeFormData } from '../_components/recipe-form'

export default function NewRecipePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (data: RecipeFormData) => {
    if (!user) return

    setIsSaving(true)

    try {
      const recipe = await createRecipe(user.uid, {
        name: data.name,
        servingsPerBatch: data.servingsPerBatch,
        servingSizeText: data.servingSizeText,
        servingSizeGrams: data.servingSizeGrams,
        ingredients: data.ingredients,
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

  return <RecipeForm onSubmit={handleSave} isSubmitting={isSaving} />
}
