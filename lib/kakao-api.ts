// 카카오 주소 검색 API 응답 타입 (주소를 좌표로 변환)
export interface KakaoAddressDocument {
  address_name: string
  address_type: "REGION" | "ROAD" | "REGION_ADDR" | "ROAD_ADDR"
  x: string // 경도
  y: string // 위도
  address: {
    address_name: string
    region_1depth_name: string
    region_2depth_name: string
    region_3depth_name: string
    region_3depth_h_name: string
    h_code: string
    b_code: string
    mountain_yn: string
    main_address_no: string
    sub_address_no: string
    x: string
    y: string
  }
  road_address: {
    address_name: string
    region_1depth_name: string
    region_2depth_name: string
    region_3depth_name: string
    road_name: string
    underground_yn: string
    main_building_no: string
    sub_building_no: string
    building_name: string
    zone_no: string
    y: string
    x: string
  } | null
}

export interface KakaoAddressSearchResponse {
  documents: KakaoAddressDocument[]
  meta: {
    total_count: number
    pageable_count: number
    is_end: boolean
  }
}

// 카카오 키워드 검색 API 응답 타입 (장소명으로 검색)
export interface KakaoKeywordDocument {
  id: string
  place_name: string
  category_name: string
  category_group_code: string
  category_group_name: string
  phone: string
  address_name: string
  road_address_name: string
  x: string // 경도
  y: string // 위도
  place_url: string
  distance: string
}

export interface KakaoKeywordSearchResponse {
  documents: KakaoKeywordDocument[]
  meta: {
    total_count: number
    pageable_count: number
    is_end: boolean
    same_name: {
      region: string[]
      keyword: string
      selected_region: string
    }
  }
}

// 좌표→주소 변환 API 응답 타입
export interface KakaoCoordToAddressResponse {
  documents: Array<{
    road_address: {
      address_name: string
      region_1depth_name: string
      region_2depth_name: string
      region_3depth_name: string
      road_name: string
      underground_yn: string
      main_building_no: string
      sub_building_no: string
      building_name: string
      zone_no: string
    } | null
    address: {
      address_name: string
      region_1depth_name: string
      region_2depth_name: string
      region_3depth_name: string
      mountain_yn: string
      main_address_no: string
      sub_address_no: string
      zip_code: string
    }
  }>
  meta: {
    total_count: number
  }
}

// 주소 검색 API 호출 (정확한 주소 입력)
export async function searchAddress(query: string): Promise<KakaoAddressDocument[]> {
  try {
    if (!query.trim()) {
      return []
    }

    const response = await fetch(`/api/kakao/search-address?query=${encodeURIComponent(query)}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Search address API error:", errorData)
      throw new Error(errorData.error || "주소 검색에 실패했습니다.")
    }

    const data: KakaoAddressSearchResponse = await response.json()
    return data.documents || []
  } catch (error) {
    console.error("Address search error:", error)
    throw error
  }
}

// 키워드 검색 API 호출 (장소명, 업체명 등)
export async function searchKeyword(query: string): Promise<KakaoKeywordDocument[]> {
  try {
    if (!query.trim()) {
      return []
    }

    const response = await fetch(`/api/kakao/search-keyword?query=${encodeURIComponent(query)}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Search keyword API error:", errorData)
      throw new Error(errorData.error || "키워드 검색에 실패했습니다.")
    }

    const data: KakaoKeywordSearchResponse = await response.json()
    return data.documents || []
  } catch (error) {
    console.error("Keyword search error:", error)
    throw error
  }
}

// 좌표로 주소 검색 (역지오코딩)
export async function getAddressByCoords(longitude: number, latitude: number): Promise<string> {
  try {
    const response = await fetch(`/api/kakao/coord-to-address?x=${longitude}&y=${latitude}`)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Coord to address API error:", errorData)
      throw new Error(errorData.error || "좌표 변환에 실패했습니다.")
    }

    const data: KakaoCoordToAddressResponse = await response.json()

    if (!data.documents || data.documents.length === 0) {
      throw new Error("해당 위치의 주소를 찾을 수 없습니다.")
    }

    const document = data.documents[0]

    // 도로명 주소 우선, 없으면 지번 주소 사용
    const roadAddress = document.road_address?.address_name
    const jibunAddress = document.address?.address_name

    return roadAddress || jibunAddress || "주소를 찾을 수 없습니다."
  } catch (error) {
    console.error("Coordinate conversion error:", error)
    throw error
  }
}
