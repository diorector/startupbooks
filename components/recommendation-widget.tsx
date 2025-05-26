import Image from "next/image"
import Link from "next/link"
import { Brain, Star, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecommendationWidget() {
  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg">AI 맞춤 추천</CardTitle>
        </div>
        <CardDescription>당신의 독서 패턴을 분석한 추천 도서</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Image
            src="/placeholder.svg?height=120&width=90"
            alt="하드씽"
            width={90}
            height={120}
            className="flex-shrink-0 rounded"
          />
          <div className="flex-1 space-y-2">
            <Badge className="text-xs bg-blue-600">97% 일치</Badge>
            <h4 className="font-semibold">하드씽: 어려운 일을 해내는 법</h4>
            <p className="text-sm text-gray-600">벤 호로위츠 저</p>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-xs text-gray-600 ml-1">4.9/5</span>
            </div>
            <p className="text-xs text-gray-700">실리콘밸리 최고의 VC가 전하는 창업과 경영의 현실적 조언</p>
          </div>
        </div>

        <div className="bg-white p-3 rounded border text-xs text-gray-700">
          <strong>추천 이유:</strong> 린 스타트업과 리더십에 관심을 보이신 독서 패턴과 97% 일치
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold">₩28,000</span>
          <div className="space-x-2">
            <Button size="sm" variant="outline">
              장바구니
            </Button>
            <Link href="/recommendations">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                더 많은 추천
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
