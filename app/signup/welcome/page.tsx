import Link from "next/link"
import { Search, Menu, Check } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function WelcomePage() {
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
              <span className="text-sm font-medium">김창업님</span>
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
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">환영합니다!</h1>
            <p className="text-xl text-gray-600 mb-2">스타트업북스 회원가입이 완료되었습니다</p>
            <p className="text-gray-500">이제 맞춤형 도서 추천과 다양한 혜택을 받아보세요</p>
          </div>

          <div className="bg-white rounded-lg p-8 mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">회원 혜택</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">모든 도서 10% 할인</h3>
                  <p className="text-sm text-gray-600">회원 전용 할인가로 더 저렴하게</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">AI 맞춤 추천</h3>
                  <p className="text-sm text-gray-600">독서 이력 기반 개인화된 도서 추천</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">무료 배송</h3>
                  <p className="text-sm text-gray-600">2만원 이상 주문시 무료 배송</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium">신간 알림</h3>
                  <p className="text-sm text-gray-600">관심 분야 신간 도서 우선 알림</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/">
              <Button className="w-full h-12 bg-black text-white hover:bg-gray-800 text-sm font-bold uppercase tracking-wider">
                쇼핑 시작하기
              </Button>
            </Link>
            <Link href="/recommendations">
              <Button variant="outline" className="w-full h-12 border-gray-300 hover:bg-gray-50">
                AI 추천 도서 보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
