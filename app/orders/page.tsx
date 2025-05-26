"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AuthHeader from "@/components/auth-header"
import { useAuth } from "@/hooks/use-auth"

interface Order {
  id: string
  orderNumber: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  items: {
    id: string
    title: string
    author: string
    cover: string
    price: number
    quantity: number
  }[]
  shippingAddress: {
    name: string
    address: string
    phone: string
  }
  trackingNumber?: string
}

export default function OrdersPage() {
  const { user, isLoading: authLoading, requireAuth } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !requireAuth()) {
      return
    }

    // 주문 내역 로드 시뮬레이션
    const loadOrders = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockOrders: Order[] = [
          {
            id: "1",
            orderNumber: "SB-2024-001",
            date: "2024.01.20",
            status: "delivered",
            total: 58000,
            items: [
              {
                id: "1",
                title: "린 스타트업 플레이북",
                author: "에릭 리스, 스티브 블랭크",
                cover: "/placeholder.svg?height=80&width=60",
                price: 29000,
                quantity: 1,
              },
              {
                id: "2",
                title: "스케일링 스타트업",
                author: "리드 호프만, 크리스 예",
                cover: "/placeholder.svg?height=80&width=60",
                price: 32000,
                quantity: 1,
              },
            ],
            shippingAddress: {
              name: "김창업",
              address: "서울시 강남구 테헤란로 123, 456호",
              phone: "010-1234-5678",
            },
            trackingNumber: "1234567890",
          },
          {
            id: "2",
            orderNumber: "SB-2024-002",
            date: "2024.01.25",
            status: "shipped",
            total: 26000,
            items: [
              {
                id: "3",
                title: "창업자의 마인드셋",
                author: "캐롤 드웩, 앤젤라 더크워스",
                cover: "/placeholder.svg?height=80&width=60",
                price: 26000,
                quantity: 1,
              },
            ],
            shippingAddress: {
              name: "김창업",
              address: "서울시 강남구 테헤란로 123, 456호",
              phone: "010-1234-5678",
            },
            trackingNumber: "0987654321",
          },
        ]

        setOrders(mockOrders)
      } catch (error) {
        console.error("Failed to load orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      loadOrders()
    }
  }, [user, authLoading, requireAuth])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            주문 확인 중
          </Badge>
        )
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">처리 중</Badge>
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800">배송 중</Badge>
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">배송 완료</Badge>
      case "cancelled":
        return <Badge variant="destructive">주문 취소</Badge>
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "processing":
        return <Package className="h-5 w-5 text-blue-600" />
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-600" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      default:
        return <Package className="h-5 w-5 text-gray-600" />
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AuthHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">주문 내역을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">주문 내역</h1>
              <p className="text-gray-600">주문하신 도서의 배송 상태를 확인하세요</p>
            </div>
            <Link href="/profile">
              <Button variant="outline">프로필로 돌아가기</Button>
            </Link>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">주문 내역이 없습니다</h3>
                <p className="text-gray-600 mb-6">아직 주문하신 도서가 없습니다</p>
                <Link href="/">
                  <Button className="bg-black text-white hover:bg-gray-800">도서 둘러보기</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-3">
                          {getStatusIcon(order.status)}
                          <span>주문번호: {order.orderNumber}</span>
                        </CardTitle>
                        <CardDescription>주문일: {order.date}</CardDescription>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(order.status)}
                        <p className="text-lg font-bold mt-2">₩{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* 주문 상품 */}
                      <div>
                        <h4 className="font-medium mb-3">주문 상품</h4>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <Image
                                src={item.cover || "/placeholder.svg"}
                                alt={item.title}
                                width={60}
                                height={80}
                                className="flex-shrink-0 rounded border border-gray-200"
                              />
                              <div className="flex-1">
                                <h5 className="font-medium">{item.title}</h5>
                                <p className="text-sm text-gray-600">{item.author}</p>
                                <p className="text-sm text-gray-600">수량: {item.quantity}개</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">₩{item.price.toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 배송 정보 */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">배송 정보</h4>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">받는 분</p>
                              <p className="font-medium">{order.shippingAddress.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">연락처</p>
                              <p className="font-medium">{order.shippingAddress.phone}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-sm text-gray-600">배송 주소</p>
                              <p className="font-medium">{order.shippingAddress.address}</p>
                            </div>
                            {order.trackingNumber && (
                              <div className="md:col-span-2">
                                <p className="text-sm text-gray-600">운송장 번호</p>
                                <p className="font-medium text-blue-600">{order.trackingNumber}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="border-t pt-4 flex space-x-3">
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            리뷰 작성
                          </Button>
                        )}
                        {order.trackingNumber && (
                          <Button variant="outline" size="sm">
                            배송 추적
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          주문 상세
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
