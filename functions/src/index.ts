import * as functions from 'firebase-functions/v1'
import * as admin from 'firebase-admin'
import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import cors from 'cors'

admin.initializeApp()
console.log('MacroPrint functions initialized')

const db = admin.firestore()
const storage = admin.storage()

// Initialize CORS middleware with all origins allowed
const corsHandler = cors({ origin: true })

// FDA Daily Values (2020)
const FDA_DAILY_VALUES = {
  totalFat: 78,
  saturatedFat: 20,
  cholesterol: 300,
  sodium: 2300,
  totalCarbohydrate: 275,
  dietaryFiber: 28,
  addedSugars: 50,
  protein: 50,
  vitaminD: 20,
  calcium: 1300,
  iron: 18,
  potassium: 4700,
}

interface PercentDailyValues {
  totalFat: number | null
  saturatedFat: number | null
  cholesterol: number | null
  sodium: number | null
  totalCarbohydrate: number | null
  dietaryFiber: number | null
  addedSugars: number | null
  protein: number | null
  vitaminD: number | null
  calcium: number | null
  iron: number | null
  potassium: number | null
}

function calculatePercentDV(nutrients: any): PercentDailyValues {
  const dv: PercentDailyValues = {
    totalFat: null,
    saturatedFat: null,
    cholesterol: null,
    sodium: null,
    totalCarbohydrate: null,
    dietaryFiber: null,
    addedSugars: null,
    protein: null,
    vitaminD: null,
    calcium: null,
    iron: null,
    potassium: null,
  }

  if (nutrients.totalFat != null) dv.totalFat = Math.round((nutrients.totalFat / FDA_DAILY_VALUES.totalFat) * 100)
  if (nutrients.saturatedFat != null) dv.saturatedFat = Math.round((nutrients.saturatedFat / FDA_DAILY_VALUES.saturatedFat) * 100)
  if (nutrients.cholesterol != null) dv.cholesterol = Math.round((nutrients.cholesterol / FDA_DAILY_VALUES.cholesterol) * 100)
  if (nutrients.sodium != null) dv.sodium = Math.round((nutrients.sodium / FDA_DAILY_VALUES.sodium) * 100)
  if (nutrients.totalCarbohydrate != null) dv.totalCarbohydrate = Math.round((nutrients.totalCarbohydrate / FDA_DAILY_VALUES.totalCarbohydrate) * 100)
  if (nutrients.dietaryFiber != null) dv.dietaryFiber = Math.round((nutrients.dietaryFiber / FDA_DAILY_VALUES.dietaryFiber) * 100)
  if (nutrients.addedSugars != null) dv.addedSugars = Math.round((nutrients.addedSugars / FDA_DAILY_VALUES.addedSugars) * 100)
  if (nutrients.protein != null) dv.protein = Math.round((nutrients.protein / FDA_DAILY_VALUES.protein) * 100)
  if (nutrients.vitaminD != null) dv.vitaminD = Math.round((nutrients.vitaminD / FDA_DAILY_VALUES.vitaminD) * 100)
  if (nutrients.calcium != null) dv.calcium = Math.round((nutrients.calcium / FDA_DAILY_VALUES.calcium) * 100)
  if (nutrients.iron != null) dv.iron = Math.round((nutrients.iron / FDA_DAILY_VALUES.iron) * 100)
  if (nutrients.potassium != null) dv.potassium = Math.round((nutrients.potassium / FDA_DAILY_VALUES.potassium) * 100)

  return dv
}

interface ExportRequest {
  recipeId: string
  format: 'PDF' | 'PNG'
  preset: string
}

interface LabelData {
  servingsPerContainer: number
  servingSize: string
  calories: number
  totalFat: number
  saturatedFat: number
  transFat: number
  cholesterol: number
  sodium: number
  totalCarbohydrate: number
  dietaryFiber: number
  totalSugars: number
  addedSugars: number | null
  protein: number
  vitaminD?: number | null
  calcium?: number | null
  iron?: number | null
  potassium?: number | null
  allergenStatement?: string
  businessName?: string
  businessAddress?: string
  pdv?: PercentDailyValues
}

