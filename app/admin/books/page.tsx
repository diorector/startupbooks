"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, MoreHorizontal, Edit, Trash2, Eye, EyeOff, Loader2, Plus, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminHeader from "@/components/admin-header"
import { useAuth } from "@/hooks/use-auth"
import { getAllBooks, updateBook, deleteBook, type Book } from "@/lib/book-storage"

export default function AdminBooksPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [books, setBooks] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const booksPerPage = 10

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.email !== "admin@startup.com") {
        router.push("/login")
        return
      }

      // 성공 메시지 표시
      if (searchParams.get("success") === "added") {
        setShowSuccessMessage(true)
        setTimeout(() => setShowSuccessMessage(false), 5000)
      }

      const loadBooks = async () => {
        try {
          setIsLoading(true)
          // Supabase에서 실제 도서 데이터 로드
          const booksData = await getAllBooks()
          setBooks(booksData)
        } catch (error) {
          console.error("Failed to load books:", error)
        } finally {
          setIsLoading(false)
        }
      }

      loadBooks()
    }
  }, [user, authLoading, router, searchParams])

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter
    const matchesStatus = statusFilter === "all" || book.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage)
  const startIndex = (currentPage - 1) * booksPerPage
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage)

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">품절</Badge>
    }
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">판매중</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">판매중지</Badge>
      default:
        return null
    }
  }

  const handleStatusChange = async (bookId: string, newStatus: string) => {
    const updatedBook = await updateBook(bookId, { status: newStatus as "active" | "inactive" })
    if (updatedBook) {
      setBooks((prev) => prev.map((book) => (book.id === bookId ? updatedBook : book)))
    }
  }

  const handleDeleteBook = async (bookId: string) => {
    if (confirm("정말로 이 도서를 삭제하시겠습니까?")) {
      const success = await deleteBook(bookId)
      if (success) {
        setBooks((prev) => prev.filter((book) => book.id !== bookId))
      }
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">도서 목록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        {/* 성공 메시지 */}
        {showSuccessMessage && (
          <div className="max-w-6xl mx-auto mb-6">
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>새 도서가 성공적으로 등록되었습니다!</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">도서 관리</h1>
            <p className="text-gray-600">등록된 도서를 관리하세요</p>
          </div>
          <Link href="/admin/books/add">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              도서 추가
            </Button>
          </Link>
        </div>

        {/* 검색 및 필터 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="도서명 또는 저자로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 카테고리</SelectItem>
                  <SelectItem value="스타트업">스타트업</SelectItem>
                  <SelectItem value="경영전략">경영전략</SelectItem>
                  <SelectItem value="자기계발">자기계발</SelectItem>
                  <SelectItem value="마케팅">마케팅</SelectItem>
                  <SelectItem value="투자">투자</SelectItem>
                  <SelectItem value="기술">기술</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태</SelectItem>
                  <SelectItem value="active">판매중</SelectItem>
                  <SelectItem value="inactive">판매중지</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 도서 테이블 */}
        <Card>
          <CardHeader>
            <CardTitle>도서 목록</CardTitle>
            <CardDescription>총 {filteredBooks.length}권의 도서</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>도서</TableHead>
                  <TableHead>카테고리</TableHead>
                  <TableHead>가격</TableHead>
                  <TableHead>재고</TableHead>
                  <TableHead>판매량</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>출간일</TableHead>
                  <TableHead className="text-right">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={book.cover || "/placeholder.svg"}
                          alt={book.title}
                          width={60}
                          height={80}
                          className="rounded border border-gray-200"
                        />
                        <div>
                          <p className="font-medium">{book.title}</p>
                          <p className="text-sm text-gray-600">{book.author}</p>
                          <p className="text-xs text-gray-500">{book.publisher}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{book.category}</Badge>
                    </TableCell>
                    <TableCell>₩{book.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={book.stock === 0 ? "text-red-600 font-medium" : ""}>{book.stock}권</span>
                    </TableCell>
                    <TableCell>{book.sales}권</TableCell>
                    <TableCell>{getStatusBadge(book.status, book.stock)}</TableCell>
                    <TableCell>{book.publishDate}</TableCell>
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
                          {book.status === "active" ? (
                            <DropdownMenuItem onClick={() => handleStatusChange(book.id, "inactive")}>
                              <EyeOff className="h-4 w-4 mr-2" />
                              판매중지
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleStatusChange(book.id, "active")}>
                              <Eye className="h-4 w-4 mr-2" />
                              판매시작
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleDeleteBook(book.id)} className="text-red-600">
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
