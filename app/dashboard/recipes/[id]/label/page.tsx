'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { NutritionLabel } from '@/components/label/nutrition-label'
import { useAuth } from '@/lib/context/auth-context'
import { getRecipe } from '@/lib/firebase/recipes'
import { createLabelData } from '@/lib/label/renderer'
import type { Recipe, LabelData, LabelFormatPreset } from '@/lib/types'
import { toast } from '@/components/ui/use-toast'
import {
  ArrowLeft,
  Download,
  FileText,
  Image,
  Loader2,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getAuth } from 'firebase/auth'
import { getApp } from '@/lib/firebase/config'

export default function LabelPage() {
  const params = useParams()
  const router = useRouter()
  const { user, profile } = useAuth()
  const recipeId = params.id as string

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [preset, setPreset] = useState<LabelFormatPreset>('3x4')
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false)

  useEffect(() => {
    async function loadRecipe() {
      if (!recipeId) return

      try {
        const data = await getRecipe(recipeId)
        if (data && data.uid === user?.uid) {
          setRecipe(data)
        } else {
          toast({
            title: 'Error',
            description: 'Recipe not found or access denied.',
            variant: 'destructive',
          })
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Error loading recipe:', error)
        toast({
          title: 'Error',
          description: 'Failed to load recipe.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      loadRecipe()
    }
  }, [recipeId, user, router])

  const handleExport = async (format: 'PDF' | 'PNG') => {
    if (!disclaimerAccepted) {
      toast({
        title: 'Disclaimer required',
        description: 'Please accept the disclaimer before exporting.',
        variant: 'destructive',
      })
      return
    }

    if (!recipe) return

    setIsExporting(true)

    try {
      // Get the current user's ID token for authentication
      const auth = getAuth(getApp())
      const currentUser = auth.currentUser
      if (!currentUser) {
        throw new Error('User not authenticated')
      }

      const idToken = await currentUser.getIdToken()

      // Call the Cloud Function directly via HTTP
      const functionUrl = 'https://us-central1-ghost-caddie.cloudfunctions.net/exportLabel'

      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          recipeId: recipe.id,
          format,
          preset,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Export failed with status ${response.status}`)
      }

      const responseData = await response.json()
      const data = responseData.result as { success: boolean; signedUrl?: string; error?: string }

      if (data.success && data.signedUrl) {
        // Create invisible anchor to trigger download
        const link = document.createElement('a')
        link.href = data.signedUrl
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        link.download = `nutrition-label-${recipeId}.${format.toLowerCase()}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
          title: 'Export complete',
          description: `Your ${format} label has been generated.`,
        })
      } else {
        throw new Error(data.error || 'Export failed')
      }
    } catch (error: unknown) {
      console.error('Export error:', error)
      const message = error instanceof Error ? error.message : 'Unknown error'

      if (message.includes('limit')) {
        toast({
          title: 'Export limit reached',
          description: 'Upgrade your plan for more exports.',
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Export failed',
          description: 'Please try again or contact support.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsExporting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!recipe || !recipe.computed) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Recipe not found or has no nutrition data.</p>
        <Button className="mt-4" onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    )
  }

  const labelData: LabelData = createLabelData(
    {
      name: recipe.name,
      servingsPerBatch: recipe.servingsPerBatch,
      servingSizeText: recipe.servingSizeText,
      computed: recipe.computed,
    },
    profile?.businessProfile
      ? {
        name: profile.businessProfile.name,
        address: profile.businessProfile.address || undefined,
      }
      : undefined
  )

  const isPaidPlan = profile?.plan === 'BASIC' || profile?.plan === 'PRO'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Generate Label</h1>
          <p className="text-muted-foreground">{recipe.name}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Label Preview</CardTitle>
            <CardDescription>
              {preset} format • {recipe.servingsPerBatch} servings
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center overflow-auto max-h-[600px]">
            <NutritionLabel
              data={labelData}
              preset={preset}
              showWatermark={!isPaidPlan}
              className="w-full max-w-[300px]"
            />
          </CardContent>
        </Card>

        {/* Export Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Label Size</Label>
                <Select
                  value={preset}
                  onValueChange={(value) => setPreset(value as LabelFormatPreset)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2x4">2" × 4" (Thermal Label)</SelectItem>
                    <SelectItem value="3x4">3" × 4" (Standard Label)</SelectItem>
                    <SelectItem value="4x6">4" × 6" (Large Label)</SelectItem>
                    <SelectItem value="8.5x11">8.5" × 11" (Full Page)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!isPaidPlan && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-amber-800">
                    <AlertTriangle className="h-4 w-4" />
                    Watermark will be added
                  </div>
                  <p className="mt-1 text-xs text-amber-700">
                    Upgrade to remove watermarks and unlock unlimited exports.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle>Accuracy Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4 text-sm">
                <p className="mb-2 font-medium">Before exporting, please note:</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>
                    Nutrition values are calculated using USDA FoodData Central
                    database
                  </li>
                  <li>
                    Allergen detection is automated and may not catch all
                    allergens
                  </li>
                  <li>
                    FDA rounding rules are applied but accuracy depends on input
                    data
                  </li>
                  <li>
                    You are responsible for verifying all label information
                    before use
                  </li>
                </ul>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="disclaimer"
                  checked={disclaimerAccepted}
                  onCheckedChange={(checked) =>
                    setDisclaimerAccepted(checked === true)
                  }
                />
                <Label
                  htmlFor="disclaimer"
                  className="text-sm font-normal leading-tight"
                >
                  I confirm I will verify label accuracy and allergen statements
                  for my product before commercial use.
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Export Buttons */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => handleExport('PDF')}
              disabled={!disclaimerAccepted || isExporting}
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FileText className="h-4 w-4" />
              )}
              Export PDF
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() => handleExport('PNG')}
              disabled={!disclaimerAccepted || isExporting}
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Image className="h-4 w-4" />
              )}
              Export PNG
            </Button>
          </div>

          {/* Data Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Data Sources & Notes</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>
                <strong>Database:</strong> USDA FoodData Central
              </p>
              <p>
                <strong>Daily Values:</strong> FDA 2020 Reference
              </p>
              <p>
                <strong>Rounding:</strong> FDA-style rounding rules applied
              </p>
              {recipe.computed.missingFields.length > 0 && (
                <div className="rounded bg-amber-50 p-2 text-amber-700">
                  <strong>Missing data:</strong>
                  <ul className="list-disc pl-4 mt-1">
                    {recipe.computed.missingFields.map((field, i) => (
                      <li key={i}>{field}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