// Generate nutrition label SVG
// Uses viewBox to automatically scale content to fit target dimensions
function generateLabelSVG(data: LabelData, width: number, height: number, isCompact: boolean = false): string {
  const pdv = data.pdv || {
    totalFat: null, saturatedFat: null, cholesterol: null, sodium: null,
    totalCarbohydrate: null, dietaryFiber: null, addedSugars: null, protein: null,
    vitaminD: null, calcium: null, iron: null, potassium: null
  }

  // Design the label at a fixed coordinate system
  // viewBox will scale it to fit the target width/height
  const vw = 200  // viewBox width
  const vh = isCompact ? 260 : 420  // viewBox height

  // For compact mode, use a condensed layout
  if (isCompact) {
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet">
  <style>
    text { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .bg { fill: white; }
    .border { fill: none; stroke: black; stroke-width: 1.5; }
    .title { font-weight: 900; font-size: 16px; }
    .bold { font-weight: bold; font-size: 7px; }
    .normal { font-size: 7px; }
    .small { font-size: 6px; }
    .calories { font-weight: 900; font-size: 22px; }
    .right { text-anchor: end; }
    .thick { stroke: black; stroke-width: 6; }
    .medium { stroke: black; stroke-width: 2; }
    .thin { stroke: black; stroke-width: 0.5; }
  </style>
  <rect class="bg" width="${vw}" height="${vh}"/>
  <g transform="translate(5, 5)">
    <rect class="border" width="${vw - 10}" height="${vh - 10}"/>
    <g transform="translate(5, 5)">
      <text class="title" y="12">Nutrition Facts</text>
      <line class="thick" x1="0" y1="16" x2="${vw - 20}" y2="16"/>
      
      <text class="small" y="24">${data.servingsPerContainer} servings per container</text>
      <text class="bold" y="33">Serving size</text>
      <text class="bold right" x="${vw - 20}" y="33">${data.servingSize}</text>
      <line class="thick" x1="0" y1="38" x2="${vw - 20}" y2="38"/>
      
      <text class="bold" y="50">Calories</text>
      <text class="calories right" x="${vw - 20}" y="54">${data.calories}</text>
      <line class="medium" x1="0" y1="58" x2="${vw - 20}" y2="58"/>
      
      <text class="bold right" x="${vw - 20}" y="66">% DV*</text>
      <line class="thin" x1="0" y1="69" x2="${vw - 20}" y2="69"/>
      
      <text class="bold" y="77">Total Fat ${data.totalFat}g</text>
      ${pdv.totalFat !== null ? `<text class="bold right" x="${vw - 20}" y="77">${pdv.totalFat}%</text>` : ''}
      <line class="thin" x1="0" y1="80" x2="${vw - 20}" y2="80"/>
      
      <text class="normal" x="8" y="88">Sat. Fat ${data.saturatedFat}g</text>
      ${pdv.saturatedFat !== null ? `<text class="bold right" x="${vw - 20}" y="88">${pdv.saturatedFat}%</text>` : ''}
      <line class="thin" x1="0" y1="91" x2="${vw - 20}" y2="91"/>
      
      <text class="normal" x="8" y="99">Trans Fat ${data.transFat}g</text>
      <line class="thin" x1="0" y1="102" x2="${vw - 20}" y2="102"/>
      
      <text class="bold" y="110">Cholest. ${data.cholesterol}mg</text>
      ${pdv.cholesterol !== null ? `<text class="bold right" x="${vw - 20}" y="110">${pdv.cholesterol}%</text>` : ''}
      <line class="thin" x1="0" y1="113" x2="${vw - 20}" y2="113"/>
      
      <text class="bold" y="121">Sodium ${data.sodium}mg</text>
      ${pdv.sodium !== null ? `<text class="bold right" x="${vw - 20}" y="121">${pdv.sodium}%</text>` : ''}
      <line class="thin" x1="0" y1="124" x2="${vw - 20}" y2="124"/>
      
      <text class="bold" y="132">Total Carb. ${data.totalCarbohydrate}g</text>
      ${pdv.totalCarbohydrate !== null ? `<text class="bold right" x="${vw - 20}" y="132">${pdv.totalCarbohydrate}%</text>` : ''}
      <line class="thin" x1="0" y1="135" x2="${vw - 20}" y2="135"/>
      
      <text class="normal" x="8" y="143">Fiber ${data.dietaryFiber}g</text>
      ${pdv.dietaryFiber !== null ? `<text class="bold right" x="${vw - 20}" y="143">${pdv.dietaryFiber}%</text>` : ''}
      <line class="thin" x1="0" y1="146" x2="${vw - 20}" y2="146"/>
      
      <text class="normal" x="8" y="154">Sugars ${data.totalSugars}g</text>
      <line class="thin" x1="0" y1="157" x2="${vw - 20}" y2="157"/>
      
      <text class="bold" y="165">Protein ${data.protein}g</text>
      ${pdv.protein !== null ? `<text class="bold right" x="${vw - 20}" y="165">${pdv.protein}%</text>` : ''}
      <line class="thick" x1="0" y1="170" x2="${vw - 20}" y2="170"/>
      
      <text class="normal" y="180">Vit D ${data.vitaminD || 0}mcg</text>
      ${pdv.vitaminD !== null ? `<text class="bold right" x="${vw - 20}" y="180">${pdv.vitaminD}%</text>` : ''}
      <line class="thin" x1="0" y1="183" x2="${vw - 20}" y2="183"/>
      
      <text class="normal" y="191">Calcium ${data.calcium || 0}mg</text>
      ${pdv.calcium !== null ? `<text class="bold right" x="${vw - 20}" y="191">${pdv.calcium}%</text>` : ''}
      <line class="thin" x1="0" y1="194" x2="${vw - 20}" y2="194"/>
      
      <text class="normal" y="202">Iron ${data.iron || 0}mg</text>
      ${pdv.iron !== null ? `<text class="bold right" x="${vw - 20}" y="202">${pdv.iron}%</text>` : ''}
      <line class="thin" x1="0" y1="205" x2="${vw - 20}" y2="205"/>
      
      <text class="normal" y="213">Potassium ${data.potassium || 0}mg</text>
      ${pdv.potassium !== null ? `<text class="bold right" x="${vw - 20}" y="213">${pdv.potassium}%</text>` : ''}
      <line class="thin" x1="0" y1="216" x2="${vw - 20}" y2="216"/>
      
      <text class="small" y="226">* % DV based on 2,000 calorie diet</text>
    </g>
  </g>
</svg>`
  }

  // Full size label
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet">
  <style>
    text { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .bg { fill: white; }
    .border { fill: none; stroke: black; stroke-width: 2; }
    .title { font-weight: 900; font-size: 22px; }
    .subtitle { font-weight: bold; font-size: 10px; }
    .bold { font-weight: bold; font-size: 9px; }
    .normal { font-size: 9px; }
    .small { font-size: 7px; }
    .calories { font-weight: 900; font-size: 36px; }
    .right { text-anchor: end; }
    .thick { stroke: black; stroke-width: 8; }
    .medium { stroke: black; stroke-width: 3; }
    .thin { stroke: black; stroke-width: 1; }
  </style>
  <rect class="bg" width="${vw}" height="${vh}"/>
  <g transform="translate(8, 8)">
    <rect class="border" width="${vw - 16}" height="${vh - 16}"/>
    <g transform="translate(6, 6)">
      <text class="title" y="18">Nutrition Facts</text>
      <line class="thick" x1="0" y1="26" x2="${vw - 28}" y2="26"/>
      
      <text class="normal" y="40">${data.servingsPerContainer} servings per container</text>
      <text class="bold" y="54">Serving size</text>
      <text class="bold right" x="${vw - 28}" y="54">${data.servingSize}</text>
      <line class="thick" x1="0" y1="62" x2="${vw - 28}" y2="62"/>
      
      <text class="subtitle" y="80">Amount per serving</text>
      <text class="bold" y="94">Calories</text>
      <text class="calories right" x="${vw - 28}" y="100">${data.calories}</text>
      <line class="medium" x1="0" y1="108" x2="${vw - 28}" y2="108"/>
      
      <text class="bold right" x="${vw - 28}" y="120">% Daily Value*</text>
      <line class="thin" x1="0" y1="126" x2="${vw - 28}" y2="126"/>
      
      <text class="bold" y="138">Total Fat ${data.totalFat}g</text>
      ${pdv.totalFat !== null ? `<text class="bold right" x="${vw - 28}" y="138">${pdv.totalFat}%</text>` : ''}
      <line class="thin" x1="0" y1="144" x2="${vw - 28}" y2="144"/>
      
      <text class="normal" x="12" y="156">Saturated Fat ${data.saturatedFat}g</text>
      ${pdv.saturatedFat !== null ? `<text class="bold right" x="${vw - 28}" y="156">${pdv.saturatedFat}%</text>` : ''}
      <line class="thin" x1="0" y1="162" x2="${vw - 28}" y2="162"/>
      
      <text class="normal" x="12" y="174">Trans Fat ${data.transFat}g</text>
      <line class="thin" x1="0" y1="180" x2="${vw - 28}" y2="180"/>
      
      <text class="bold" y="192">Cholesterol ${data.cholesterol}mg</text>
      ${pdv.cholesterol !== null ? `<text class="bold right" x="${vw - 28}" y="192">${pdv.cholesterol}%</text>` : ''}
      <line class="thin" x1="0" y1="198" x2="${vw - 28}" y2="198"/>
      
      <text class="bold" y="210">Sodium ${data.sodium}mg</text>
      ${pdv.sodium !== null ? `<text class="bold right" x="${vw - 28}" y="210">${pdv.sodium}%</text>` : ''}
      <line class="thin" x1="0" y1="216" x2="${vw - 28}" y2="216"/>
      
      <text class="bold" y="228">Total Carbohydrate ${data.totalCarbohydrate}g</text>
      ${pdv.totalCarbohydrate !== null ? `<text class="bold right" x="${vw - 28}" y="228">${pdv.totalCarbohydrate}%</text>` : ''}
      <line class="thin" x1="0" y1="234" x2="${vw - 28}" y2="234"/>
      
      <text class="normal" x="12" y="246">Dietary Fiber ${data.dietaryFiber}g</text>
      ${pdv.dietaryFiber !== null ? `<text class="bold right" x="${vw - 28}" y="246">${pdv.dietaryFiber}%</text>` : ''}
      <line class="thin" x1="0" y1="252" x2="${vw - 28}" y2="252"/>
      
      <text class="normal" x="12" y="264">Total Sugars ${data.totalSugars}g</text>
      <line class="thin" x1="0" y1="270" x2="${vw - 28}" y2="270"/>
      
      <text class="bold" y="282">Protein ${data.protein}g</text>
      ${pdv.protein !== null ? `<text class="bold right" x="${vw - 28}" y="282">${pdv.protein}%</text>` : ''}
      <line class="thick" x1="0" y1="292" x2="${vw - 28}" y2="292"/>
      
      <text class="normal" y="306">Vitamin D ${data.vitaminD || 0}mcg</text>
      ${pdv.vitaminD !== null ? `<text class="bold right" x="${vw - 28}" y="306">${pdv.vitaminD}%</text>` : ''}
      <line class="thin" x1="0" y1="312" x2="${vw - 28}" y2="312"/>
      
      <text class="normal" y="324">Calcium ${data.calcium || 0}mg</text>
      ${pdv.calcium !== null ? `<text class="bold right" x="${vw - 28}" y="324">${pdv.calcium}%</text>` : ''}
      <line class="thin" x1="0" y1="330" x2="${vw - 28}" y2="330"/>
      
      <text class="normal" y="342">Iron ${data.iron || 0}mg</text>
      ${pdv.iron !== null ? `<text class="bold right" x="${vw - 28}" y="342">${pdv.iron}%</text>` : ''}
      <line class="thin" x1="0" y1="348" x2="${vw - 28}" y2="348"/>
      
      <text class="normal" y="360">Potassium ${data.potassium || 0}mg</text>
      ${pdv.potassium !== null ? `<text class="bold right" x="${vw - 28}" y="360">${pdv.potassium}%</text>` : ''}
      <line class="medium" x1="0" y1="368" x2="${vw - 28}" y2="368"/>
      
      <text class="small" y="382">* The % Daily Value tells you how much a nutrient in</text>
      <text class="small" y="392">a serving contributes to a daily diet. 2,000 calories</text>
      <text class="small" y="402">a day is used for general nutrition advice.</text>
    </g>
  </g>
</svg>`
}

// Helper function to verify Firebase ID token
async function verifyAuth(req: functions.https.Request): Promise<string | null> {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const idToken = authHeader.split('Bearer ')[1]
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    return decodedToken.uid
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// Export label as PDF or PNG - using onRequest with CORS
export const exportLabel = functions
  .runWith({
    memory: '4GB',
    timeoutSeconds: 120,
  })
  .https.onRequest((req, res) => {
    // Handle CORS
    corsHandler(req, res, async () => {
      // Only allow POST requests
      if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' })
        return
      }

      try {
        // Verify authentication
        const uid = await verifyAuth(req)
        if (!uid) {
          res.status(401).json({ error: 'Unauthenticated - User must be authenticated' })
          return
        }

        // Parse request body - handle both callable format and direct format
        let data: ExportRequest
        if (req.body.data) {
          // Firebase callable format wraps data in a 'data' property
          data = req.body.data as ExportRequest
        } else {
          data = req.body as ExportRequest
        }

        if (!data.recipeId || !data.format || !data.preset) {
          res.status(400).json({ error: 'Missing required fields: recipeId, format, preset' })
          return
        }

        // Get user profile to check plan limits
        const userDoc = await db.collection('users').doc(uid).get()
        if (!userDoc.exists) {
          res.status(404).json({ error: 'User not found' })
          return
        }

        const userData = userDoc.data()!
        const plan = userData.plan || 'FREE'

        // Check export limits
        const today = new Date().toISOString().split('T')[0]
        const lastExportDate = userData.lastExportDate
        let exportCount = userData.exportCountToday || 0

        if (lastExportDate !== today) {
          exportCount = 0
        }

        const limits: Record<string, number> = {
          FREE: 3,
          BASIC: 50,
          PRO: 999999,
        }

        const effectiveLimit = limits[plan] + (userData.bonusExports || 0)
        if (exportCount >= effectiveLimit) {
          res.status(429).json({ error: 'Export limit reached for today' })
          return
        }

        // Get recipe
        const recipeDoc = await db.collection('recipes').doc(data.recipeId).get()
        if (!recipeDoc.exists) {
          res.status(404).json({ error: 'Recipe not found' })
          return
        }

        const recipe = recipeDoc.data()!
        if (recipe.uid !== uid) {
          res.status(403).json({ error: 'Not authorized to export this recipe' })
          return
        }

        // Build label data from recipe
        const computed = recipe.computed || {}
        const perServing = computed.perServing || {}

        const labelData: LabelData = {
          servingsPerContainer: recipe.servingsPerBatch || 1,
          servingSize: recipe.servingSizeText || '1 serving',
          calories: Math.round(perServing.calories || 0),
          totalFat: Math.round((perServing.totalFat || 0) * 10) / 10,
          saturatedFat: Math.round((perServing.saturatedFat || 0) * 10) / 10,
          transFat: Math.round((perServing.transFat || 0) * 10) / 10,
          cholesterol: Math.round(perServing.cholesterol || 0),
          sodium: Math.round(perServing.sodium || 0),
          totalCarbohydrate: Math.round(perServing.totalCarbohydrate || 0),
          dietaryFiber: Math.round(perServing.dietaryFiber || 0),
          totalSugars: Math.round(perServing.totalSugars || 0),
          addedSugars: perServing.addedSugars,
          protein: Math.round(perServing.protein || 0),
          vitaminD: Math.round((perServing.vitaminD || 0) * 10) / 10,
          calcium: Math.round(perServing.calcium || 0),
          iron: Math.round((perServing.iron || 0) * 10) / 10,
          potassium: Math.round(perServing.potassium || 0),
        }

        // Calculate % Daily Value
        labelData.pdv = calculatePercentDV(labelData)

        // Add business info if available
        if (userData.businessProfile) {
          labelData.businessName = userData.businessProfile.name
          labelData.businessAddress = userData.businessProfile.address
        }

        // Add allergen statement
        if (computed.allergenStatement?.contains?.length > 0) {
          labelData.allergenStatement = `Contains: ${computed.allergenStatement.contains.join(', ')}`
        }

        // Avery sheet layouts - dimensions in pixels at 96 DPI
        // Each preset defines: label size, sheet size (8.5x11"), labels per sheet, margins
        interface AverySheetLayout {
          labelWidth: number
          labelHeight: number
          sheetWidth: number
          sheetHeight: number
          columns: number
          rows: number
          marginTop: number
          marginLeft: number
          gapX: number
          gapY: number
        }

        const averyLayouts: Record<string, AverySheetLayout> = {
          'avery-5160': {
            // 1" × 2.625" - 30 per sheet (3 columns × 10 rows)
            labelWidth: 252, labelHeight: 96,
            sheetWidth: 816, sheetHeight: 1056,
            columns: 3, rows: 10,
            marginTop: 48, marginLeft: 14,
            gapX: 12, gapY: 0,
          },
          'avery-5163': {
            // 2" × 4" - 10 per sheet (2 columns × 5 rows)
            labelWidth: 384, labelHeight: 192,
            sheetWidth: 816, sheetHeight: 1056,
            columns: 2, rows: 5,
            marginTop: 48, marginLeft: 14,
            gapX: 20, gapY: 0,
          },
          'avery-5164': {
            // 3.33" × 4" - 6 per sheet (2 columns × 3 rows)
            labelWidth: 384, labelHeight: 320,
            sheetWidth: 816, sheetHeight: 1056,
            columns: 2, rows: 3,
            marginTop: 48, marginLeft: 14,
            gapX: 20, gapY: 24,
          },
          'avery-22822': {
            // 2" diameter round - 12 per sheet (3 columns × 4 rows)
            labelWidth: 192, labelHeight: 192,
            sheetWidth: 816, sheetHeight: 1056,
            columns: 3, rows: 4,
            marginTop: 72, marginLeft: 72,
            gapX: 84, gapY: 72,
          },
          'avery-6874': {
            // 1.5" × 2.5" - 18 per sheet (3 columns × 6 rows)
            labelWidth: 240, labelHeight: 144,
            sheetWidth: 816, sheetHeight: 1056,
            columns: 3, rows: 6,
            marginTop: 48, marginLeft: 48,
            gapX: 24, gapY: 24,
          },
          'avery-5168': {
            // 3.5" × 5" - 4 per sheet (2 columns × 2 rows)
            labelWidth: 480, labelHeight: 336,
            sheetWidth: 816, sheetHeight: 1056,
            columns: 2, rows: 2,
            marginTop: 96, marginLeft: 48,
            gapX: 0, gapY: 96,
          },
        }

        // Standard single-label presets (non-Avery)
        const standardPresets: Record<string, { width: number; height: number }> = {
          '2x4': { width: 192, height: 600 },
          '3x4': { width: 288, height: 750 },
          '4x6': { width: 384, height: 950 },
          '8.5x11': { width: 816, height: 1056 },
        }

        const isAveryPreset = data.preset.startsWith('avery-')
        let finalWidth: number
        let finalHeight: number
        let svgContent: string

        if (isAveryPreset && averyLayouts[data.preset]) {
          // Generate full sheet with multiple labels
          const layout = averyLayouts[data.preset]
          finalWidth = layout.sheetWidth
          finalHeight = layout.sheetHeight

          // Generate label SVG at the correct size with compact mode for Avery labels
          const singleLabelSvg = generateLabelSVG(labelData, layout.labelWidth, layout.labelHeight, true)

          // Create full sheet with tiled labels
          const labels: string[] = []
          for (let row = 0; row < layout.rows; row++) {
            for (let col = 0; col < layout.columns; col++) {
              const x = layout.marginLeft + col * (layout.labelWidth + layout.gapX)
              const y = layout.marginTop + row * (layout.labelHeight + layout.gapY)
              labels.push(`
                <g transform="translate(${x}, ${y})">
                  ${singleLabelSvg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
                </g>
              `)
            }
          }

          svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${finalWidth} ${finalHeight}" width="${finalWidth}" height="${finalHeight}">
              <style>
                .label-bg { fill: white; }
                .label-border { fill: none; stroke: black; stroke-width: 2; }
                .title { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 900; }
                .subtitle { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; }
                .serving { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
                .calories-label { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; }
                .calories-value { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 900; }
                .nutrient { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
                .nutrient-bold { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; }
                .dv { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; text-anchor: end; }
                .footer { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
                .hr-thick { stroke: black; }
                .hr-medium { stroke: black; }
                .hr-thin { stroke: black; }
              </style>
              <rect class="label-bg" x="0" y="0" width="${finalWidth}" height="${finalHeight}" />
              ${labels.join('\n')}
            </svg>
          `
        } else {
          // Standard single-label export
          const dims = standardPresets[data.preset] || standardPresets['3x4']
          finalWidth = dims.width
          finalHeight = dims.height
          svgContent = generateLabelSVG(labelData, finalWidth, finalHeight)
        }

        const svg = svgContent

        // Use Puppeteer to render
        console.log('Launching puppeteer...')
        const browser = await puppeteer.launch({
          args: (chromium as any).args,
          defaultViewport: (chromium as any).defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: (chromium as any).headless,
          ignoreHTTPSErrors: true,
        } as any)

        try {
          const page = await browser.newPage()
          await page.setViewport({ width: finalWidth, height: finalHeight })
          await page.setContent(`
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { margin: 0; padding: 0; }
            </style>
          </head>
          <body>
            ${svg}
          </body>
          </html>
        `)

          let buffer: Buffer
          let contentType: string
          let extension: string

          if (data.format === 'PDF') {
            buffer = Buffer.from(await page.pdf({
              width: `${finalWidth}px`,
              height: `${finalHeight}px`,
              printBackground: true,
              margin: { top: 0, right: 0, bottom: 0, left: 0 },
              pageRanges: '1',
            }))
            contentType = 'application/pdf'
            extension = 'pdf'
          } else {
            buffer = Buffer.from(await page.screenshot({
              type: 'png',
              omitBackground: false,
            }))
            contentType = 'image/png'
            extension = 'png'
          }

          // Generate file path
          const exportId = Date.now().toString()
          const filePath = `exports/${uid}/${data.recipeId}/${exportId}.${extension}`

          // Upload to storage
          const bucket = storage.bucket('ghost-caddie.firebasestorage.app')
          const file = bucket.file(filePath)

          await file.save(buffer, {
            metadata: {
              contentType,
            },
            public: true, // Make the file publicly readable
          })

          // Use public URL instead of signed URL to avoid IAM permission issues
          const publicUrl = `https://storage.googleapis.com/ghost-caddie.firebasestorage.app/${filePath}`

          // Update recipe with export record
          // Note: serverTimestamp() cannot be used inside arrays, so we use a regular date
          const now = new Date().toISOString()
          const exportRecord = {
            exportId,
            createdAt: now,
            format: data.format,
            preset: data.preset,
            storagePath: filePath,
            signedUrl: publicUrl, // Using public URL instead
            hash: exportId, // Simple hash for now
            version: '1.0',
            disclaimerAcceptedAt: now,
          }

          await db.collection('recipes').doc(data.recipeId).update({
            exports: admin.firestore.FieldValue.arrayUnion(exportRecord),
          })

          // Update user export count
          await db.collection('users').doc(uid).update({
            exportCountToday: exportCount + 1,
            lastExportDate: today,
          })

          // Log audit event
          await db.collection('auditEvents').add({
            uid,
            type: 'EXPORT_CREATED',
            recipeId: data.recipeId,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            metadata: {
              format: data.format,
              preset: data.preset,
              exportId,
            },
          })

          // Return response in callable format for compatibility
          res.status(200).json({
            result: {
              success: true,
              exportId,
              signedUrl: publicUrl,
              format: data.format,
            }
          })
        } finally {
          await browser.close()
        }
      } catch (error) {
        console.error('Export error:', error)
        res.status(500).json({ error: 'Export failed', details: String(error) })
      }
    })
  })

// Rate limit for ingredient search (simple implementation)
export const rateLimit = functions.https.onCall(async (data: any, context: functions.https.CallableContext) => {
  if (!context.auth) {
    // For anonymous users, use IP-based limiting
    // This is a simplified version - in production, use a proper rate limiter
    return { allowed: true, remaining: 100 }
  }

  const uid = context.auth.uid
  const action = data.action || 'search'
  const key = `rateLimit:${uid}:${action}:${new Date().toISOString().split('T')[0]}`

  const doc = await db.collection('rateLimits').doc(key).get()
  const count = doc.exists ? doc.data()!.count : 0
  const limit = 100 // Searches per day

  if (count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  await db.collection('rateLimits').doc(key).set(
    {
      count: count + 1,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  )

  return { allowed: true, remaining: limit - count - 1 }
})
