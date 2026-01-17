import { NextRequest, NextResponse } from 'next/server'
import { USDAProvider } from '@/lib/nutrition/providers/usda'

const usda = new USDAProvider(process.env.USDA_API_KEY)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({
      success: false,
      error: 'Food ID is required',
    })
  }

  try {
    const food = await usda.getFood(id)

    if (!food) {
      return NextResponse.json(
        {
          success: false,
          error: 'Food not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: food,
    })
  } catch (error) {
    console.error('Food detail error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get food details',
      },
      { status: 500 }
    )
  }
}
