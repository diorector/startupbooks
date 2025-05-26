"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, MoreHorizontal, Eye, Package, Truck, CheckCircle, Clock, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminHeader from "@/components/admin-header"
import { useAuth } from "@/hooks/use-auth"

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  items: Array<{
    title: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  shippingAddress: string
  trackingNumber?: string
}

export default function AdminOrdersPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.email !== "admin@startup.com") {
        router.push("/login")
        return
      }

      const loadOrders = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const mockOrders: Order[] = [
            {
              id: "1",
              orderNumber: "SB-2024-1001",
              customerName: "김창업",
              customerEmail: "kim@startup.com",
              items: [
                { title: "린 스타트업 플레이북", quantity: 1, price: 29000 },
                { title: "스케일링 스타트업", quantity: 1, price: 32000 },
              ],
              total: 61000,
              status: "delivered",
              orderDate: "2024.01.26",
              shippingAddress: "서울시 강남구 테헤란로 123",
              trackingNumber: "1234567890",
            },
            {
              id: "2",
              orderNumber: "SB-2024-1002",
              customerName: "이스타트",
              customerEmail: "lee@startup.com",
              items: [{ title: "창업자의 마인드셋", quantity: 1, price: 26000 }],
              total: 26000,
              status: "shipped",
              orderDate: "2024.01.25",
              shippingAddress: "서울시 서초구 강남대로 456",
              trackingNumber: "0987654321",
            },
            {
              id: "3",
              orderNumber: "SB-2024-1003",
              customerName: "박비즈니스",
              customerEmail: "park@startup.com",
              items: [{ title: "제로 투 원", quantity: 2, price: 18000 }],
              total: 36000,
              status: "processing",
              orderDate: "2024.01.24",
              shippingAddress: "부산시 해운대구 센텀로 789",
            },
            {
              id: "4",
              orderNumber: "SB-2024-1004",
              customerName: "최혁신",
              customerEmail: "choi@innovation.com",
              items: [{ title: "하드씽", quantity: 1, price: 28000 }],
              total: 28000,
              status: "pending",
              orderDate: "2024.01.23",
              shippingAddress: "대구시 수성구 동대구로 321",
            },
            {
              id: "5",
              orderNumber: "SB-2024-1005",
              customerName: "정성장",
              customerEmail: "jung@growth.com",
              items: [
                { title: "린 스타트업 플레이북", quantity: 1, price: 29000 },
                { title: "창업자의 마인드셋", quantity: 1, price: 26000 },
              ],
              total: 55000,
              status: "cancelled",
              orderDate: "2024.01.22",
              shippingAddress: "광주시 서구 상무대로 654",
            },
          ]

          setOrders(mockOrders)
        } catch (error) {
          console.error("Failed to load orders:", error)
        } finally {
          setIsLoading(false)
        }
      }

      loadOrders()
    }
  }, [user, authLoading, router])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const startIndex = (currentPage - 1) * ordersPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            주문확인
          </Badge>
        )
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">처리중</Badge>
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800">배송중</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">배송완료</Badge>
      case "cancelled":
        return <Badge variant="destructive">취소</Badge>
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus as any,
              trackingNumber:
                newStatus === "shipped" && !order.trackingNumber
                  ? Math.random().toString(36).substr(2, 10).toUpperCase()
                  : order.trackingNumber,
            }
          : order,
      ),
    )
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">주문 목록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">주문 관리</h1>
            <p className="text-gray-600">고객 주문을 관리하세요</p>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="주문번호, 고객명, 이메일로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="상태 필터" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="pending">주문확인</SelectItem>
                  <SelectItem value="processing">처리중</SelectItem>
                  <SelectItem value="shipped">배송중</SelectItem>
                  <SelectItem value="delivered">배송완료</SelectItem>
                  <SelectItem value="cancelled">취소</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 주문 테이블 */}
        <Card>
          <CardHeader>
            <CardTitle>주문 목록</CardTitle>
            <CardDescription>총 {filteredOrders.length}건의 주문</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>주문번호</TableHead>
                  <TableHead>고객정보</TableHead>
                  <TableHead>주문상품</TableHead>
                  <TableHead>주문금액</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>주문일</TableHead>
                  <TableHead className="text-right">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className="font-medium">{order.orderNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-600">{order.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            <span>{item.title}</span>
                            <span className="text-gray-600"> x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">₩{order.total.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            상세보기
                          </DropdownMenuItem>
                          {order.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "processing")}>
                              <Package className="h-4 w-4 mr-2" />
                              처리중으로 변경
                            </DropdownMenuItem>
                          )}
                          {order.status === "processing" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "shipped")}>
                              <Truck className="h-4 w-4 mr-2" />
                              배송중으로 변경
                            </DropdownMenuItem>
                          )}
                          {order.status === "shipped" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, "delivered")}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              배송완료로 변경
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  이전
                </Button>
                <span className="text-sm text-gray-600">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  다음
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
