"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Menu, ShoppingBag, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import RecommendationWidget from "@/components/recommendation-widget"
import FeaturedBooks from "@/components/featured-books"

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button className="flex items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
              <span className="ml-2 text-sm font-medium">메뉴</span>
            </button>

            <Link href="/" className="text-2xl font-bold tracking-tight">
              STARTUPBOOKS
            </Link>

            <div className="flex items-center space-x-6">
              <Search className="h-5 w-5 cursor-pointer" />
              <Link href="/login" className="text-sm font-medium">
                로그인 / 회원가입
              </Link>
              <div className="relative">
                <ShoppingBag className="h-5 w-5 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              <Link
                href="/"
                className="block text-sm font-medium hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                홈
              </Link>
              <Link
                href="/books"
                className="block text-sm font-medium hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                전체 도서
              </Link>
              <Link
                href="/recommendations"
                className="block text-sm font-medium hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                AI 추천
              </Link>
              <Link
                href="/categories/startup"
                className="block text-sm font-medium hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                스타트업
              </Link>
              <Link
                href="/categories/business"
                className="block text-sm font-medium hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                비즈니스
              </Link>
              <Link
                href="/categories/self-development"
                className="block text-sm font-medium hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                자기계발
              </Link>
              <div className="border-t border-gray-200 pt-4">
                <Link
                  href="/login"
                  className="block text-sm font-medium text-blue-600 hover:text-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  로그인 / 회원가입
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-xs">
                  신간 출시
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  린 스타트업
                  <br />
                  플레이북
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  성공적인 스타트업을 구축하기 위한
                  <br />린 방법론의 완전한 가이드
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">₩29,000</span>
                <Button className="bg-black text-white hover:bg-gray-800 px-8">장바구니에 추가</Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="린 스타트업 플레이북"
                width={400}
                height={600}
                className="shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books - 실제 데이터 사용 */}
      <FeaturedBooks />

      {/* Curated Collections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">큐레이션 컬렉션</h2>
            <p className="text-gray-600">전문가가 선별한 주제별 도서 모음</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">혁신과 전략</h3>
                <p className="text-gray-600 mb-8">비즈니스 사고를 혁신하는 필수 도서들</p>
              </div>

              <div className="space-y-6">
                <div className="flex space-x-4 p-4 bg-white rounded-lg">
                  <Image
                    src="/placeholder.svg?height=120&width=80"
                    alt="제로 투 원"
                    width={80}
                    height={120}
                    className="flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">제로 투 원</h4>
                    <p className="text-sm text-gray-600 mb-2">피터 틸</p>
                    <p className="text-sm text-gray-500 mb-3">독점을 통한 혁신 창조의 비밀</p>
                    <p className="font-bold">₩18,000</p>
                  </div>
                </div>

                <div className="flex space-x-4 p-4 bg-white rounded-lg">
                  <Image
                    src="/placeholder.svg?height=120&width=80"
                    alt="이노베이터의 딜레마"
                    width={80}
                    height={120}
                    className="flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">이노베이터의 딜레마</h4>
                    <p className="text-sm text-gray-600 mb-2">클레이튼 크리스텐슨</p>
                    <p className="text-sm text-gray-500 mb-3">파괴적 혁신의 원리와 실제</p>
                    <p className="font-bold">₩22,000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">성장과 스케일링</h3>
                <p className="text-gray-600 mb-8">지속 가능한 비즈니스 성장의 마스터</p>
              </div>

              <div className="space-y-6">
                <div className="flex space-x-4 p-4 bg-white rounded-lg">
                  <Image
                    src="/placeholder.svg?height=120&width=80"
                    alt="블리츠스케일링"
                    width={80}
                    height={120}
                    className="flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">블리츠스케일링</h4>
                    <p className="text-sm text-gray-600 mb-2">리드 호프만</p>
                    <p className="text-sm text-gray-500 mb-3">번개처럼 빠른 성장의 비밀</p>
                    <p className="font-bold">₩25,000</p>
                  </div>
                </div>

                <div className="flex space-x-4 p-4 bg-white rounded-lg">
                  <Image
                    src="/placeholder.svg?height=120&width=80"
                    alt="캐즘 마케팅"
                    width={80}
                    height={120}
                    className="flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">캐즘 마케팅</h4>
                    <p className="text-sm text-gray-600 mb-2">제프리 무어</p>
                    <p className="text-sm text-gray-500 mb-3">하이테크 마케팅의 바이블</p>
                    <p className="font-bold">₩20,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">AI 맞춤 추천</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                당신의 독서 이력을 분석하여 완벽한 다음 책을 추천해드립니다.
              </p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto">
            <RecommendationWidget />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <h2 className="text-2xl font-bold">뉴스레터 구독</h2>
            <p className="text-gray-600">
              최신 도서 추천과 스타트업 인사이트를
              <br />
              이메일로 받아보세요
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:border-black"
              />
              <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-none py-3">
                구독하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">개인정보를 보호합니다. 언제든지 구독을 취소할 수 있습니다.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">STARTUPBOOKS</h3>
              <p className="text-sm text-gray-600">
                스타트업 창업자를 위한
                <br />
                전문 도서 출판사
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">고객 서비스</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-black">
                    주문 조회
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    배송 정보
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    반품/교환
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    고객 지원
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">회사 정보</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-black">
                    회사 소개
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    채용 정보
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    파트너십
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    언론 보도
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">법적 고지</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-black">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    쿠키 정책
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">© 2024 STARTUPBOOKS. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
