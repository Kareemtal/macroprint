import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import puppeteer from 'puppeteer'

admin.initializeApp()

const db = admin.firestore()
const storage = admin.storage()

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
  allergenStatement?: string
  businessName?: string
  businessAddress?: string
}

// Generate nutrition label SVG
function generateLabelSVG(data: LabelData, width: number, height: number): string {
  const scale = width / 200

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <style>
    .label-bg { fill: white; }
    .label-border { fill: none; stroke: black; stroke-width: ${2 * scale}; }
    .title { font-family: Helvetica, Arial, sans-serif; font-weight: 900; font-size: ${22 * scale}px; }
    .subtitle { font-family: Helvetica, Arial, sans-serif; font-weight: bold; font-size: ${10 * scale}px; }
    .serving { font-family: Helvetica, Arial, sans-serif; font-size: ${9 * scale}px; }
    .calories-label { font-family: Helvetica, Arial, sans-serif; font-weight: bold; font-size: ${10 * scale}px; }
    .calories-value { font-family: Helvetica, Arial, sans-serif; font-weight: 900; font-size: ${36 * scale}px; }
    .nutrient { font-family: Helvetica, Arial, sans-serif; font-size: ${9 * scale}px; }
    .nutrient-bold { font-family: Helvetica, Arial, sans-serif; font-weight: bold; font-size: ${9 * scale}px; }
    .dv { font-family: Helvetica, Arial, sans-serif; font-weight: bold; font-size: ${9 * scale}px; text-anchor: end; }
    .footer { font-family: Helvetica, Arial, sans-serif; font-size: ${7 * scale}px; }
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
      <line class="hr-thin" x1="0" y1="${148 * scale}" x2="${width - 36 * scale}" y2="${148 * scale}" />
      <text class="nutrient" x="${12 * scale}" y="${160 * scale}">Saturated Fat ${data.saturatedFat}g</text>
      <line class="hr-thin" x1="0" y1="${166 * scale}" x2="${width - 36 * scale}" y2="${166 * scale}" />
      <text class="nutrient" x="${12 * scale}" y="${178 * scale}">Trans Fat ${data.transFat}g</text>
      <line class="hr-thin" x1="0" y1="${184 * scale}" x2="${width - 36 * scale}" y2="${184 * scale}" />
      <text class="nutrient-bold" x="0" y="${196 * scale}">Cholesterol ${data.cholesterol}mg</text>
      <line class="hr-thin" x1="0" y1="${202 * scale}" x2="${width - 36 * scale}" y2="${202 * scale}" />
      <text class="nutrient-bold" x="0" y="${214 * scale}">Sodium ${data.sodium}mg</text>
      <line class="hr-thin" x1="0" y1="${220 * scale}" x2="${width - 36 * scale}" y2="${220 * scale}" />
      <text class="nutrient-bold" x="0" y="${232 * scale}">Total Carbohydrate ${data.totalCarbohydrate}g</text>
      <line class="hr-thin" x1="0" y1="${238 * scale}" x2="${width - 36 * scale}" y2="${238 * scale}" />
      <text class="nutrient" x="${12 * scale}" y="${250 * scale}">Dietary Fiber ${data.dietaryFiber}g</text>
      <line class="hr-thin" x1="0" y1="${256 * scale}" x2="${width - 36 * scale}" y2="${256 * scale}" />
      <text class="nutrient" x="${12 * scale}" y="${268 * scale}">Total Sugars ${data.totalSugars}g</text>
      <line class="hr-thin" x1="0" y1="${274 * scale}" x2="${width - 36 * scale}" y2="${274 * scale}" />
      <text class="nutrient-bold" x="0" y="${286 * scale}">Protein ${data.protein}g</text>
      <line class="hr-thick" x1="0" y1="${296 * scale}" x2="${width - 36 * scale}" y2="${296 * scale}" />
      <text class="footer" x="0" y="${310 * scale}">* The % Daily Value tells you how much a nutrient in</text>
      <text class="footer" x="0" y="${320 * scale}">a serving contributes to a daily diet. 2,000 calories</text>
      <text class="footer" x="0" y="${330 * scale}">a day is used for general nutrition advice.</text>
    </g>
  </g>
</svg>
`
}

// Export label as PDF or PNG
export const exportLabel = functions
  .runWith({
    memory: '2GB',
    timeoutSeconds: 120,
  })
  .https.onCall(async (data: ExportRequest, context) => {
    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      )
    }

    const uid = context.auth.uid

    // Get user profile to check plan limits
    const userDoc = await db.collection('users').doc(uid).get()
    if (!userDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'User not found')
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

    if (exportCount >= limits[plan]) {
      throw new functions.https.HttpsError(
        'resource-exhausted',
        'Export limit reached for today'
      )
    }

    // Get recipe
    const recipeDoc = await db.collection('recipes').doc(data.recipeId).get()
    if (!recipeDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Recipe not found')
    }

    const recipe = recipeDoc.data()!
    if (recipe.uid !== uid) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'Not authorized to export this recipe'
      )
    }

    // Generate label dimensions based on preset
    const presets: Record<string, { width: number; height: number }> = {
      '2x4': { width: 192, height: 384 },
      '3x4': { width: 288, height: 384 },
      '4x6': { width: 384, height: 576 },
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
    }

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
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

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
        buffer = await page.pdf({
          width: `${dims.width}px`,
          height: `${dims.height}px`,
          printBackground: true,
        })
        contentType = 'application/pdf'
        extension = 'pdf'
      } else {
        buffer = await page.screenshot({
          type: 'png',
          omitBackground: false,
        })
        contentType = 'image/png'
        extension = 'png'
      }

      // Generate file path
      const exportId = Date.now().toString()
      const filePath = `exports/${uid}/${data.recipeId}/${exportId}.${extension}`

      // Upload to storage
      const bucket = storage.bucket()
      const file = bucket.file(filePath)

      await file.save(buffer, {
        metadata: {
          contentType,
        },
      })

      // Generate signed URL (expires in 7 days)
      const [signedUrl] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      })

      // Update recipe with export record
      const exportRecord = {
        exportId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        format: data.format,
        preset: data.preset,
        storagePath: filePath,
        signedUrl,
        hash: exportId, // Simple hash for now
        version: '1.0',
        disclaimerAcceptedAt: admin.firestore.FieldValue.serverTimestamp(),
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

      return {
        success: true,
        exportId,
        signedUrl,
        format: data.format,
      }
    } finally {
      await browser.close()
    }
  })

// Rate limit for ingredient search (simple implementation)
export const rateLimit = functions.https.onCall(async (data, context) => {
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
