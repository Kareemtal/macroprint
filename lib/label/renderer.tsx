import type { LabelData, LabelFormatPreset, LabelDimensions } from '@/lib/types'
import { calculatePercentDV } from '@/lib/nutrition/calculator'
import { FDA_DAILY_VALUES_VERSION } from '@/lib/constants/fda'

// DPI for print conversion
const DPI = 300
const SCREEN_DPI = 96

// Convert inches to pixels
function inchesToPx(inches: number, dpi = SCREEN_DPI): number {
  return Math.round(inches * dpi)
}

export interface LabelRenderOptions {
  preset: LabelFormatPreset
  showWatermark?: boolean
  forPrint?: boolean
}

const PRESET_DIMENSIONS: Record<LabelFormatPreset, LabelDimensions> = {
  '2x4': { width: 2, height: 4, unit: 'in' },
  '3x4': { width: 3, height: 4, unit: 'in' },
  '4x6': { width: 4, height: 6, unit: 'in' },
  '8.5x11': { width: 8.5, height: 11, unit: 'in' },
}

/**
 * Calculate the required height for label content
 */
function calculateContentHeight(
  data: LabelData,
  scale: number
): number {
  const lineHeight = 12 * scale
  let y = 0

  // Title + thick line
  y += 26 * scale
  y += 12 * scale

  // Servings + serving size
  y += lineHeight
  y += 14 * scale

  // Thick line + amount per serving
  y += 20 * scale
  y += 14 * scale

  // Calories
  y += 36 * scale

  // Medium line + DV header
  y += lineHeight
  y += lineHeight

  // Thin line + nutrients (Total Fat, Sat Fat, Trans Fat, Cholesterol, Sodium, Total Carb, Fiber, Sugars)
  const nutrientLines = 8
  y += (lineHeight * 2) * nutrientLines // each nutrient has line + value

  // Added sugars (if present)
  if (data.addedSugars !== null) {
    y += lineHeight * 2
  }

  // Protein
  y += lineHeight

  // Thick line
  y += lineHeight

  // Vitamins/minerals (conditionally)
  if (data.vitaminD !== null) y += lineHeight * 2
  if (data.calcium !== null) y += lineHeight * 2
  if (data.iron !== null) y += lineHeight * 2
  if (data.potassium !== null) y += lineHeight * 2

  // Footer text (3 lines)
  y += 4 * scale
  y += 8 * scale * 3
  y += 12 * scale

  // Allergen statement
  if (data.allergenStatement) {
    y += lineHeight * 2
  }

  // Business info
  if (data.businessName) {
    y += 4 * scale
    y += 10 * scale
    if (data.businessAddress) {
      y += 10 * scale
    }
  }

  // Net weight
  if (data.netWeight) {
    y += 10 * scale
  }

  // Add padding for inner container (8 * scale * 2) and outer container (10 * scale * 2)
  y += 36 * scale

  return y
}

/**
 * Generate FDA-style Nutrition Facts label as SVG string
 */
