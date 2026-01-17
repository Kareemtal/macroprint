'use client'

import { useMemo } from 'react'
import type { LabelData, LabelFormatPreset } from '@/lib/types'
import { generateLabelSVG } from '@/lib/label/renderer'

interface NutritionLabelProps {
  data: LabelData
  preset?: LabelFormatPreset
  showWatermark?: boolean
  className?: string
}

export function NutritionLabel({
  data,
  preset = '3x4',
  showWatermark = false,
  className = '',
}: NutritionLabelProps) {
  const svgString = useMemo(() => {
    return generateLabelSVG(data, {
      preset,
      showWatermark,
      forPrint: false,
    })
  }, [data, preset, showWatermark])

  return (
    <div
      className={`nutrition-label-container ${className}`}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  )
}

interface LabelPreviewProps {
  data: LabelData
  preset: LabelFormatPreset
  showWatermark?: boolean
}

export function LabelPreview({ data, preset, showWatermark = false }: LabelPreviewProps) {
  const presetSizes: Record<LabelFormatPreset, { width: string; height: string }> = {
    '2x4': { width: '150px', height: '300px' },
    '3x4': { width: '200px', height: '267px' },
    '4x6': { width: '250px', height: '375px' },
    '8.5x11': { width: '300px', height: '388px' },
  }

  const size = presetSizes[preset]

  return (
    <div
      className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
      style={{ width: size.width, height: size.height }}
    >
      <NutritionLabel
        data={data}
        preset={preset}
        showWatermark={showWatermark}
        className="h-full w-full"
      />
    </div>
  )
}
