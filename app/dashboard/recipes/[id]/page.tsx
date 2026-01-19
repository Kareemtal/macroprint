'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/context/auth-context'
import { getRecipe } from '@/lib/firebase/recipes'
import type { Recipe } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
    ArrowLeft,
    Loader2,
    Edit,
    Printer,
    TrendingUp,
    Scale
} from 'lucide-react'
import Link from 'next/link'

export default function RecipePage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const { user } = useAuth()
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRecipe() {
            if (!user) return
            try {
                const data = await getRecipe(params.id)
                if (data) {
                    setRecipe(data)
                } else {
                    router.push('/dashboard/recipes')
                }
            } catch (error) {
                console.error('Error fetching recipe:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchRecipe()
    }, [params.id, user, router])

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (!recipe) return null

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/recipes')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold tracking-tight">{recipe.name}</h1>
                    <p className="text-muted-foreground">
                        {recipe.servingsPerBatch} servings • {recipe.servingSizeText}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href={`/dashboard/recipes/${recipe.id}/label`}>
                        <Button variant="outline">
                            <Printer className="mr-2 h-4 w-4" />
                            Label
                        </Button>
                    </Link>
                    <Link href={`/dashboard/recipes/${recipe.id}/edit`}>
                        <Button>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Recipe
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Nutrition Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Nutrition Facts
                        </CardTitle>
                        <CardDescription>Per Serving</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recipe.computed ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="rounded-lg bg-primary/10 p-4">
                                        <div className="text-3xl font-bold text-primary">
                                            {Math.round(recipe.computed.perServing.calories ?? 0)}
                                        </div>
                                        <div className="text-xs font-medium text-muted-foreground">Calories</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Protein</span>
                                            <div className="text-right">
                                                <span className="font-medium">{recipe.computed.perServing.protein?.toFixed(1)}g</span>
                                                <span className="ml-2 text-xs text-muted-foreground">
                                                    {Math.round(((recipe.computed.perServing.protein ?? 0) / 50) * 100)}% DV
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Carbs</span>
                                            <div className="text-right">
                                                <span className="font-medium">{recipe.computed.perServing.totalCarbohydrate?.toFixed(1)}g</span>
                                                <span className="ml-2 text-xs text-muted-foreground">
                                                    {Math.round(((recipe.computed.perServing.totalCarbohydrate ?? 0) / 275) * 100)}% DV
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-muted-foreground">Fat</span>
                                            <div className="text-right">
                                                <span className="font-medium">{recipe.computed.perServing.totalFat?.toFixed(1)}g</span>
                                                <span className="ml-2 text-xs text-muted-foreground">
                                                    {Math.round(((recipe.computed.perServing.totalFat ?? 0) / 78) * 100)}% DV
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground text-center">
                                    * The % Daily Value (DV) tells you how much a nutrient in a serving contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
                                </p>
                            </div>
                        ) : (
                            <div className="py-4 text-center text-muted-foreground">
                                No nutrition data available
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Ingredients */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Scale className="h-5 w-5" />
                            Ingredients
                        </CardTitle>
                        <CardDescription>{recipe.ingredients.length} ingredients</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {recipe.ingredients.map((ing) => (
                                <div key={ing.lineId} className="flex justify-between rounded-md border p-2 text-sm">
                                    <span>{ing.queryText}</span>
                                    <span className="text-muted-foreground">{ing.amountGrams}g</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