export function generateLabelSVG(
  data: LabelData,
  options: LabelRenderOptions
): string {
  const dimensions = PRESET_DIMENSIONS[options.preset]
  const dpi = options.forPrint ? DPI : SCREEN_DPI
  const width = inchesToPx(dimensions.width, dpi)

  // Calculate scale factor based on preset
  const scale = width / 200 // Base width is 200 units

  // Calculate dynamic height based on content, with minimum from preset
  const minHeight = inchesToPx(dimensions.height, dpi)
  const contentHeight = calculateContentHeight(data, scale)
  const height = Math.max(minHeight, contentHeight)

  const pdv = calculatePercentDV({
    calories: data.calories,
    totalFat: data.totalFat,
    saturatedFat: data.saturatedFat,
    transFat: data.transFat,
    cholesterol: data.cholesterol,
    sodium: data.sodium,
    totalCarbohydrate: data.totalCarbohydrate,
    dietaryFiber: data.dietaryFiber,
    totalSugars: data.totalSugars,
    addedSugars: data.addedSugars,
    protein: data.protein,
    vitaminD: data.vitaminD,
    calcium: data.calcium,
    iron: data.iron,
    potassium: data.potassium,
  })

  // Build SVG content
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMin meet">
  <defs>
    <style>
      .label-bg { fill: white; }
      .label-border { fill: none; stroke: black; stroke-width: ${2 * scale}; }
      .title { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 900; font-size: ${22 * scale}px; }
      .subtitle { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; font-size: ${10 * scale}px; }
      .serving { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: ${9 * scale}px; }
      .calories-label { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; font-size: ${10 * scale}px; }
      .calories-value { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 900; font-size: ${36 * scale}px; }
      .nutrient { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: ${9 * scale}px; }
      .nutrient-bold { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; font-size: ${9 * scale}px; }
      .nutrient-indent { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: ${9 * scale}px; }
      .dv { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; font-size: ${9 * scale}px; text-anchor: end; }
      .footer { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: ${7 * scale}px; }
      .hr-thick { stroke: black; stroke-width: ${8 * scale}; }
      .hr-medium { stroke: black; stroke-width: ${3 * scale}; }
      .hr-thin { stroke: black; stroke-width: ${1 * scale}; }
      .watermark { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: ${16 * scale}px; fill: rgba(255, 0, 0, 0.3); font-weight: bold; transform-origin: center; }
      .allergen { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: ${8 * scale}px; font-weight: bold; }
      .business { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: ${7 * scale}px; }
    </style>
  </defs>

  <!-- Background -->
  <rect class="label-bg" x="0" y="0" width="${width}" height="${height}" />
  
  <!-- Main container -->
  <g transform="translate(${10 * scale}, ${10 * scale})">
    <!-- Border -->
    <rect class="label-border" x="0" y="0" width="${width - 20 * scale}" height="${height - 20 * scale}" />
    
    <!-- Inner padding -->
    <g transform="translate(${8 * scale}, ${8 * scale})">
      ${generateLabelContent(data, pdv, scale, width - 36 * scale)}
    </g>
  </g>

  ${options.showWatermark ? generateWatermark(width, height, scale) : ''}
</svg>
`.trim()

  return svg
}

function generateLabelContent(
  data: LabelData,
  pdv: ReturnType<typeof calculatePercentDV>,
  scale: number,
  contentWidth: number
): string {
  let y = 0
  const lineHeight = 12 * scale
  const lines: string[] = []

  // Title
  lines.push(`<text class="title" x="0" y="${y + 20 * scale}">Nutrition Facts</text>`)
  y += 26 * scale

  // Thick line
  lines.push(`<line class="hr-thick" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += 12 * scale

  // Servings
  lines.push(`<text class="serving" x="0" y="${y}">${data.servingsPerContainer} servings per container</text>`)
  y += lineHeight

  // Serving size
  lines.push(`<text class="nutrient-bold" x="0" y="${y}">Serving size</text>`)
  lines.push(`<text class="nutrient-bold" x="${contentWidth}" y="${y}" text-anchor="end">${data.servingSize}</text>`)
  y += 14 * scale

  // Thick line
  lines.push(`<line class="hr-thick" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += 20 * scale

  // Amount per serving
  lines.push(`<text class="subtitle" x="0" y="${y}">Amount per serving</text>`)
  y += 14 * scale

  // Calories
  lines.push(`<text class="calories-label" x="0" y="${y}">Calories</text>`)
  lines.push(`<text class="calories-value" x="${contentWidth}" y="${y + 4 * scale}" text-anchor="end">${data.calories}</text>`)
  y += 36 * scale

  // Medium line
  lines.push(`<line class="hr-medium" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += lineHeight

  // % Daily Value header
  lines.push(`<text class="dv" x="${contentWidth}" y="${y}">% Daily Value*</text>`)
  y += lineHeight

  // Thin line
  lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += lineHeight

  // Total Fat
  lines.push(`<text class="nutrient-bold" x="0" y="${y}">Total Fat</text>`)
  lines.push(`<text class="nutrient" x="${50 * scale}" y="${y}">${data.totalFat}g</text>`)
  if (pdv.totalFat !== null) {
    lines.push(`<text class="dv" x="${contentWidth}" y="${y}">${pdv.totalFat}%</text>`)
  }
  y += lineHeight
  lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += lineHeight

  // Saturated Fat (indented)
  lines.push(`<text class="nutrient-indent" x="${12 * scale}" y="${y}">Saturated Fat ${data.saturatedFat}g</text>`)
  if (pdv.saturatedFat !== null) {
    lines.push(`<text class="dv" x="${contentWidth}" y="${y}">${pdv.saturatedFat}%</text>`)
  }
  y += lineHeight
  lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += lineHeight

  // Trans Fat (indented)
  lines.push(`<text class="nutrient-indent" x="${12 * scale}" y="${y}">Trans Fat ${data.transFat}g</text>`)
  y += lineHeight
  lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += lineHeight

  // Cholesterol
  lines.push(`<text class="nutrient-bold" x="0" y="${y}">Cholesterol</text>`)
  lines.push(`<text class="nutrient" x="${58 * scale}" y="${y}">${data.cholesterol}mg</text>`)
  if (pdv.cholesterol !== null) {
    lines.push(`<text class="dv" x="${contentWidth}" y="${y}">${pdv.cholesterol}%</text>`)
  }
  y += lineHeight
  lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += lineHeight

  // Sodium
  lines.push(`<text class="nutrient-bold" x="0" y="${y}">Sodium</text>`)
  lines.push(`<text class="nutrient" x="${40 * scale}" y="${y}">${data.sodium}mg</text>`)
  if (pdv.sodium !== null) {
    lines.push(`<text class="dv" x="${contentWidth}" y="${y}">${pdv.sodium}%</text>`)
  }
  y += lineHeight
  lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += lineHeight

  // Total Carbohydrate
  lines.push(`<text class="nutrient-bold" x="0" y="${y}">Total Carbohydrate</text>`)
  lines.push(`<text class="nutrient" x="${95 * scale}" y="${y}">${data.totalCarbohydrate}g</text>`)
  if (pdv.totalCarbohydrate !== null) {
    lines.push(`<text class="dv" x="${contentWidth}" y="${y}">${pdv.totalCarbohydrate}%</text>`)
  }
  y += lineHeight
  lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += lineHeight

  // Dietary Fiber (indented)
  lines.push(`<text class="nutrient-indent" x="${12 * scale}" y="${y}">Dietary Fiber ${data.dietaryFiber}g</text>`)
  if (pdv.dietaryFiber !== null) {
    lines.push(`<text class="dv" x="${contentWidth}" y="${y}">${pdv.dietaryFiber}%</text>`)
  }
  y += lineHeight
  lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += lineHeight

  // Total Sugars (indented)
  lines.push(`<text class="nutrient-indent" x="${12 * scale}" y="${y}">Total Sugars ${data.totalSugars}g</text>`)
  y += lineHeight
  lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += lineHeight

  // Added Sugars (double indent)
  if (data.addedSugars !== null) {
    lines.push(`<text class="nutrient-indent" x="${24 * scale}" y="${y}">Includes ${data.addedSugars}g Added Sugars</text>`)
    if (pdv.addedSugars !== null) {
      lines.push(`<text class="dv" x="${contentWidth}" y="${y}">${pdv.addedSugars}%</text>`)
    }
    y += lineHeight
    lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
    y += lineHeight
  }

  // Protein
  lines.push(`<text class="nutrient-bold" x="0" y="${y}">Protein</text>`)
  lines.push(`<text class="nutrient" x="${38 * scale}" y="${y}">${data.protein}g</text>`)
  y += lineHeight

  // Thick line before vitamins
  lines.push(`<line class="hr-thick" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
  y += lineHeight

  // Vitamin D
  if (data.vitaminD !== null) {
    lines.push(`<text class="nutrient" x="0" y="${y}">Vitamin D ${data.vitaminD}mcg</text>`)
    if (pdv.vitaminD !== null) {
      lines.push(`<text class="dv" x="${contentWidth}" y="${y}">${pdv.vitaminD}%</text>`)
    }
    y += lineHeight
    lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
    y += lineHeight
  }

  // Calcium
  if (data.calcium !== null) {
    lines.push(`<text class="nutrient" x="0" y="${y}">Calcium ${data.calcium}mg</text>`)
    if (pdv.calcium !== null) {
      lines.push(`<text class="dv" x="${contentWidth}" y="${y}">${pdv.calcium}%</text>`)
    }
    y += lineHeight
    lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
    y += lineHeight
  }

  // Iron
  if (data.iron !== null) {
    lines.push(`<text class="nutrient" x="0" y="${y}">Iron ${data.iron}mg</text>`)
    if (pdv.iron !== null) {
      lines.push(`<text class="dv" x="${contentWidth}" y="${y}">${pdv.iron}%</text>`)
    }
    y += lineHeight
    lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
    y += lineHeight
  }

  // Potassium
  if (data.potassium !== null) {
    lines.push(`<text class="nutrient" x="0" y="${y}">Potassium ${data.potassium}mg</text>`)
    if (pdv.potassium !== null) {
      lines.push(`<text class="dv" x="${contentWidth}" y="${y}">${pdv.potassium}%</text>`)
    }
    y += lineHeight
    lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
    y += lineHeight
  }

  // Footer
  y += 4 * scale
  lines.push(`<text class="footer" x="0" y="${y}">* The % Daily Value (DV) tells you how much a nutrient in</text>`)
  y += 8 * scale
  lines.push(`<text class="footer" x="0" y="${y}">a serving of food contributes to a daily diet. 2,000 calories</text>`)
  y += 8 * scale
  lines.push(`<text class="footer" x="0" y="${y}">a day is used for general nutrition advice.</text>`)
  y += 12 * scale

  // Allergen statement
  if (data.allergenStatement) {
    lines.push(`<line class="hr-thin" x1="0" y1="${y}" x2="${contentWidth}" y2="${y}" />`)
    y += lineHeight
    lines.push(`<text class="allergen" x="0" y="${y}">${data.allergenStatement}</text>`)
    y += lineHeight
  }

  // Business info
  if (data.businessName) {
    y += 4 * scale
    lines.push(`<text class="business" x="0" y="${y}">${data.businessName}</text>`)
    y += 10 * scale
    if (data.businessAddress) {
      lines.push(`<text class="business" x="0" y="${y}">${data.businessAddress}</text>`)
      y += 10 * scale
    }
  }

  // Net weight
  if (data.netWeight) {
    lines.push(`<text class="business" x="0" y="${y}">Net Wt: ${data.netWeight}</text>`)
  }

  return lines.join('\n    ')
}

function generateWatermark(width: number, height: number, scale: number): string {
  return `
  <g transform="translate(${width / 2}, ${height / 2}) rotate(-45)">
    <text class="watermark" text-anchor="middle" dominant-baseline="middle">SAMPLE - MACROPRINT</text>
  </g>
  `
}

/**
 * Generate label preview data from recipe computed nutrition
 */
export function createLabelData(
  recipe: {
    name: string
    servingsPerBatch: number
    servingSizeText: string
    computed: {
      perServing: {
        calories: number | null
        totalFat: number | null
        saturatedFat: number | null
        transFat: number | null
        cholesterol: number | null
        sodium: number | null
        totalCarbohydrate: number | null
        dietaryFiber: number | null
        totalSugars: number | null
        addedSugars: number | null
        protein: number | null
        vitaminD: number | null
        calcium: number | null
        iron: number | null
        potassium: number | null
      }
      allergenStatement: {
        contains: string[]
        mayContain: string[]
      }
    }
  },
  businessInfo?: {
    name?: string
    address?: string
  },
  netWeight?: string
): LabelData {
  const ps = recipe.computed.perServing

  return {
    servingsPerContainer: recipe.servingsPerBatch,
    servingSize: recipe.servingSizeText,
    calories: ps.calories ?? 0,
    totalFat: ps.totalFat ?? 0,
    saturatedFat: ps.saturatedFat ?? 0,
    transFat: ps.transFat ?? 0,
    cholesterol: ps.cholesterol ?? 0,
    sodium: ps.sodium ?? 0,
    totalCarbohydrate: ps.totalCarbohydrate ?? 0,
    dietaryFiber: ps.dietaryFiber ?? 0,
    totalSugars: ps.totalSugars ?? 0,
    addedSugars: ps.addedSugars,
    protein: ps.protein ?? 0,
    vitaminD: ps.vitaminD,
    calcium: ps.calcium,
    iron: ps.iron,
    potassium: ps.potassium,
    allergenStatement: formatAllergenStatement(recipe.computed.allergenStatement),
    businessName: businessInfo?.name,
    businessAddress: businessInfo?.address,
    netWeight,
  }
}

function formatAllergenStatement(allergens: { contains: string[]; mayContain: string[] }): string | undefined {
  const parts: string[] = []

  if (allergens.contains.length > 0) {
    parts.push(`Contains: ${allergens.contains.join(', ')}`)
  }

  if (allergens.mayContain.length > 0) {
    parts.push(`May contain: ${allergens.mayContain.join(', ')}`)
  }

  return parts.length > 0 ? parts.join('. ') : undefined
}

export { FDA_DAILY_VALUES_VERSION }
