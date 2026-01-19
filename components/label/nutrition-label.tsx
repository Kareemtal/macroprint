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
  const presetWidths: Record<LabelFormatPreset, string> = {
    '2x4': '150px',
    '3x4': '200px',
    '4x6': '250px',
    '8.5x11': '300px',
  }

  const width = presetWidths[preset]

  return (
    <div
      className="rounded-lg border border-neutral-200 bg-white shadow-sm"
      style={{ width }}
    >
      <NutritionLabel
        data={data}
        preset={preset}
        showWatermark={showWatermark}
        className="w-full"
      />
    </div>
  )
}
