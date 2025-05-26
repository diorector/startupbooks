"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Star, BookOpen, Clock, Search, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AuthHeader from "@/components/auth-header"

interface ReadingRecord {
  id: string
  book: {
    title: string
    author: string
    cover: string
    isbn: string
  }
  status: "completed" | "reading" | "paused" | "wishlist"
  rating?: number
  review?: string
  startDate: string
  endDate?: string
  progress: number
  notes: string[]
}

export default function ReadingHistoryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("user")
      if (!userData) {
        router.push("/login?redirect=/profile/reading-history")
        return
      }

      try {
        const user = JSON.parse(userData)
        if (!user.isLoggedIn) {
          router.push("/login?redirect=/profile/reading-history")
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        console.error("Invalid user data:", error)
        router.push("/login?redirect=/profile/reading-history")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const readingHistory: ReadingRecord[] = [
    {
      id: "1",
      book: {
        title: "린 스타트업 플레이북",
        author: "에릭 리스, 스티브 블랭크",
        cover: "/placeholder.svg?height=160&width=120",
        isbn: "979-11-123456-78-9",
      },
      status: "completed",
      rating: 5,
      review: "스타트업을 준비하면서 읽은 책 중 가장 실용적이었습니다. MVP 개발 부분이 특히 도움이 되었어요.",
      startDate: "2024.01.10",
      endDate: "2024.01.15",
      progress: 100,
      notes: ["MVP 개념 정리", "고객 인터뷰 방법", "피벗 결정 기준"],
    },
    {
      id: "2",
      book: {
        title: "스케일링 스타트업",
        author: "리드 호프만, 크리스 예",
        cover: "/placeholder.svg?height=160&width=120",
        isbn: "979-11-123456-79-6",
      },
      status: "reading",
      startDate: "2024.01.16",
      progress: 78,
      notes: ["블리츠스케일링 5단계", "네트워크 효과"],
    },
    {
      id: "3",
      book: {
        title: "창업자의 마인드셋",
        author: "캐롤 드웩, 앤젤라 더크워스",
        cover: "/placeholder.svg?height=160&width=120",
        isbn: "979-11-123456-80-2",
      },
      status: "completed",
      rating: 4,
      review: "성장 마인드셋에 대한 이해가 깊어졌습니다. 실패를 바라보는 관점이 완전히 바뀌었어요.",
      startDate: "2023.12.20",
      endDate: "2023.12.28",
      progress: 100,
      notes: ["성장 vs 고정 마인드셋", "실패 학습법"],
    },
    {
      id: "4",
      book: {
        title: "제로 투 원",
        author: "피터 틸",
        cover: "/placeholder.svg?height=160&width=120",
        isbn: "979-11-123456-81-9",
      },
      status: "wishlist",
      startDate: "",
      progress: 0,
      notes: [],
    },
  ]

  const filteredHistory = readingHistory.filter((record) => {
    const matchesSearch =
      record.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || record.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">완독</Badge>
      case "reading":
        return <Badge className="bg-blue-100 text-blue-800">읽는 중</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800">일시정지</Badge>
      case "wishlist":
        return <Badge variant="outline">읽고 싶은 책</Badge>
      default:
        return null
    }
  }

  const getReadingStats = () => {
    const completed = readingHistory.filter((r) => r.status === "completed").length
    const reading = readingHistory.filter((r) => r.status === "reading").length
    const totalPages = completed * 350 // 평균 페이지 수 가정
    const avgRating =
      readingHistory.filter((r) => r.rating).reduce((sum, r) => sum + (r.rating || 0), 0) /
      readingHistory.filter((r) => r.rating).length

    return { completed, reading, totalPages, avgRating }
  }

  const stats = getReadingStats()

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">독서 기록</h1>
                <p className="text-gray-600">나의 독서 여정을 확인하세요</p>
              </div>
              <Link href="/profile">
                <Button variant="outline">프로필로 돌아가기</Button>
              </Link>
            </div>

            {/* Reading Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold">{stats.completed}</div>
                  <p className="text-sm text-gray-600">완독한 책</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold">{stats.reading}</div>
                  <p className="text-sm text-gray-600">읽는 중</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold">{stats.totalPages.toLocaleString()}</div>
                  <p className="text-sm text-gray-600">읽은 페이지</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <div className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</div>
                  <p className="text-sm text-gray-600">평균 평점</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="책 제목이나 저자로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="completed">완독</SelectItem>
                  <SelectItem value="reading">읽는 중</SelectItem>
                  <SelectItem value="paused">일시정지</SelectItem>
                  <SelectItem value="wishlist">읽고 싶은 책</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <SelectValue placeholder="정렬" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">최근 순</SelectItem>
                  <SelectItem value="title">제목 순</SelectItem>
                  <SelectItem value="author">저자 순</SelectItem>
                  <SelectItem value="rating">평점 순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reading History */}
          <div className="space-y-4">
            {filteredHistory.map((record) => (
              <Card key={record.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex space-x-6">
                    <Image
                      src={record.book.cover || "/placeholder.svg"}
                      alt={record.book.title}
                      width={80}
                      height={120}
                      className="flex-shrink-0 rounded border border-gray-200"
                    />

                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{record.book.title}</h3>
                          <p className="text-gray-600 mb-2">{record.book.author}</p>
                          {getStatusBadge(record.status)}
                        </div>

                        <div className="text-right">
                          {record.rating && (
                            <div className="flex items-center space-x-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= record.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                          <p className="text-sm text-gray-500">
                            {record.startDate} {record.endDate && `- ${record.endDate}`}
                          </p>
                        </div>
                      </div>

                      {record.status === "reading" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>진행률</span>
                            <span>{record.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${record.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {record.review && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">내 리뷰</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">{record.review}</p>
                        </div>
                      )}

                      {record.notes.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">메모</h4>
                          <div className="flex flex-wrap gap-2">
                            {record.notes.map((note, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {note}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-600">다른 검색어나 필터를 시도해보세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
