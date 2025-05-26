import Image from "next/image"
import Link from "next/link"
import { Search, Menu, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function FoundersMindsetPage() {
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
              <span>심리학</span>
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
                창업자의
                <br />
                마인드셋
              </h1>

              <div className="space-y-2">
                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-bold">₩26,000</span>
                  <span className="text-xl text-gray-600">₩23,400</span>
                  <span className="text-sm bg-black text-white px-2 py-1">회원 10% 할인</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-8">
              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 pb-2">도서 정보</h3>
                <div className="space-y-3 text-sm leading-relaxed">
                  <p>
                    성공하는 기업가들의 사고방식과 행동 패턴을 분석한 심리학 기반의 실용서. 성장 마인드셋의 힘을
                    과학적으로 증명하고 실전 적용법을 제시합니다.
                  </p>
                  <div className="space-y-1 text-gray-600">
                    <p>저자: 캐롤 드웩, 앤젤라 더크워스</p>
                    <p>출판사: 스타트업북스</p>
                    <p>페이지: 312쪽</p>
                    <p>출간일: 2023년 9월 10일</p>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <BookOpen className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-600 font-medium">전자책 포함</span>
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
                  <p>• 전자책은 구매 즉시 다운로드 가능</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <Image
                src="/placeholder.svg?height=600&width=450"
                alt="창업자의 마인드셋"
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
              alt="전자책 화면"
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
                《창업자의 마인드셋》은 성공하는 기업가들의 사고방식과 행동 패턴을 분석한 심리학 기반의 실용서입니다.
                스탠포드 대학교의 캐롤 드웩 교수와 펜실베이니아 대학교의 앤젤라 더크워스 교수가 수년간의 연구를 통해
                밝혀낸 성공하는 창업자들의 공통된 특징을 담았습니다.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">성장 마인드셋의 힘</h3>
              <p>
                이 책의 핵심은 '성장 마인드셋(Growth Mindset)'입니다. 실패를 학습의 기회로 보고, 도전을 성장의 발판으로
                삼는 사고방식이 창업 성공의 핵심 요소라는 것을 과학적으로 증명합니다.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">이 책에서 배울 수 있는 것</h3>
              <ul className="space-y-2">
                <li>• 성장 마인드셋 vs 고정 마인드셋의 차이점</li>
                <li>• 실패를 성공으로 전환하는 사고법</li>
                <li>• 지속적인 학습과 적응 능력 기르기</li>
                <li>• 스트레스와 불확실성 관리법</li>
                <li>• 팀과 조직의 마인드셋 변화 이끌기</li>
                <li>• 장기적 비전과 단기적 실행의 균형</li>
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
              { title: "스케일링 스타트업", price: "₩32,000" },
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
