"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ children, redirectTo = "/login" }: ProtectedRouteProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("user")

      if (!userData) {
        const currentPath = window.location.pathname
        router.push(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`)
        return
      }

      try {
        const user = JSON.parse(userData)
        if (!user.isLoggedIn) {
          const currentPath = window.location.pathname
          router.push(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`)
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        console.error("Invalid user data:", error)
        localStorage.removeItem("user")
        const currentPath = window.location.pathname
        router.push(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // 로그인 상태 변화 감지
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user") {
        checkAuth()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [router, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // 리다이렉트 중
  }

  return <>{children}</>
}
