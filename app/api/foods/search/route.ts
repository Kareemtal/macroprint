import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query || query.length < 2) {
    return NextResponse.json({
      success: false,
      error: 'Query must be at least 2 characters',
    })
  }

  try {
    // Lazy import to avoid build-time initialization
    const { USDAProvider } = await import('@/lib/nutrition/providers/usda')
    const usda = new USDAProvider(process.env.USDA_API_KEY)
    
    const results = await usda.searchFoods(query, { limit: 20 })

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error('Food search error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to search foods',
      },
      { status: 500 }
    )
  }
}
