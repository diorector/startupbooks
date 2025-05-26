import Image from "next/image"
import Link from "next/link"
import { Search, Menu, Play } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ScalingStartupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 text-sm font-medium">
              <Menu className="h-5 w-5" />
              <span className="ml-2">메뉴</span>
              <span className="text-gray-400">/</span>
              <Link href="/books" className="hover:underline">
                도서
              </Link>
              <span className="text-gray-400">/</span>
              <span>스타트업</span>
            </div>

            <Link href="/" className="text-2xl font-bold tracking-tight">
              STARTUPBOOKS
            </Link>

            <div className="flex items-center space-x-6">
              <Search className="h-5 w-5 cursor-pointer" />
              <Link href="/login" className="text-sm font-medium">
                로그인 / 회원가입
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
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Left Column - Product Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                스케일링
                <br />
                스타트업
              </h1>

              <div className="space-y-2">
                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-bold">₩32,000</span>
                  <span className="text-xl text-gray-600 line-through">₩38,000</span>
                  <span className="text-sm bg-red-600 text-white px-2 py-1">16% 할인</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm bg-black text-white px-2 py-1">회원 추가 10% 할인</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-8">
              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-2">도서 정보</h3>
                <div className="space-y-3 text-sm leading-relaxed">
                  <p>
                    링크드인 창업자 리드 호프만이 전하는 초고속 성장의 비밀. 아이디어에서 IPO까지, 지속 가능한 성장의
                    모든 것을 담은 블리츠스케일링 완전 가이드.
                  </p>
                  <div className="space-y-1 text-gray-600">
                    <p>저자: 리드 호프만, 크리스 예</p>
                    <p>출판사: 스타트업북스</p>
                    <p>페이지: 456쪽</p>
                    <p>출간일: 2023년 11월 20일</p>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Play className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600 font-medium">오디오북 포함</span>
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-2">수량</h3>
                  <div className="flex space-x-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        className={`w-8 h-8 text-sm font-medium border border-gray-300 hover:bg-black hover:text-white transition-colors ${
                          num === 1 ? "bg-black text-white" : ""
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <Button className="w-full h-12 bg-black text-white hover:bg-gray-800 text-sm font-bold uppercase tracking-wider">
                  장바구니에 추가
                </Button>

                <div className="text-xs text-gray-600 space-y-1">
                  <p>• 무료 배송 (2만원 이상 주문시)</p>
                  <p>• 평일 오후 2시 이전 주문시 당일 발송</p>
                  <p>• 7일 무료 반품/교환</p>
                  <p>• 오디오북은 구매 즉시 다운로드 가능</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <Image
                src="/placeholder.svg?height=600&width=450"
                alt="스케일링 스타트업"
                width={450}
                height={600}
                className="w-full shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Additional Product Images */}
        <div className="max-w-7xl mx-auto mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Image
              src="/placeholder.svg?height=300&width=225"
              alt="책 표지"
              width={225}
              height={300}
              className="w-full border border-gray-200"
            />
            <Image
              src="/placeholder.svg?height=300&width=225"
              alt="책 뒷면"
              width={225}
              height={300}
              className="w-full border border-gray-200"
            />
            <Image
              src="/placeholder.svg?height=300&width=225"
              alt="오디오북 커버"
              width={225}
              height={300}
              className="w-full border border-gray-200"
            />
            <Image
              src="/placeholder.svg?height=300&width=225"
              alt="책 내부"
              width={225}
              height={300}
              className="w-full border border-gray-200"
            />
          </div>
        </div>

        {/* Detailed Description */}
        <div className="max-w-4xl mx-auto mt-20 space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">상세 설명</h2>
            <div className="prose prose-lg max-w-none leading-relaxed">
              <p>
                《스케일링 스타트업》은 링크드인 창업자 리드 호프만이 전하는 초고속 성장의 비밀입니다. 이 책은 단순한
                성장이 아닌, 시장을 지배하는 압도적 성장을 위한 전략과 실행법을 담고 있습니다.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">블리츠스케일링이란?</h3>
              <p>
                블리츠스케일링은 불확실성을 감수하면서도 시장 선점을 위해 빠르게 확장하는 전략입니다. 아마존, 페이스북,
                구글 등 글로벌 테크 기업들이 사용한 성장 방법론을 체계화했습니다.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">이 책에서 배울 수 있는 것</h3>
              <ul className="space-y-2">
                <li>• 5단계 스케일링 프레임워크</li>
                <li>• 성장 단계별 조직 관리법</li>
                <li>• 글로벌 확장 전략</li>
                <li>• 투자 유치와 자금 조달</li>
                <li>• 경쟁사 대응 전략</li>
                <li>• 플랫폼 비즈니스 모델 설계</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="max-w-7xl mx-auto mt-20">
          <h2 className="text-2xl font-bold mb-8">관련 도서</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "린 스타트업 플레이북", price: "₩29,000" },
              { title: "창업자의 마인드셋", price: "₩26,000" },
              { title: "제로 투 원", price: "₩18,000" },
              { title: "혁신과 전략", price: "₩35,000" },
            ].map((book, index) => (
              <div key={index} className="group cursor-pointer">
                <Image
                  src="/placeholder.svg?height=300&width=225"
                  alt={book.title}
                  width={225}
                  height={300}
                  className="w-full mb-4 transition-transform group-hover:scale-105"
                />
                <h3 className="font-semibold mb-2">{book.title}</h3>
                <p className="font-bold">{book.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
