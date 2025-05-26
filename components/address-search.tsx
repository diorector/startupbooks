"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Search, Loader2, X, Navigation, Building } from "lucide-react"
import {
  searchAddress,
  searchKeyword,
  getAddressByCoords,
  type KakaoAddressDocument,
  type KakaoKeywordDocument,
} from "@/lib/kakao-api"

interface AddressSearchProps {
  onAddressSelect: (address: string) => void
  selectedAddress?: string
}

export default function AddressSearch({ onAddressSelect, selectedAddress }: AddressSearchProps) {
  const [query, setQuery] = useState("")
  const [addressResults, setAddressResults] = useState<KakaoAddressDocument[]>([])
  const [keywordResults, setKeywordResults] = useState<KakaoKeywordDocument[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("address")

  const handleAddressSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setError("")

    try {
      const results = await searchAddress(query)
      setAddressResults(results)

      if (results.length === 0) {
        setError("검색 결과가 없습니다. 정확한 주소를 입력해주세요.")
      }
    } catch (error) {
      console.error("Address search error:", error)
      setError(error instanceof Error ? error.message : "주소 검색 중 오류가 발생했습니다.")
      setAddressResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeywordSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setError("")

    try {
      const results = await searchKeyword(query)
      setKeywordResults(results)

      if (results.length === 0) {
        setError("검색 결과가 없습니다. 다른 키워드로 검색해보세요.")
      }
    } catch (error) {
      console.error("Keyword search error:", error)
      setError(error instanceof Error ? error.message : "키워드 검색 중 오류가 발생했습니다.")
      setKeywordResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = () => {
    if (activeTab === "address") {
      handleAddressSearch()
    } else {
      handleKeywordSearch()
    }
  }

  const handleCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError("이 브라우저는 위치 서비스를 지원하지 않습니다.")
      return
    }

    setIsGettingLocation(true)
    setError("")

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        })
      })

      const { longitude, latitude } = position.coords
      const address = await getAddressByCoords(longitude, latitude)

      if (address) {
        onAddressSelect(address)
        setAddressResults([])
        setKeywordResults([])
        setQuery("")
      } else {
        setError("현재 위치의 주소를 찾을 수 없습니다.")
      }
    } catch (error) {
      console.error("Location error:", error)
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("위치 접근 권한이 거부되었습니다.")
            break
          case error.POSITION_UNAVAILABLE:
            setError("위치 정보를 사용할 수 없습니다.")
            break
          case error.TIMEOUT:
            setError("위치 요청 시간이 초과되었습니다.")
            break
          default:
            setError("위치를 가져오는 중 오류가 발생했습니다.")
        }
      } else {
        setError(error instanceof Error ? error.message : "현재 위치를 가져올 수 없습니다.")
      }
    } finally {
      setIsGettingLocation(false)
    }
  }

  const handleAddressSelect = (address: KakaoAddressDocument) => {
    const selectedAddr = address.road_address?.address_name || address.address.address_name
    onAddressSelect(selectedAddr)
    setAddressResults([])
    setKeywordResults([])
    setQuery("")
    setError("")
  }

  const handleKeywordSelect = (place: KakaoKeywordDocument) => {
    const selectedAddr = place.road_address_name || place.address_name
    onAddressSelect(selectedAddr)
    setAddressResults([])
    setKeywordResults([])
    setQuery("")
    setError("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const clearAddress = () => {
    onAddressSelect("")
    setAddressResults([])
    setKeywordResults([])
    setQuery("")
    setError("")
  }

  return (
    <div className="space-y-4">
      {/* 선택된 주소 표시 */}
      {selectedAddress && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-sm">{selectedAddress}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={clearAddress} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 검색 탭 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="address" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>주소 검색</span>
          </TabsTrigger>
          <TabsTrigger value="keyword" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>장소 검색</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="address" className="space-y-3">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="예: 서울특별시 강남구 테헤란로 152"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching || !query.trim()} className="px-4">
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="keyword" className="space-y-3">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="예: 강남역, 롯데타워, 카카오 판교오피스"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching || !query.trim()} className="px-4">
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* 현재 위치 버튼 */}
      <Button variant="outline" onClick={handleCurrentLocation} disabled={isGettingLocation} className="w-full">
        {isGettingLocation ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            현재 위치 가져오는 중...
          </>
        ) : (
          <>
            <Navigation className="mr-2 h-4 w-4" />
            현재 위치 사용
          </>
        )}
      </Button>

      {/* 에러 메시지 */}
      {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

      {/* 주소 검색 결과 */}
      {activeTab === "address" && addressResults.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="max-h-60 overflow-y-auto">
              {addressResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleAddressSelect(result)}
                  className="w-full text-left p-4 hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-medium text-sm">
                      {result.road_address?.address_name || result.address.address_name}
                    </div>
                    {result.road_address && result.address.address_name !== result.road_address.address_name && (
                      <div className="text-xs text-gray-500">지번: {result.address.address_name}</div>
                    )}
                    <div className="text-xs text-gray-400">
                      {result.address_type === "ROAD_ADDR" ? "도로명주소" : "지번주소"}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 키워드 검색 결과 */}
      {activeTab === "keyword" && keywordResults.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <div className="max-h-60 overflow-y-auto">
              {keywordResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleKeywordSelect(result)}
                  className="w-full text-left p-4 hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="font-medium text-sm">{result.place_name}</div>
                    <div className="text-xs text-gray-600">{result.road_address_name || result.address_name}</div>
                    {result.category_name && <div className="text-xs text-gray-500">{result.category_name}</div>}
                    {result.phone && <div className="text-xs text-gray-400">{result.phone}</div>}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
