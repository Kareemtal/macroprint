'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/auth-context'
import { getRecipe, updateRecipe } from '@/lib/firebase/recipes'
import { toast } from '@/components/ui/use-toast'
import { RecipeForm, RecipeFormData } from '../../_components/recipe-form'
import { Loader2 } from 'lucide-react'
import type { Recipe } from '@/lib/types'

export default function EditRecipePage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { user } = useAuth()
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [loading, setLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        async function fetchRecipe() {
            if (!user) return
            try {
                const data = await getRecipe(params.id)
                if (data) {
                    setRecipe(data)
                } else {
                    toast({
                        title: 'Error',
                        description: 'Recipe not found.',
                        variant: 'destructive',
                    })
                    router.push('/dashboard/recipes')
                }
            } catch (error) {
                console.error('Error fetching recipe:', error)
                toast({
                    title: 'Error',
                    description: 'Failed to load recipe.',
                    variant: 'destructive',
                })
            } finally {
                setLoading(false)
            }
        }
        fetchRecipe()
    }, [params.id, user, router])

    const handleSave = async (data: RecipeFormData) => {
        if (!user || !recipe) return

        setIsSaving(true)

        try {
            await updateRecipe(recipe.id, {
                name: data.name,
                servingsPerBatch: data.servingsPerBatch,
                servingSizeText: data.servingSizeText,
                servingSizeGrams: data.servingSizeGrams,
                ingredients: data.ingredients,
            })

            toast({
                title: 'Recipe updated',
                description: 'Your changes have been saved.',
            })

            router.push(`/dashboard/recipes/${recipe.id}`)
        } catch (error) {
            console.error('Update error:', error)
            toast({
                title: 'Error',
                description: 'Failed to update recipe. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setIsSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (!recipe) return null

    return (
        <RecipeForm
            initialData={recipe}
            onSubmit={handleSave}
            isSubmitting={isSaving}
        />
    )
}
