"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("이메일을 입력해주세요")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (error) {
      setError("오류가 발생했습니다. 다시 시도해주세요.")
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
          <div className="mb-8">
            <Link href="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-black mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              로그인으로 돌아가기
            </Link>
          </div>

          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">비밀번호 찾기</h1>
                <p className="text-gray-600">
                  가입하신 이메일 주소를 입력하시면
                  <br />
                  비밀번호 재설정 링크를 보내드립니다
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">{error}</div>}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    이메일
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                    placeholder="가입하신 이메일을 입력하세요"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-black text-white hover:bg-gray-800 text-sm font-bold uppercase tracking-wider"
                >
                  {isLoading ? "전송 중..." : "재설정 링크 보내기"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4">이메일을 확인하세요</h1>
              <p className="text-gray-600 mb-8">
                <strong>{email}</strong>로
                <br />
                비밀번호 재설정 링크를 보내드렸습니다
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">이메일이 오지 않았나요? 스팸 폴더를 확인해보세요</p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="w-full h-12 border-gray-300 hover:bg-gray-50"
                >
                  다른 이메일로 다시 시도
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
