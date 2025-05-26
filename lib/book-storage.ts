import { createClient } from "@supabase/supabase-js"

// Supabase 클라이언트 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Book {
  id: string
  title: string
  subtitle?: string
  author: string
  publisher: string
  isbn: string
  price: number
  discount_price?: number
  category: string
  subcategory?: string
  description: string
  table_of_contents?: string
  pages: number
  publish_date: string
  language: string
  format: string[]
  tags: string[]
  status: "active" | "inactive"
  stock: number
  weight?: number
  dimensions?: {
    width: number
    height: number
    depth: number
  }
  cover_image?: string
  images?: string[]
  sales: number
  created_at: string
  updated_at: string
}

// 모든 도서 가져오기
export async function getAllBooks(): Promise<Book[]> {
  try {
    const { data, error } = await supabase.from("books").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Failed to fetch books:", error)
    return []
  }
}

// 도서 추가
export async function addBook(
  bookData: Omit<Book, "id" | "sales" | "created_at" | "updated_at">,
): Promise<Book | null> {
  try {
    const { data, error } = await supabase
      .from("books")
      .insert([
        {
          ...bookData,
          sales: 0,
        },
      ])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Failed to add book:", error)
    return null
  }
}

// 도서 업데이트
export async function updateBook(id: string, updates: Partial<Book>): Promise<Book | null> {
  try {
    const { data, error } = await supabase.from("books").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Failed to update book:", error)
    return null
  }
}

// 도서 삭제
export async function deleteBook(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("books").delete().eq("id", id)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Failed to delete book:", error)
    return false
  }
}

// ID로 도서 찾기
export async function getBookById(id: string): Promise<Book | null> {
  try {
    const { data, error } = await supabase.from("books").select("*").eq("id", id).single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Failed to fetch book:", error)
    return null
  }
}

// 카테고리별 도서 가져오기
export async function getBooksByCategory(category: string): Promise<Book[]> {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("category", category)
      .eq("status", "active")
      .order("sales", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Failed to fetch books by category:", error)
    return []
  }
}

// 검색
export async function searchBooks(query: string): Promise<Book[]> {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("status", "active")
      .or(`title.ilike.%${query}%,author.ilike.%${query}%`)
      .order("sales", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Failed to search books:", error)
    return []
  }
}

// 베스트셀러 가져오기
export async function getBestSellers(limit = 10): Promise<Book[]> {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("status", "active")
      .order("sales", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Failed to fetch bestsellers:", error)
    return []
  }
}

// 신간 도서 가져오기
export async function getNewBooks(limit = 10): Promise<Book[]> {
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Failed to fetch new books:", error)
    return []
  }
}

// 더미 함수들 (호환성 유지)
export function initializeBooks(): void {
  // Supabase에서는 필요 없음
}
