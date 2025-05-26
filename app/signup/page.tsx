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

// 기존 사용자 데이터 (이메일 중복 체크용)
const EXISTING_USERS = ["kim@startup.com", "lee@startup.com", "park@startup.com", "test@test.com"]

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
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

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요"
    }

    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요"
    } else if (EXISTING_USERS.includes(formData.email.toLowerCase())) {
      newErrors.email = "이미 가입된 이메일입니다"
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요"
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다"
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "비밀번호는 영문과 숫자를 포함해야 합니다"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다"
    }

    if (formData.phone && !/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/.test(formData.phone)) {
      newErrors.phone = "올바른 휴대폰 번호를 입력해주세요"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "이용약관에 동의해주세요"
    }

    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = "개인정보처리방침에 동의해주세요"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const registerUser = async (userData: typeof formData) => {
    // 실제로는 서버에 사용자 등록 요청
    // 여기서는 시뮬레이션
    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      joinDate: new Date().toLocaleDateString("ko-KR").replace(/\./g, ".").slice(0, -1),
      isLoggedIn: true,
    }

    // 기존 사용자 목록에 추가 (실제로는 서버 DB에 저장)
    EXISTING_USERS.push(userData.email.toLowerCase())

    return newUser
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 사용자 등록
      const newUser = await registerUser(formData)

      // 자동 로그인
      localStorage.setItem("user", JSON.stringify(newUser))

      router.push("/signup/welcome")
    } catch (error) {
      setErrors({ general: "회원가입에 실패했습니다. 다시 시도해주세요." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAgreeAll = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      agreeTerms: checked,
      agreePrivacy: checked,
      agreeMarketing: checked,
    }))
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
              <Link href="/login" className="text-sm font-medium hover:underline">
                로그인
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
            <h1 className="text-4xl font-bold mb-4">회원가입</h1>
            <p className="text-gray-600">스타트업북스와 함께 성장하세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm rounded-lg">
                {errors.general}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                이름 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className={`h-12 ${errors.name ? "border-red-500" : ""}`}
                placeholder="이름을 입력하세요"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                이메일 <span className="text-red-500">*</span>
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
                비밀번호 <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`h-12 pr-10 ${errors.password ? "border-red-500" : ""}`}
                  placeholder="8자 이상, 영문+숫자 조합"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                비밀번호 확인 <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`h-12 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  placeholder="비밀번호를 다시 입력하세요"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                휴대폰 번호 (선택)
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className={`h-12 ${errors.phone ? "border-red-500" : ""}`}
                placeholder="010-1234-5678"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            {/* 약관 동의 */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeAll"
                  checked={formData.agreeTerms && formData.agreePrivacy && formData.agreeMarketing}
                  onCheckedChange={handleAgreeAll}
                />
                <Label htmlFor="agreeAll" className="text-sm font-medium">
                  전체 동의
                </Label>
              </div>

              <div className="space-y-3 ml-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="agreeTerms" className="text-sm">
                      이용약관 동의 <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <Link href="/terms" className="text-xs text-gray-500 hover:underline">
                    보기
                  </Link>
                </div>
                {errors.agreeTerms && <p className="text-red-500 text-xs ml-6">{errors.agreeTerms}</p>}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agreePrivacy"
                      checked={formData.agreePrivacy}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, agreePrivacy: checked as boolean }))
                      }
                    />
                    <Label htmlFor="agreePrivacy" className="text-sm">
                      개인정보처리방침 동의 <span className="text-red-500">*</span>
                    </Label>
                  </div>
                  <Link href="/privacy" className="text-xs text-gray-500 hover:underline">
                    보기
                  </Link>
                </div>
                {errors.agreePrivacy && <p className="text-red-500 text-xs ml-6">{errors.agreePrivacy}</p>}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, agreeMarketing: checked as boolean }))
                    }
                  />
                  <Label htmlFor="agreeMarketing" className="text-sm">
                    마케팅 정보 수신 동의 (선택)
                  </Label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-black text-white hover:bg-gray-800 text-sm font-bold uppercase tracking-wider"
            >
              {isLoading ? "가입 중..." : "회원가입"}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                이미 계정이 있으신가요?{" "}
                <Link href="/login" className="text-black font-medium hover:underline">
                  로그인
                </Link>
              </span>
            </div>
          </form>

          {/* Social Signup */}
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
                Google로 가입하기
              </Button>
              <Button type="button" variant="outline" className="w-full h-12 border-gray-300 hover:bg-gray-50">
                <Image src="/placeholder.svg?height=20&width=20" alt="Kakao" width={20} height={20} className="mr-2" />
                카카오로 가입하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
