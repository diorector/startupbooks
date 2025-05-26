"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import AdminHeader from "@/components/admin-header"
import { useAuth } from "@/hooks/use-auth"
import { addBook } from "@/lib/book-storage"

interface BookFormData {
  title: string
  subtitle: string
  author: string
  publisher: string
  isbn: string
  price: number
  discountPrice: number
  category: string
  subcategory: string
  description: string
  tableOfContents: string
  pages: number
  publishDate: string
  language: string
  format: string[]
  tags: string[]
  status: "active" | "inactive"
  stock: number
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  cover: string
  images: string[]
}

export default function AddBookPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentTag, setCurrentTag] = useState("")

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    subtitle: "",
    author: "",
    publisher: "스타트업북스",
    isbn: "",
    price: 0,
    discountPrice: 0,
    category: "",
    subcategory: "",
    description: "",
    tableOfContents: "",
    pages: 0,
    publishDate: "",
    language: "한국어",
    format: ["종이책"],
    tags: [],
    status: "active",
    stock: 0,
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0,
    },
    cover: "",
    images: [],
  })

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.email !== "admin@startup.com") {
        router.push("/login")
        return
      }
    }
  }, [user, authLoading, router])

  const categories = [
    { value: "스타트업", subcategories: ["린 스타트업", "창업", "벤처", "스케일링"] },
    { value: "경영전략", subcategories: ["전략기획", "조직관리", "리더십", "혁신"] },
    { value: "자기계발", subcategories: ["마인드셋", "습관", "목표설정", "성장"] },
    { value: "마케팅", subcategories: ["디지털마케팅", "브랜딩", "고객개발", "성장해킹"] },
    { value: "투자", subcategories: ["벤처투자", "펀딩", "IPO", "M&A"] },
    { value: "기술", subcategories: ["AI", "블록체인", "클라우드", "데이터"] },
  ]

  const formats = ["종이책", "전자책", "오디오북"]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleDimensionChange = (dimension: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [dimension]: value },
    }))
  }

  const handleFormatToggle = (format: string) => {
    setFormData((prev) => ({
      ...prev,
      format: prev.format.includes(format) ? prev.format.filter((f) => f !== format) : [...prev.format, format],
    }))
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "도서명을 입력해주세요"
    if (!formData.author.trim()) newErrors.author = "저자를 입력해주세요"
    if (!formData.isbn.trim()) newErrors.isbn = "ISBN을 입력해주세요"
    if (formData.price <= 0) newErrors.price = "가격을 입력해주세요"
    if (!formData.category) newErrors.category = "카테고리를 선택해주세요"
    if (!formData.description.trim()) newErrors.description = "도서 설명을 입력해주세요"
    if (formData.pages <= 0) newErrors.pages = "페이지 수를 입력해주세요"
    if (!formData.publishDate) newErrors.publishDate = "출간일을 선택해주세요"
    if (formData.stock < 0) newErrors.stock = "재고는 0 이상이어야 합니다"
    if (formData.format.length === 0) newErrors.format = "도서 형태를 선택해주세요"

    // ISBN 형식 검증 (간단한 검증)
    if (formData.isbn && !/^[\d-]+$/.test(formData.isbn)) {
      newErrors.isbn = "올바른 ISBN 형식을 입력해주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // 실제 Supabase에 도서 추가
      const newBook = await addBook({
        title: formData.title,
        subtitle: formData.subtitle,
        author: formData.author,
        publisher: formData.publisher,
        isbn: formData.isbn,
        price: formData.price,
        discount_price: formData.discountPrice || formData.price,
        category: formData.category,
        subcategory: formData.subcategory,
        description: formData.description,
        table_of_contents: formData.tableOfContents,
        pages: formData.pages,
        publish_date: formData.publishDate,
        language: formData.language,
        format: formData.format,
        tags: formData.tags,
        status: formData.status,
        stock: formData.stock,
        weight: formData.weight,
        dimensions: formData.dimensions,
        cover_image: formData.cover || "/placeholder.svg?height=300&width=225",
        images: formData.images,
      })

      if (newBook) {
        console.log("새 도서 등록 완료:", newBook)
        // 성공 후 도서 목록으로 이동
        router.push("/admin/books?success=added")
      } else {
        throw new Error("도서 등록에 실패했습니다")
      }
    } catch (error) {
      console.error("Book creation error:", error)
      setErrors({ general: "도서 등록에 실패했습니다. 다시 시도해주세요." })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedCategory = categories.find((cat) => cat.value === formData.category)

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                뒤로가기
              </Button>
              <div>
                <h1 className="text-3xl font-bold">도서 추가</h1>
                <p className="text-gray-600">새로운 도서를 등록하세요</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-lg">
                {errors.general}
              </div>
            )}

            {/* 기본 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>기본 정보</CardTitle>
                <CardDescription>도서의 기본 정보를 입력하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      도서명 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className={errors.title ? "border-red-500" : ""}
                      placeholder="도서명을 입력하세요"
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subtitle">부제목</Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) => handleInputChange("subtitle", e.target.value)}
                      placeholder="부제목을 입력하세요"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="author">
                      저자 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange("author", e.target.value)}
                      className={errors.author ? "border-red-500" : ""}
                      placeholder="저자명을 입력하세요"
                    />
                    {errors.author && <p className="text-red-500 text-xs">{errors.author}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publisher">출판사</Label>
                    <Input
                      id="publisher"
                      value={formData.publisher}
                      onChange={(e) => handleInputChange("publisher", e.target.value)}
                      placeholder="출판사명을 입력하세요"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="isbn">
                      ISBN <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="isbn"
                      value={formData.isbn}
                      onChange={(e) => handleInputChange("isbn", e.target.value)}
                      className={errors.isbn ? "border-red-500" : ""}
                      placeholder="978-11-123456-78-9"
                    />
                    {errors.isbn && <p className="text-red-500 text-xs">{errors.isbn}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="publishDate">
                      출간일 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="publishDate"
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) => handleInputChange("publishDate", e.target.value)}
                      className={errors.publishDate ? "border-red-500" : ""}
                    />
                    {errors.publishDate && <p className="text-red-500 text-xs">{errors.publishDate}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 분류 및 가격 */}
            <Card>
              <CardHeader>
                <CardTitle>분류 및 가격</CardTitle>
                <CardDescription>도서의 분류와 가격 정보를 설정하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      카테고리 <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                        <SelectValue placeholder="카테고리를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subcategory">세부 카테고리</Label>
                    <Select
                      value={formData.subcategory}
                      onValueChange={(value) => handleInputChange("subcategory", value)}
                      disabled={!selectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="세부 카테고리를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory?.subcategories.map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      정가 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price || ""}
                      onChange={(e) => handleInputChange("price", Number.parseInt(e.target.value) || 0)}
                      className={errors.price ? "border-red-500" : ""}
                      placeholder="0"
                    />
                    {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountPrice">할인가</Label>
                    <Input
                      id="discountPrice"
                      type="number"
                      value={formData.discountPrice || ""}
                      onChange={(e) => handleInputChange("discountPrice", Number.parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">
                      재고 수량 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock || ""}
                      onChange={(e) => handleInputChange("stock", Number.parseInt(e.target.value) || 0)}
                      className={errors.stock ? "border-red-500" : ""}
                      placeholder="0"
                    />
                    {errors.stock && <p className="text-red-500 text-xs">{errors.stock}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 상세 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>상세 정보</CardTitle>
                <CardDescription>도서의 상세 정보를 입력하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">
                    도서 설명 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className={`min-h-32 ${errors.description ? "border-red-500" : ""}`}
                    placeholder="도서에 대한 상세한 설명을 입력하세요"
                  />
                  {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tableOfContents">목차</Label>
                  <Textarea
                    id="tableOfContents"
                    value={formData.tableOfContents}
                    onChange={(e) => handleInputChange("tableOfContents", e.target.value)}
                    className="min-h-32"
                    placeholder="목차를 입력하세요 (각 장을 줄바꿈으로 구분)"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pages">
                      페이지 수 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="pages"
                      type="number"
                      value={formData.pages || ""}
                      onChange={(e) => handleInputChange("pages", Number.parseInt(e.target.value) || 0)}
                      className={errors.pages ? "border-red-500" : ""}
                      placeholder="0"
                    />
                    {errors.pages && <p className="text-red-500 text-xs">{errors.pages}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">언어</Label>
                    <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="한국어">한국어</SelectItem>
                        <SelectItem value="영어">영어</SelectItem>
                        <SelectItem value="일본어">일본어</SelectItem>
                        <SelectItem value="중국어">중국어</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">무게 (g)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight || ""}
                      onChange={(e) => handleInputChange("weight", Number.parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>크기 (mm)</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="width" className="text-sm">
                        가로
                      </Label>
                      <Input
                        id="width"
                        type="number"
                        value={formData.dimensions.width || ""}
                        onChange={(e) => handleDimensionChange("width", Number.parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height" className="text-sm">
                        세로
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        value={formData.dimensions.height || ""}
                        onChange={(e) => handleDimensionChange("height", Number.parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="depth" className="text-sm">
                        두께
                      </Label>
                      <Input
                        id="depth"
                        type="number"
                        value={formData.dimensions.depth || ""}
                        onChange={(e) => handleDimensionChange("depth", Number.parseInt(e.target.value) || 0)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 형태 및 태그 */}
            <Card>
              <CardHeader>
                <CardTitle>형태 및 태그</CardTitle>
                <CardDescription>도서 형태와 검색 태그를 설정하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>
                    도서 형태 <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {formats.map((format) => (
                      <div key={format} className="flex items-center space-x-2">
                        <Checkbox
                          id={format}
                          checked={formData.format.includes(format)}
                          onCheckedChange={() => handleFormatToggle(format)}
                        />
                        <Label htmlFor={format} className="text-sm">
                          {format}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.format && <p className="text-red-500 text-xs">{errors.format}</p>}
                </div>

                <div className="space-y-4">
                  <Label>검색 태그</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="태그를 입력하세요"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                    />
                    <Button type="button" onClick={handleAddTag} variant="outline">
                      추가
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                          <span>{tag}</span>
                          <button type="button" onClick={() => handleRemoveTag(tag)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>상태</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">판매중</SelectItem>
                      <SelectItem value="inactive">판매중지</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* 이미지 업로드 */}
            <Card>
              <CardHeader>
                <CardTitle>이미지</CardTitle>
                <CardDescription>도서 표지와 추가 이미지를 업로드하세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>표지 이미지</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-2">클릭하거나 파일을 드래그하여 업로드</p>
                    <p className="text-sm text-gray-500">JPG, PNG 파일 (최대 5MB)</p>
                    <Button type="button" variant="outline" className="mt-4">
                      파일 선택
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>추가 이미지</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">책 내부, 뒷면 등 추가 이미지</p>
                    <Button type="button" variant="outline" size="sm" className="mt-2">
                      파일 선택
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 제출 버튼 */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                취소
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    등록 중...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    도서 등록
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
