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
function generateLabelSVG(data: LabelData, width: number, height: number): string {
  const scale = width / 200
  const pdv = data.pdv || {
    totalFat: null, saturatedFat: null, cholesterol: null, sodium: null,
    totalCarbohydrate: null, dietaryFiber: null, addedSugars: null, protein: null,
    vitaminD: null, calcium: null, iron: null, potassium: null
  }

  // Helper to render DV percentage if present
  const renderDV = (val: number | null, y: number) => {
    return val !== null ? `<text class="dv" x="${width - 36 * scale}" y="${y}">${val}%</text>` : ''
  }

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
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
    .dv { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: bold; font-size: ${9 * scale}px; text-anchor: end; }
    .footer { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: ${7 * scale}px; }
    .hr-thick { stroke: black; stroke-width: ${8 * scale}; }
    .hr-medium { stroke: black; stroke-width: ${3 * scale}; }
    .hr-thin { stroke: black; stroke-width: ${1 * scale}; }
  </style>
  <rect class="label-bg" x="0" y="0" width="${width}" height="${height}" />
  <g transform="translate(${10 * scale}, ${10 * scale})">
    <rect class="label-border" x="0" y="0" width="${width - 20 * scale}" height="${height - 20 * scale}" />
    <g transform="translate(${8 * scale}, ${8 * scale})">
      <text class="title" x="0" y="${20 * scale}">Nutrition Facts</text>
      <line class="hr-thick" x1="0" y1="${32 * scale}" x2="${width - 36 * scale}" y2="${32 * scale}" />
      <text class="serving" x="0" y="${44 * scale}">${data.servingsPerContainer} servings per container</text>
      <text class="nutrient-bold" x="0" y="${56 * scale}">Serving size</text>
      <text class="nutrient-bold" x="${width - 36 * scale}" y="${56 * scale}" text-anchor="end">${data.servingSize}</text>
      <line class="hr-thick" x1="0" y1="${66 * scale}" x2="${width - 36 * scale}" y2="${66 * scale}" />
      <text class="subtitle" x="0" y="${84 * scale}">Amount per serving</text>
      <text class="calories-label" x="0" y="${98 * scale}">Calories</text>
      <text class="calories-value" x="${width - 36 * scale}" y="${102 * scale}" text-anchor="end">${data.calories}</text>
      <line class="hr-medium" x1="0" y1="${112 * scale}" x2="${width - 36 * scale}" y2="${112 * scale}" />
      <text class="dv" x="${width - 36 * scale}" y="${124 * scale}">% Daily Value*</text>
      <line class="hr-thin" x1="0" y1="${130 * scale}" x2="${width - 36 * scale}" y2="${130 * scale}" />
      
      <text class="nutrient-bold" x="0" y="${142 * scale}">Total Fat ${data.totalFat}g</text>
      ${renderDV(pdv.totalFat, 142 * scale)}
      <line class="hr-thin" x1="0" y1="${148 * scale}" x2="${width - 36 * scale}" y2="${148 * scale}" />
      
      <text class="nutrient" x="${12 * scale}" y="${160 * scale}">Saturated Fat ${data.saturatedFat}g</text>
      ${renderDV(pdv.saturatedFat, 160 * scale)}
      <line class="hr-thin" x1="0" y1="${166 * scale}" x2="${width - 36 * scale}" y2="${166 * scale}" />
      
      <text class="nutrient" x="${12 * scale}" y="${178 * scale}">Trans Fat ${data.transFat}g</text>
      <line class="hr-thin" x1="0" y1="${184 * scale}" x2="${width - 36 * scale}" y2="${184 * scale}" />
      
      <text class="nutrient-bold" x="0" y="${196 * scale}">Cholesterol ${data.cholesterol}mg</text>
      ${renderDV(pdv.cholesterol, 196 * scale)}
      <line class="hr-thin" x1="0" y1="${202 * scale}" x2="${width - 36 * scale}" y2="${202 * scale}" />
      
      <text class="nutrient-bold" x="0" y="${214 * scale}">Sodium ${data.sodium}mg</text>
      ${renderDV(pdv.sodium, 214 * scale)}
      <line class="hr-thin" x1="0" y1="${220 * scale}" x2="${width - 36 * scale}" y2="${220 * scale}" />
      
      <text class="nutrient-bold" x="0" y="${232 * scale}">Total Carbohydrate ${data.totalCarbohydrate}g</text>
      ${renderDV(pdv.totalCarbohydrate, 232 * scale)}
      <line class="hr-thin" x1="0" y1="${238 * scale}" x2="${width - 36 * scale}" y2="${238 * scale}" />
      
      <text class="nutrient" x="${12 * scale}" y="${250 * scale}">Dietary Fiber ${data.dietaryFiber}g</text>
      ${renderDV(pdv.dietaryFiber, 250 * scale)}
      <line class="hr-thin" x1="0" y1="${256 * scale}" x2="${width - 36 * scale}" y2="${256 * scale}" />
      
      <text class="nutrient" x="${12 * scale}" y="${268 * scale}">Total Sugars ${data.totalSugars}g</text>
      <line class="hr-thin" x1="0" y1="${274 * scale}" x2="${width - 36 * scale}" y2="${274 * scale}" />
      
      <text class="nutrient-bold" x="0" y="${286 * scale}">Protein ${data.protein}g</text>
      ${renderDV(pdv.protein, 286 * scale)}
      <line class="hr-thick" x1="0" y1="${296 * scale}" x2="${width - 36 * scale}" y2="${296 * scale}" />

      <text class="nutrient" x="0" y="${308 * scale}">Vitamin D ${data.vitaminD || 0}mcg</text>
      ${renderDV(pdv.vitaminD, 308 * scale)}
      <line class="hr-thin" x1="0" y1="${314 * scale}" x2="${width - 36 * scale}" y2="${314 * scale}" />

      <text class="nutrient" x="0" y="${326 * scale}">Calcium ${data.calcium || 0}mg</text>
      ${renderDV(pdv.calcium, 326 * scale)}
      <line class="hr-thin" x1="0" y1="${332 * scale}" x2="${width - 36 * scale}" y2="${332 * scale}" />

      <text class="nutrient" x="0" y="${344 * scale}">Iron ${data.iron || 0}mg</text>
      ${renderDV(pdv.iron, 344 * scale)}
      <line class="hr-thin" x1="0" y1="${350 * scale}" x2="${width - 36 * scale}" y2="${350 * scale}" />

      <text class="nutrient" x="0" y="${362 * scale}">Potassium ${data.potassium || 0}mg</text>
      ${renderDV(pdv.potassium, 362 * scale)}
      <line class="hr-medium" x1="0" y1="${372 * scale}" x2="${width - 36 * scale}" y2="${372 * scale}" />
      
      <text class="footer" x="0" y="${385 * scale}">* The % Daily Value tells you how much a nutrient in</text>
      <text class="footer" x="0" y="${395 * scale}">a serving contributes to a daily diet. 2,000 calories</text>
      <text class="footer" x="0" y="${405 * scale}">a day is used for general nutrition advice.</text>
    </g>
  </g>
</svg>
`
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

        // Generate label dimensions based on preset
        // Heights are calculated to fit the full label content (approx 450 * scale + margins)
        const presets: Record<string, { width: number; height: number }> = {
          '2x4': { width: 192, height: 600 },   // Increased height to fit micronutrients
          '3x4': { width: 288, height: 750 },   // Increased height
          '4x6': { width: 384, height: 950 },   // Increased height
          '8.5x11': { width: 816, height: 1056 },
        }

        const dims = presets[data.preset] || presets['3x4']

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

        // Generate SVG
        const svg = generateLabelSVG(labelData, dims.width, dims.height)

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
          await page.setViewport({ width: dims.width, height: dims.height })
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
              width: `${dims.width}px`,
              height: `${dims.height}px`,
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
