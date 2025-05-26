import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const x = searchParams.get("x") // 경도
    const y = searchParams.get("y") // 위도

    if (!x || !y) {
      return NextResponse.json({ error: "좌표 정보가 필요합니다." }, { status: 400 })
    }

    const apiKey = process.env.KAKAO_REST_API_KEY
    if (!apiKey) {
      console.error("KAKAO_REST_API_KEY is not set")
      return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 })
    }

    const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`, {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error("Kakao API error:", response.status, response.statusText)
      return NextResponse.json({ error: "카카오 API 호출에 실패했습니다." }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Coord to address error:", error)
    return NextResponse.json({ error: "좌표 변환 중 오류가 발생했습니다." }, { status: 500 })
  }
}
