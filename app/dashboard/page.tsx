'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/context/auth-context'
import { getUserRecipes, deleteRecipe } from '@/lib/firebase/recipes'
import type { Recipe } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import {
  Plus,
  ChefHat,
  MoreVertical,
  Pencil,
  Trash2,
  FileText,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from '@/components/ui/use-toast'

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteRecipeId, setDeleteRecipeId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    async function loadRecipes() {
      if (!user) return
      
      try {
        const userRecipes = await getUserRecipes(user.uid)
        setRecipes(userRecipes)
      } catch (error) {
        console.error('Failed to load recipes:', error)
        toast({
          title: 'Error',
          description: 'Failed to load recipes. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadRecipes()
  }, [user])

  const handleDelete = async () => {
    if (!deleteRecipeId) return

    setIsDeleting(true)
    try {
      await deleteRecipe(deleteRecipeId)
      setRecipes(recipes.filter((r) => r.id !== deleteRecipeId))
      toast({
        title: 'Recipe deleted',
        description: 'The recipe has been permanently deleted.',
      })
    } catch (error) {
      console.error('Failed to delete recipe:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete recipe. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsDeleting(false)
      setDeleteRecipeId(null)
    }
  }

  const recipeLimitReached = profile?.plan === 'FREE' && recipes.length >= 3

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recipes</h1>
          <p className="text-muted-foreground">
            Create and manage your nutrition labels
          </p>
        </div>
        <Link href="/dashboard/recipes/new">
          <Button disabled={recipeLimitReached}>
            <Plus className="mr-2 h-4 w-4" />
            New Recipe
          </Button>
        </Link>
      </div>

      {/* Free tier limit warning */}
      {recipeLimitReached && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex items-center gap-4 py-4">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <div className="flex-1">
              <p className="font-medium text-amber-800">
                You've reached the free plan limit
              </p>
              <p className="text-sm text-amber-700">
                Upgrade to create unlimited recipes and remove watermarks.
              </p>
            </div>
            <Link href="/dashboard/billing">
              <Button variant="default" size="sm">
                Upgrade Now
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Recipes list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : recipes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ChefHat className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No recipes yet</h3>
            <p className="mb-4 text-center text-muted-foreground">
              Create your first recipe to generate a nutrition label.
            </p>
            <Link href="/dashboard/recipes/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Recipe
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="group relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    <CardDescription>
                      {recipe.servingsPerBatch} servings • {recipe.servingSizeText}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/recipes/${recipe.id}`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/recipes/${recipe.id}/label`}>
                          <FileText className="mr-2 h-4 w-4" />
                          Generate Label
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setDeleteRecipeId(recipe.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                {recipe.computed ? (
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <div className="text-lg font-semibold text-primary">
                        {Math.round(recipe.computed.perServing.calories ?? 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">cal</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {(recipe.computed.perServing.protein ?? 0).toFixed(0)}g
                      </div>
                      <div className="text-xs text-muted-foreground">protein</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {(recipe.computed.perServing.totalCarbohydrate ?? 0).toFixed(0)}g
                      </div>
                      <div className="text-xs text-muted-foreground">carbs</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {(recipe.computed.perServing.totalFat ?? 0).toFixed(0)}g
                      </div>
                      <div className="text-xs text-muted-foreground">fat</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Add ingredients to calculate nutrition
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{recipe.ingredients.length} ingredients</span>
                  <span>Updated {formatDate(recipe.updatedAt)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteRecipeId} onOpenChange={() => setDeleteRecipeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Recipe</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this recipe? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
