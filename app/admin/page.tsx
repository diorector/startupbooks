"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Users, BookOpen, ShoppingCart, TrendingUp, DollarSign, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdminHeader from "@/components/admin-header"
import { useAuth } from "@/hooks/use-auth"

interface DashboardStats {
  totalUsers: number
  totalBooks: number
  totalOrders: number
  totalRevenue: number
  newUsersToday: number
  ordersToday: number
  revenueToday: number
  topSellingBooks: Array<{
    id: string
    title: string
    sales: number
    revenue: number
  }>
  recentOrders: Array<{
    id: string
    orderNumber: string
    customerName: string
    total: number
    status: string
    date: string
  }>
}

export default function AdminDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    if (!authLoading) {
      // 관리자 권한 체크
      if (!user || user.email !== "admin@startup.com") {
        router.push("/login")
        return
      }

      // 대시보드 데이터 로드
      const loadDashboardData = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const mockStats: DashboardStats = {
            totalUsers: 1247,
            totalBooks: 156,
            totalOrders: 3892,
            totalRevenue: 125840000,
            newUsersToday: 23,
            ordersToday: 47,
            revenueToday: 1580000,
            topSellingBooks: [
              { id: "1", title: "린 스타트업 플레이북", sales: 342, revenue: 9918000 },
              { id: "2", title: "스케일링 스타트업", sales: 298, revenue: 9536000 },
              { id: "3", title: "창업자의 마인드셋", sales: 267, revenue: 6942000 },
              { id: "4", title: "제로 투 원", sales: 234, revenue: 4212000 },
              { id: "5", title: "하드씽", sales: 189, revenue: 5292000 },
            ],
            recentOrders: [
              {
                id: "1",
                orderNumber: "SB-2024-1001",
                customerName: "김창업",
                total: 58000,
                status: "delivered",
                date: "2024.01.26",
              },
              {
                id: "2",
                orderNumber: "SB-2024-1002",
                customerName: "이스타트",
                total: 32000,
                status: "shipped",
                date: "2024.01.26",
              },
              {
                id: "3",
                orderNumber: "SB-2024-1003",
                customerName: "박비즈니스",
                total: 26000,
                status: "processing",
                date: "2024.01.26",
              },
              {
                id: "4",
                orderNumber: "SB-2024-1004",
                customerName: "최혁신",
                total: 45000,
                status: "pending",
                date: "2024.01.25",
              },
              {
                id: "5",
                orderNumber: "SB-2024-1005",
                customerName: "정성장",
                total: 38000,
                status: "delivered",
                date: "2024.01.25",
              },
            ],
          }

          setStats(mockStats)
        } catch (error) {
          console.error("Failed to load dashboard data:", error)
        } finally {
          setIsLoading(false)
        }
      }

      loadDashboardData()
    }
  }, [user, authLoading, router])

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">대시보드를 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-600">데이터를 불러올 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">관리자 대시보드</h1>
          <p className="text-gray-600">스타트업북스 운영 현황을 확인하세요</p>
        </div>

        {/* 주요 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 사용자</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">오늘 +{stats.newUsersToday}명</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 도서</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBooks}</div>
              <p className="text-xs text-muted-foreground">활성 도서 수</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 주문</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">오늘 +{stats.ordersToday}건</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 매출</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₩{(stats.totalRevenue / 1000000).toFixed(0)}M</div>
              <p className="text-xs text-muted-foreground">오늘 +₩{(stats.revenueToday / 1000).toLocaleString()}K</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 베스트셀러 */}
          <Card>
            <CardHeader>
              <CardTitle>베스트셀러</CardTitle>
              <CardDescription>판매량 기준 상위 5개 도서</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topSellingBooks.map((book, index) => (
                  <div key={book.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{book.title}</p>
                        <p className="text-sm text-gray-600">{book.sales}권 판매</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₩{(book.revenue / 1000).toLocaleString()}K</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 최근 주문 */}
          <Card>
            <CardHeader>
              <CardTitle>최근 주문</CardTitle>
              <CardDescription>최신 주문 5건</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₩{order.total.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 빠른 액션 */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">빠른 액션</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/admin/users">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-medium">사용자 관리</h3>
                  <p className="text-sm text-gray-600">사용자 조회 및 관리</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/books">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-medium">도서 관리</h3>
                  <p className="text-sm text-gray-600">도서 추가 및 수정</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/orders">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-medium">주문 관리</h3>
                  <p className="text-sm text-gray-600">주문 상태 관리</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/analytics">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h3 className="font-medium">분석 리포트</h3>
                  <p className="text-sm text-gray-600">상세 통계 분석</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
