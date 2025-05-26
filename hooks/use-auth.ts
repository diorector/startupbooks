"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  name: string
  email: string
  isLoggedIn: boolean
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem("user")
        if (userData) {
          const parsedUser = JSON.parse(userData)
          if (parsedUser.isLoggedIn) {
            setUser(parsedUser)
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        localStorage.removeItem("user")
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
  }, [])

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  const requireAuth = (redirectTo = "/login") => {
    if (!isLoading && !user) {
      const currentPath = window.location.pathname
      router.push(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`)
      return false
    }
    return true
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    requireAuth,
  }
}
