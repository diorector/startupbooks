import Image from "next/image"
import Link from "next/link"
import { Search, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LeanStartupPlaybookPage() {
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
                린 스타트업
                <br />
                플레이북
              </h1>

              <div className="space-y-2">
                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-bold">₩29,000</span>
                  <span className="text-xl text-gray-600">₩26,100</span>
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
                    에릭 리스와 스티브 블랭크가 전하는 린 스타트업 방법론의 완전한 실무 가이드. 성공적인 스타트업을
                    구축하기 위한 체계적인 접근법을 제시합니다.
                  </p>
                  <div className="space-y-1 text-gray-600">
                    <p>저자: 에릭 리스, 스티브 블랭크</p>
                    <p>출판사: 스타트업북스</p>
                    <p>페이지: 384쪽</p>
                    <p>출간일: 2024년 1월 15일</p>
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
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <Image
                src="/placeholder.svg?height=600&width=450"
                alt="린 스타트업 플레이북"
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
              alt="책 내부 1"
              width={225}
              height={300}
              className="w-full border border-gray-200"
            />
            <Image
              src="/placeholder.svg?height=300&width=225"
              alt="책 내부 2"
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
                《린 스타트업 플레이북》은 에릭 리스의 혁신적인 린 스타트업 방법론을 실무에 바로 적용할 수 있도록 구성된
                완전한 가이드북입니다. 이 책은 아이디어 검증부터 제품 출시, 그리고 지속 가능한 성장까지 스타트업의 전
                과정을 체계적으로 다룹니다.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-4">주요 내용</h3>
              <ul className="space-y-2">
                <li>• 실제 사례를 통한 린 스타트업 방법론의 실무 적용법</li>
                <li>• MVP(최소 실행 가능 제품) 개발과 검증 프로세스</li>
                <li>• 고객 개발과 시장 적합성 찾기</li>
                <li>• 데이터 기반 의사결정과 피벗 전략</li>
                <li>• 지속 가능한 성장 엔진 구축법</li>
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">저자 소개</h3>
              <p>
                <strong>에릭 리스</strong>는 실리콘밸리의 전설적인 기업가이자 《린 스타트업》의 저자입니다. 하버드
                비즈니스 스쿨에서 기업가정신을 가르치며, 전 세계 수많은 스타트업과 대기업의 혁신 컨설턴트로 활동하고
                있습니다.
              </p>
              <p>
                <strong>스티브 블랭크</strong>는 스탠포드 대학교와 UC 버클리에서 기업가정신을 가르치는 교수이자 연쇄
                창업가입니다. 고객 개발(Customer Development) 방법론을 창시했으며, 실리콘밸리에서 8개의 스타트업을
                창업한 경험을 바탕으로 실무적인 인사이트를 제공합니다.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">목차</h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">PART 1. 린 스타트업의 기초</h4>
                  <ul className="space-y-1 text-gray-600 ml-4">
                    <li>Chapter 1. 린 스타트업이란 무엇인가</li>
                    <li>Chapter 2. 가설 설정과 검증</li>
                    <li>Chapter 3. 고객 개발의 중요성</li>
                    <li>Chapter 4. MVP의 개념과 설계</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">PART 2. 제품-시장 적합성 찾기</h4>
                  <ul className="space-y-1 text-gray-600 ml-4">
                    <li>Chapter 5. 시장 조사와 고객 인터뷰</li>
                    <li>Chapter 6. 프로토타입 제작과 테스트</li>
                    <li>Chapter 7. 피드백 수집과 분석</li>
                    <li>Chapter 8. 피벗 vs 지속 결정하기</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">PART 3. 성장과 확장</h4>
                  <ul className="space-y-1 text-gray-600 ml-4">
                    <li>Chapter 9. 성장 엔진의 종류와 선택</li>
                    <li>Chapter 10. 지표 설정과 추적</li>
                    <li>Chapter 11. A/B 테스트와 최적화</li>
                    <li>Chapter 12. 조직 확장과 문화 구축</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">PART 4. 실전 사례와 도구</h4>
                  <ul className="space-y-1 text-gray-600 ml-4">
                    <li>Chapter 13. 성공 사례 분석</li>
                    <li>Chapter 14. 실패 사례에서 배우는 교훈</li>
                    <li>Chapter 15. 린 스타트업 도구와 템플릿</li>
                    <li>Chapter 16. 미래의 린 스타트업</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="max-w-7xl mx-auto mt-20">
          <h2 className="text-2xl font-bold mb-8">관련 도서</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "스케일링 스타트업", price: "₩32,000" },
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
