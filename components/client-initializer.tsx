"use client"

import { useEffect } from "react"
import { initializeBooks } from "@/lib/book-storage"

export default function ClientInitializer() {
  useEffect(() => {
    // 클라이언트 사이드에서 도서 데이터 초기화
    initializeBooks()
  }, [])

  return null
}
