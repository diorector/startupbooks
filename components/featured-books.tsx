"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { getAllBooks, type Book } from "@/lib/book-storage"

export default function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const loadBooks = async () => {
      try {
        // Supabase에서 실제 데이터 로드
        const allBooks = await getAllBooks()
        // 활성 상태인 책들만 필터링하고 최대 3개만 표시
        const activeBooks = allBooks.filter((book) => book.status === "active").slice(0, 3)
        setBooks(activeBooks)
      } catch (error) {
        console.error("Failed to load featured books:", error)
      }
    }

    loadBooks()
  }, [])

  if (books.length === 0) {
    // 로딩 중이거나 책이 없을 때 기본 표시
    return (
      <section className="py-20 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">추천 도서</h2>
            <p className="text-gray-600">스타트업 창업자를 위한 필수 도서들</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group animate-pulse">
                <div className="mb-6">
                  <div className="w-full h-96 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">추천 도서</h2>
          <p className="text-gray-600">스타트업 창업자를 위한 필수 도서들</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {books.map((book, index) => (
            <div key={book.id} className="group">
              <div className="mb-6">
                <Image
                  src={book.cover || "/placeholder.svg?height=500&width=350"}
                  alt={book.title}
                  width={350}
                  height={500}
                  className="w-full transition-transform group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <Badge
                  variant={index === 0 ? "secondary" : index === 1 ? "outline" : "default"}
                  className={`text-xs ${index === 0 ? "" : index === 1 ? "" : "bg-red-100 text-red-800"}`}
                >
                  {index === 0 ? "베스트셀러" : index === 1 ? "에디터 추천" : "신간"}
                </Badge>
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-gray-600 text-sm">{book.author}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-lg font-bold">₩{book.price.toLocaleString()}</p>
                  {book.discountPrice && book.discountPrice < book.price && (
                    <p className="text-sm text-gray-500 line-through">₩{book.discountPrice.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
