import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
      return NextResponse.json({ error: "검색어가 필요합니다." }, { status: 400 })
    }

    const apiKey = process.env.KAKAO_REST_API_KEY
    if (!apiKey) {
      console.error("KAKAO_REST_API_KEY is not set")
      return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 })
    }

    // 카카오 로컬 API - 주소 검색 (주소를 좌표로 변환)
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      },
    )

    if (!response.ok) {
      console.error("Kakao API error:", response.status, response.statusText)
      const errorText = await response.text()
      console.error("Kakao API error response:", errorText)
      return NextResponse.json({ error: "카카오 API 호출에 실패했습니다." }, { status: response.status })
    }

    const data = await response.json()
    console.log("Kakao API response:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Search address error:", error)
    return NextResponse.json({ error: "주소 검색 중 오류가 발생했습니다." }, { status: 500 })
  }
}
