"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Menu, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// 더미 사용자 데이터베이스
const DUMMY_USERS = [
  {
    id: "1",
    email: "kim@startup.com",
    password: "password123",
    name: "김창업",
    phone: "010-1234-5678",
    joinDate: "2024.01.15",
  },
  {
    id: "2",
    email: "lee@startup.com",
    password: "startup2024",
    name: "이스타트",
    phone: "010-9876-5432",
    joinDate: "2024.01.10",
  },
  {
    id: "3",
    email: "park@startup.com",
    password: "business123",
    name: "박비즈니스",
    phone: "010-5555-1234",
    joinDate: "2024.01.05",
  },
  {
    id: "4",
    email: "test@test.com",
    password: "test123",
    name: "테스트유저",
    phone: "010-0000-0000",
    joinDate: "2024.01.01",
  },
  {
    id: "admin",
    email: "admin@startup.com",
    password: "admin123",
    name: "관리자",
    phone: "010-0000-0001",
    joinDate: "2023.12.01",
  },
]

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요"
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요"
    } else if (formData.password.length < 6) {
      newErrors.password = "비밀번호는 6자 이상이어야 합니다"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const authenticateUser = (email: string, password: string) => {
    // 더미 데이터베이스에서 사용자 찾기
    const user = DUMMY_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    return user || null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // 로그인 처리 시뮬레이션 (1초 대기)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 사용자 인증
      const authenticatedUser = authenticateUser(formData.email, formData.password)

      if (!authenticatedUser) {
        setErrors({
          general: "이메일 또는 비밀번호가 올바르지 않습니다.",
        })
        return
      }

      // 로그인 성공 - 사용자 정보 저장
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: authenticatedUser.id,
          email: authenticatedUser.email,
          name: authenticatedUser.name,
          phone: authenticatedUser.phone,
          joinDate: authenticatedUser.joinDate,
          isLoggedIn: true,
        }),
      )

      // 관리자 계정인 경우 관리자 페이지로 리다이렉트
      if (authenticatedUser.email === "admin@startup.com") {
        router.push("/admin")
        return
      }

      // URL에서 redirect 파라미터 확인
      const urlParams = new URLSearchParams(window.location.search)
      const redirectTo = urlParams.get("redirect") || "/"

      router.push(redirectTo)
    } catch (error) {
      setErrors({ general: "로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 text-sm font-medium">
              <Menu className="h-5 w-5" />
              <span className="ml-2">메뉴</span>
            </div>

            <Link href="/" className="text-2xl font-bold tracking-tight">
              STARTUPBOOKS
            </Link>

            <div className="flex items-center space-x-6">
              <Search className="h-5 w-5 cursor-pointer" />
              <Link href="/signup" className="text-sm font-medium hover:underline">
                회원가입
              </Link>
              <div className="relative">
                <span className="text-sm font-medium">장바구니</span>
                <div className="absolute -top-2 -right-4 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">로그인</h1>
            <p className="text-gray-600">스타트업북스에 오신 것을 환영합니다</p>
          </div>

          {/* 테스트 계정 안내 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">테스트 계정</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <strong>일반 사용자:</strong> kim@startup.com / password123
              </p>
              <p>
                <strong>관리자:</strong> admin@startup.com / admin123
              </p>
              <hr className="my-2 border-blue-200" />
              <p>
                <strong>기타:</strong> test@test.com / test123
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-lg">
                {errors.general}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                이메일
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`h-12 ${errors.email ? "border-red-500" : ""}`}
                placeholder="이메일을 입력하세요"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                비밀번호
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`h-12 pr-10 ${errors.password ? "border-red-500" : ""}`}
                  placeholder="비밀번호를 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                />
                <Label htmlFor="rememberMe" className="text-sm text-gray-600">
                  로그인 상태 유지
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-black hover:underline">
                비밀번호 찾기
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-black text-white hover:bg-gray-800 text-sm font-bold uppercase tracking-wider"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                아직 계정이 없으신가요?{" "}
                <Link href="/signup" className="text-black font-medium hover:underline">
                  회원가입
                </Link>
              </span>
            </div>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button type="button" variant="outline" className="w-full h-12 border-gray-300 hover:bg-gray-50">
                <Image src="/placeholder.svg?height=20&width=20" alt="Google" width={20} height={20} className="mr-2" />
                Google로 로그인
              </Button>
              <Button type="button" variant="outline" className="w-full h-12 border-gray-300 hover:bg-gray-50">
                <Image src="/placeholder.svg?height=20&width=20" alt="Kakao" width={20} height={20} className="mr-2" />
                카카오로 로그인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
