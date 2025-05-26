"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, MoreHorizontal, Edit, Trash2, UserCheck, UserX, Loader2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminHeader from "@/components/admin-header"
import { useAuth } from "@/hooks/use-auth"

interface User {
  id: string
  name: string
  email: string
  phone: string
  joinDate: string
  status: "active" | "inactive" | "suspended"
  totalOrders: number
  totalSpent: number
  lastLogin: string
}

export default function AdminUsersPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.email !== "admin@startup.com") {
        router.push("/login")
        return
      }

      const loadUsers = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000))

          const mockUsers: User[] = [
            {
              id: "1",
              name: "김창업",
              email: "kim@startup.com",
              phone: "010-1234-5678",
              joinDate: "2024.01.15",
              status: "active",
              totalOrders: 12,
              totalSpent: 348000,
              lastLogin: "2024.01.26",
            },
            {
              id: "2",
              name: "이스타트",
              email: "lee@startup.com",
              phone: "010-9876-5432",
              joinDate: "2024.01.10",
              status: "active",
              totalOrders: 8,
              totalSpent: 256000,
              lastLogin: "2024.01.25",
            },
            {
              id: "3",
              name: "박비즈니스",
              email: "park@startup.com",
              phone: "010-5555-1234",
              joinDate: "2024.01.05",
              status: "active",
              totalOrders: 15,
              totalSpent: 420000,
              lastLogin: "2024.01.24",
            },
            {
              id: "4",
              name: "최혁신",
              email: "choi@innovation.com",
              phone: "010-1111-2222",
              joinDate: "2023.12.20",
              status: "inactive",
              totalOrders: 3,
              totalSpent: 87000,
              lastLogin: "2024.01.10",
            },
            {
              id: "5",
              name: "정성장",
              email: "jung@growth.com",
              phone: "010-3333-4444",
              joinDate: "2023.12.15",
              status: "suspended",
              totalOrders: 0,
              totalSpent: 0,
              lastLogin: "2023.12.20",
            },
          ]

          setUsers(mockUsers)
        } catch (error) {
          console.error("Failed to load users:", error)
        } finally {
          setIsLoading(false)
        }
      }

      loadUsers()
    }
  }, [user, authLoading, router])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const startIndex = (currentPage - 1) * usersPerPage
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">활성</Badge>
      case "inactive":
        return <Badge className="bg-yellow-100 text-yellow-800">비활성</Badge>
      case "suspended":
        return <Badge variant="destructive">정지</Badge>
      default:
        return null
    }
  }

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: newStatus as any } : user)))
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId))
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">사용자 목록을 불러오는 중...</p>
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
            <h1 className="text-3xl font-bold">사용자 관리</h1>
            <p className="text-gray-600">등록된 사용자를 관리하세요</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            사용자 추가
          </Button>
        </div>

        {/* 검색 및 필터 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="이름 또는 이메일로 검색..."
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
                  <SelectItem value="active">활성</SelectItem>
                  <SelectItem value="inactive">비활성</SelectItem>
                  <SelectItem value="suspended">정지</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 사용자 테이블 */}
        <Card>
          <CardHeader>
            <CardTitle>사용자 목록</CardTitle>
            <CardDescription>총 {filteredUsers.length}명의 사용자</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>사용자</TableHead>
                  <TableHead>연락처</TableHead>
                  <TableHead>가입일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>주문수</TableHead>
                  <TableHead>총 구매액</TableHead>
                  <TableHead>최근 로그인</TableHead>
                  <TableHead className="text-right">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.totalOrders}건</TableCell>
                    <TableCell>₩{user.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            수정
                          </DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "suspended")}>
                              <UserX className="h-4 w-4 mr-2" />
                              정지
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                              <UserCheck className="h-4 w-4 mr-2" />
                              활성화
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            삭제
                          </DropdownMenuItem>
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
