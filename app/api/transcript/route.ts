import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  const lang = request.nextUrl.searchParams.get('lang')
  const text = request.nextUrl.searchParams.get('text')

  if (!url) {
    return NextResponse.json({ message: '缺少URL参数' }, { status: 400 })
  }

  try {
    const apiUrl = new URL('https://api.supadata.ai/v1/transcript')
    apiUrl.searchParams.set('url', url)
    if (lang) apiUrl.searchParams.set('lang', lang)
    if (text) apiUrl.searchParams.set('text', text)

    const response = await fetch(apiUrl.toString(), {
      headers: {
        'x-api-key': 'sd_6676e1b65e9542daebcad7ca5a9f3171',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { message: errorData.message || 'API调用失败' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API调用错误:', error)
    return NextResponse.json(
      { message: '服务器内部错误' },
      { status: 500 }
    )
  }
}
