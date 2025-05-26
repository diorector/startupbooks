import Image from "next/image"
import Link from "next/link"
import { Search, Menu, ShoppingBag, Star, TrendingUp, Brain, BookOpen, Clock, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RecommendationsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <button className="flex items-center">
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

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold">AI 맞춤 추천</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            당신의 독서 이력과 관심사를 분석하여 완벽한 다음 책을 추천해드립니다
          </p>
        </div>

        {/* Reading Profile Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12권</div>
              <p className="text-gray-600">읽은 책</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">린 스타트업</div>
              <p className="text-gray-600">선호 주제</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
              <p className="text-gray-600">평균 평점</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="ai-picks" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ai-picks">AI 추천</TabsTrigger>
            <TabsTrigger value="trending">인기 급상승</TabsTrigger>
            <TabsTrigger value="similar">비슷한 독자</TabsTrigger>
            <TabsTrigger value="history">독서 이력</TabsTrigger>
          </TabsList>

          <TabsContent value="ai-picks" className="mt-8">
            {/* AI Recommendation Explanation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-4">
                <Brain className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">AI 분석 결과</h3>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    당신은 <strong>린 스타트업 방법론</strong>과 <strong>성장 전략</strong>에 관심이 높으며, 실무적이고
                    구체적인 가이드를 선호하는 것으로 분석됩니다. 최근 <strong>조직 관리</strong>와{" "}
                    <strong>리더십</strong> 관련 도서에 대한 관심도 증가하고 있습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Top AI Recommendations */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">당신을 위한 최고의 추천</h2>

                <Card className="mb-6 border-2 border-blue-200 bg-blue-50/30">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-blue-600">AI 최고 추천</Badge>
                      <Badge variant="outline">97% 일치</Badge>
                    </div>
                    <CardTitle className="text-xl">하드씽: 어려운 일을 해내는 법</CardTitle>
                    <CardDescription>벤 호로위츠 저 | 스타트업북스</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <Image
                          src="/placeholder.svg?height=300&width=225"
                          alt="하드씽"
                          width={225}
                          height={300}
                          className="w-full"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">(4.9/5 · 156개 리뷰)</span>
                        </div>

                        <p className="text-gray-700 leading-relaxed">
                          실리콘밸리 최고의 벤처캐피털리스트가 전하는 창업과 경영의 현실적 조언. 어려운 결정을 내려야
                          하는 순간들을 어떻게 헤쳐나갈 것인가에 대한 실무 가이드입니다.
                        </p>

                        <div className="bg-white p-4 rounded-lg border">
                          <h4 className="font-semibold mb-2 text-blue-900">왜 이 책을 추천하나요?</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• 《린 스타트업 플레이북》을 높게 평가하신 분들이 선택한 책</li>
                            <li>• 실무적인 리더십과 의사결정에 관심을 보이신 독서 패턴</li>
                            <li>• 창업 경험담과 실전 사례를 선호하는 성향</li>
                          </ul>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">₩28,000</span>
                          <div className="space-x-2">
                            <Button variant="outline">미리보기</Button>
                            <Button className="bg-blue-600 hover:bg-blue-700">장바구니 추가</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* More AI Recommendations */}
              <div>
                <h3 className="text-xl font-bold mb-6">추가 맞춤 추천</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <Image
                          src="/placeholder.svg?height=160&width=120"
                          alt="OKR"
                          width={120}
                          height={160}
                          className="flex-shrink-0"
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              92% 일치
                            </Badge>
                            <Badge className="text-xs bg-purple-100 text-purple-800">조직 관리</Badge>
                          </div>
                          <h4 className="font-semibold">OKR: 전설적인 벤처투자자가 구글에 전해준 성공 방법</h4>
                          <p className="text-sm text-gray-600">존 도어 저</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">4.7/5</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            구글, 인텔이 사용하는 목표 관리 시스템. 조직 성과 향상에 관심을 보이신 패턴과 일치합니다.
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold">₩24,000</span>
                            <Button size="sm" variant="outline">
                              자세히 보기
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-green-200">
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <Image
                          src="/placeholder.svg?height=160&width=120"
                          alt="플랫폼 레볼루션"
                          width={120}
                          height={160}
                          className="flex-shrink-0"
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              89% 일치
                            </Badge>
                            <Badge className="text-xs bg-green-100 text-green-800">비즈니스 모델</Badge>
                          </div>
                          <h4 className="font-semibold">플랫폼 레볼루션</h4>
                          <p className="text-sm text-gray-600">제프리 파커, 마셜 반 알스타인 저</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">4.6/5</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            플랫폼 비즈니스의 모든 것. 스케일링에 관심을 보이신 독서 성향과 완벽하게 매치됩니다.
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold">₩26,000</span>
                            <Button size="sm" variant="outline">
                              자세히 보기
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Reading Goals */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">독서 목표 달성하기</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">이번 달 독서 목표</span>
                      <span className="text-sm text-gray-600">2/3권</span>
                    </div>
                    <Progress value={67} className="mb-4" />
                    <p className="text-sm text-gray-600">
                      목표까지 1권 남았습니다! 위의 추천 도서 중 하나를 선택해보세요.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">관심 분야 확장 제안</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>마케팅 전략</span>
                        <Badge variant="outline" className="text-xs">
                          새로운 분야
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>투자와 펀딩</span>
                        <Badge variant="outline" className="text-xs">
                          추천
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold">지금 가장 인기있는 책</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <Badge className="bg-red-600">🔥 급상승</Badge>
                      <Image
                        src="/placeholder.svg?height=240&width=180"
                        alt="디지털 트랜스포메이션"
                        width={180}
                        height={240}
                        className="mx-auto"
                      />
                      <h3 className="font-semibold">디지털 트랜스포메이션 실전 가이드</h3>
                      <p className="text-sm text-gray-600">김디지털 저</p>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700">
                        지난 주 대비 <strong className="text-green-600">+340%</strong> 판매 증가
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">₩31,000</span>
                        <Button size="sm">보기</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <Badge className="bg-orange-600">📈 인기</Badge>
                      <Image
                        src="/placeholder.svg?height=240&width=180"
                        alt="원격근무 혁명"
                        width={180}
                        height={240}
                        className="mx-auto"
                      />
                      <h3 className="font-semibold">원격근무 혁명</h3>
                      <p className="text-sm text-gray-600">박리모트 저</p>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700">
                        이번 달 <strong className="text-blue-600">2위</strong> 베스트셀러
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">₩27,000</span>
                        <Button size="sm">보기</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <Badge className="bg-purple-600">⭐ 화제</Badge>
                      <Image
                        src="/placeholder.svg?height=240&width=180"
                        alt="ESG 경영 전략"
                        width={180}
                        height={240}
                        className="mx-auto"
                      />
                      <h3 className="font-semibold">ESG 경영 전략</h3>
                      <p className="text-sm text-gray-600">이지속 저</p>
                      <div className="flex justify-center">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <p className="text-sm text-gray-700">
                        SNS에서 <strong className="text-purple-600">가장 많이</strong> 언급
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">₩29,000</span>
                        <Button size="sm">보기</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="similar" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Target className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold">비슷한 독자들이 선택한 책</h2>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-purple-900 mb-2">당신과 비슷한 독자 프로필</h3>
                <p className="text-purple-800 text-sm">
                  린 스타트업, 성장 전략, 조직 관리에 관심이 있는 창업자 및 스타트업 임직원들이 다음 책들을 함께
                  구매했습니다.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <Image
                        src="/placeholder.svg?height=160&width=120"
                        alt="팀 토폴로지"
                        width={120}
                        height={160}
                        className="flex-shrink-0"
                      />
                      <div className="flex-1 space-y-3">
                        <Badge variant="outline" className="text-xs">
                          함께 구매율 85%
                        </Badge>
                        <h4 className="font-semibold">팀 토폴로지</h4>
                        <p className="text-sm text-gray-600">매튜 스켈튼, 마누엘 파이스 저</p>
                        <p className="text-sm text-gray-700">
                          효과적인 소프트웨어 팀 구성과 상호작용 패턴에 대한 실무 가이드
                        </p>
                        <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                          "《스케일링 스타트업》을 구매한 독자의 85%가 함께 구매"
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">₩33,000</span>
                          <Button size="sm" variant="outline">
                            자세히 보기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <Image
                        src="/placeholder.svg?height=160&width=120"
                        alt="마이크로서비스 패턴"
                        width={120}
                        height={160}
                        className="flex-shrink-0"
                      />
                      <div className="flex-1 space-y-3">
                        <Badge variant="outline" className="text-xs">
                          함께 구매율 78%
                        </Badge>
                        <h4 className="font-semibold">마이크로서비스 패턴</h4>
                        <p className="text-sm text-gray-600">크리스 리처드슨 저</p>
                        <p className="text-sm text-gray-700">확장 가능한 마이크로서비스 아키텍처 설계와 구현 방법</p>
                        <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
                          "기술 창업자들이 가장 많이 선택한 기술서"
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold">₩35,000</span>
                          <Button size="sm" variant="outline">
                            자세히 보기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Clock className="h-6 w-6 text-gray-600" />
                <h2 className="text-2xl font-bold">나의 독서 이력</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold">12권</div>
                    <p className="text-sm text-gray-600">총 읽은 책</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <div className="text-2xl font-bold">4.8</div>
                    <p className="text-sm text-gray-600">평균 평점</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold">3권</div>
                    <p className="text-sm text-gray-600">이번 달</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">최근 읽은 책</h3>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src="/placeholder.svg?height=80&width=60"
                          alt="린 스타트업 플레이북"
                          width={60}
                          height={80}
                          className="flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">린 스타트업 플레이북</h4>
                          <p className="text-sm text-gray-600">에릭 리스, 스티브 블랭크 저</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">내 평점: 5.0</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-2">완독</Badge>
                          <p className="text-xs text-gray-600">2024.01.15</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src="/placeholder.svg?height=80&width=60"
                          alt="스케일링 스타트업"
                          width={60}
                          height={80}
                          className="flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">스케일링 스타트업</h4>
                          <p className="text-sm text-gray-600">리드 호프만, 크리스 예 저</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">내 평점: 4.8</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-2">
                            읽는 중
                          </Badge>
                          <p className="text-xs text-gray-600">진행률: 78%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src="/placeholder.svg?height=80&width=60"
                          alt="창업자의 마인드셋"
                          width={60}
                          height={80}
                          className="flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">창업자의 마인드셋</h4>
                          <p className="text-sm text-gray-600">캐롤 드웩, 앤젤라 더크워스 저</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="flex">
                              {[1, 2, 3, 4].map((star) => (
                                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                              <Star className="h-3 w-3 text-gray-300" />
                            </div>
                            <span className="text-xs text-gray-600">내 평점: 4.5</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-2">완독</Badge>
                          <p className="text-xs text-gray-600">2023.12.28</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
