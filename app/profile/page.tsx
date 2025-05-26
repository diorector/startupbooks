"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Edit3, Camera, Star, Target, Bell, Loader2, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import AuthHeader from "@/components/auth-header"
import AddressSearch from "@/components/address-search"

interface UserProfile {
  name: string
  email: string
  phone: string
  bio: string
  avatar: string
  joinDate: string
  readingStats: {
    booksRead: number
    currentlyReading: number
    averageRating: number
    readingStreak: number
  }
  preferences: {
    favoriteGenres: string[]
    favoriteAuthors: string[]
    readingGoal: number
    preferredLanguage: string
    difficulty: number
    bookFormat: string[]
  }
  notifications: {
    newBooks: boolean
    recommendations: boolean
    promotions: boolean
    newsletter: boolean
  }
  address: {
    roadAddress: string
    jibunAddress: string
    placeName?: string
    latitude?: number
    longitude?: number
  }
}

export default function ProfilePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [profile, setProfile] = useState<UserProfile>({
    name: "김창업",
    email: "kim@startup.com",
    phone: "010-1234-5678",
    bio: "스타트업 창업자로서 지속적인 학습과 성장을 추구합니다. 특히 린 스타트업 방법론과 조직 관리에 관심이 많습니다.",
    avatar: "/placeholder.svg?height=120&width=120",
    joinDate: "2024.01.15",
    readingStats: {
      booksRead: 12,
      currentlyReading: 2,
      averageRating: 4.8,
      readingStreak: 15,
    },
    preferences: {
      favoriteGenres: ["스타트업", "경영전략", "자기계발"],
      favoriteAuthors: ["에릭 리스", "피터 틸", "리드 호프만"],
      readingGoal: 24,
      preferredLanguage: "한국어",
      difficulty: 3,
      bookFormat: ["종이책", "전자책"],
    },
    notifications: {
      newBooks: true,
      recommendations: true,
      promotions: false,
      newsletter: true,
    },
    address: {
      roadAddress: "",
      jibunAddress: "",
    },
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)

  const genres = [
    "스타트업",
    "경영전략",
    "자기계발",
    "마케팅",
    "투자",
    "리더십",
    "혁신",
    "기술",
    "심리학",
    "경제",
    "조직관리",
    "창업",
  ]

  const authors = [
    "에릭 리스",
    "피터 틸",
    "리드 호프만",
    "스티브 블랭크",
    "클레이튼 크리스텐슨",
    "벤 호로위츠",
    "마크 안드리센",
    "제프리 무어",
    "캐롤 드웩",
    "앤젤라 더크워스",
  ]

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
    // 실제로는 API 호출
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const toggleGenre = (genre: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        favoriteGenres: prev.preferences.favoriteGenres.includes(genre)
          ? prev.preferences.favoriteGenres.filter((g) => g !== genre)
          : [...prev.preferences.favoriteGenres, genre],
      },
    }))
  }

  const toggleAuthor = (author: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        favoriteAuthors: prev.preferences.favoriteAuthors.includes(author)
          ? prev.preferences.favoriteAuthors.filter((a) => a !== author)
          : [...prev.preferences.favoriteAuthors, author],
      },
    }))
  }

  const toggleBookFormat = (format: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        bookFormat: prev.preferences.bookFormat.includes(format)
          ? prev.preferences.bookFormat.filter((f) => f !== format)
          : [...prev.preferences.bookFormat, format],
      },
    }))
  }

  // 인증 체크
  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem("user")
      if (!userData) {
        router.push("/login?redirect=/profile")
        return
      }

      try {
        const user = JSON.parse(userData)
        if (!user.isLoggedIn) {
          router.push("/login?redirect=/profile")
          return
        }

        // 사용자 정보로 프로필 업데이트
        setProfile((prev) => ({
          ...prev,
          name: user.name,
          email: user.email,
        }))

        setIsAuthenticated(true)
      } catch (error) {
        console.error("Invalid user data:", error)
        router.push("/login?redirect=/profile")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // 로딩 중이거나 인증되지 않은 경우
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // 리다이렉트 중
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <div className="flex items-start space-x-6">
              <div className="relative">
                <Image
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.name}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-gray-100"
                />
                <button className="absolute bottom-0 right-0 bg-black text-white rounded-full p-2 hover:bg-gray-800">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    <p className="text-gray-600">{profile.email}</p>
                    <p className="text-sm text-gray-500">가입일: {profile.joinDate}</p>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>{isEditing ? "취소" : "편집"}</span>
                  </Button>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{profile.bio}</p>

                {/* Reading Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{profile.readingStats.booksRead}</div>
                    <div className="text-sm text-gray-600">읽은 책</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{profile.readingStats.currentlyReading}</div>
                    <div className="text-sm text-gray-600">읽는 중</div>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <span>{profile.readingStats.averageRating}</span>
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <div className="text-sm text-gray-600">평균 평점</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{profile.readingStats.readingStreak}</div>
                    <div className="text-sm text-gray-600">연속 독서일</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">개인정보</TabsTrigger>
              <TabsTrigger value="preferences">독서 선호도</TabsTrigger>
              <TabsTrigger value="notifications">알림 설정</TabsTrigger>
              <TabsTrigger value="security">보안</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>개인정보</CardTitle>
                  <CardDescription>기본 정보를 관리하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름</Label>
                      <Input
                        id="name"
                        value={isEditing ? editedProfile.name : profile.name}
                        onChange={(e) => setEditedProfile((prev) => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input
                        id="email"
                        value={isEditing ? editedProfile.email : profile.email}
                        onChange={(e) => setEditedProfile((prev) => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">휴대폰 번호</Label>
                    <Input
                      id="phone"
                      value={isEditing ? editedProfile.phone : profile.phone}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="h-12"
                    />
                  </div>

                  {isEditing && (
                    <div className="space-y-2">
                      <Label>주소</Label>
                      <AddressSearch
                        onAddressSelect={(address) => {
                          setEditedProfile((prev) => ({
                            ...prev,
                            address: {
                              roadAddress: address,
                              jibunAddress: address,
                              placeName: "",
                              latitude: 0,
                              longitude: 0,
                            },
                          }))
                        }}
                        selectedAddress={editedProfile.address.roadAddress}
                      />
                    </div>
                  )}

                  {!isEditing && profile.address.roadAddress && (
                    <div className="space-y-2">
                      <Label>주소</Label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-600" />
                          <span className="text-sm">{profile.address.roadAddress}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="bio">자기소개</Label>
                    <Textarea
                      id="bio"
                      value={isEditing ? editedProfile.bio : profile.bio}
                      onChange={(e) => setEditedProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4">
                      <Button onClick={handleSave} className="bg-black text-white hover:bg-gray-800">
                        저장
                      </Button>
                      <Button onClick={handleCancel} variant="outline">
                        취소
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <div className="space-y-6">
                {/* Reading Goal */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>독서 목표</span>
                    </CardTitle>
                    <CardDescription>올해 읽고 싶은 책의 수를 설정하세요</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">연간 독서 목표</span>
                        <span className="text-2xl font-bold">{editedProfile.preferences.readingGoal}권</span>
                      </div>
                      <Slider
                        value={[editedProfile.preferences.readingGoal]}
                        onValueChange={(value) =>
                          setEditedProfile((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, readingGoal: value[0] },
                          }))
                        }
                        max={100}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>1권</span>
                        <span>100권</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">
                          현재 진행률:{" "}
                          <strong>
                            {profile.readingStats.booksRead}/{editedProfile.preferences.readingGoal}권
                          </strong>{" "}
                          ({Math.round((profile.readingStats.booksRead / editedProfile.preferences.readingGoal) * 100)}
                          %)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Favorite Genres */}
                <Card>
                  <CardHeader>
                    <CardTitle>관심 분야</CardTitle>
                    <CardDescription>선호하는 도서 분야를 선택하세요 (최대 5개)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {genres.map((genre) => (
                        <button
                          key={genre}
                          onClick={() => toggleGenre(genre)}
                          className={`p-3 text-sm border rounded-lg transition-colors ${
                            editedProfile.preferences.favoriteGenres.includes(genre)
                              ? "bg-black text-white border-black"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      선택된 분야: {editedProfile.preferences.favoriteGenres.length}/5
                    </p>
                  </CardContent>
                </Card>

                {/* Favorite Authors */}
                <Card>
                  <CardHeader>
                    <CardTitle>선호 저자</CardTitle>
                    <CardDescription>좋아하는 저자를 선택하세요</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {authors.map((author) => (
                        <button
                          key={author}
                          onClick={() => toggleAuthor(author)}
                          className={`p-3 text-sm border rounded-lg transition-colors text-left ${
                            editedProfile.preferences.favoriteAuthors.includes(author)
                              ? "bg-black text-white border-black"
                              : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {author}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Reading Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle>독서 설정</CardTitle>
                    <CardDescription>독서 스타일과 선호도를 설정하세요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">선호 언어</Label>
                        <Select
                          value={editedProfile.preferences.preferredLanguage}
                          onValueChange={(value) =>
                            setEditedProfile((prev) => ({
                              ...prev,
                              preferences: { ...prev.preferences, preferredLanguage: value },
                            }))
                          }
                        >
                          <SelectTrigger className="h-12 mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="한국어">한국어</SelectItem>
                            <SelectItem value="영어">영어</SelectItem>
                            <SelectItem value="상관없음">상관없음</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium">선호 난이도</Label>
                          <span className="text-sm text-gray-600">
                            {editedProfile.preferences.difficulty === 1 && "입문"}
                            {editedProfile.preferences.difficulty === 2 && "초급"}
                            {editedProfile.preferences.difficulty === 3 && "중급"}
                            {editedProfile.preferences.difficulty === 4 && "고급"}
                            {editedProfile.preferences.difficulty === 5 && "전문가"}
                          </span>
                        </div>
                        <Slider
                          value={[editedProfile.preferences.difficulty]}
                          onValueChange={(value) =>
                            setEditedProfile((prev) => ({
                              ...prev,
                              preferences: { ...prev.preferences, difficulty: value[0] },
                            }))
                          }
                          max={5}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>입문</span>
                          <span>전문가</span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium mb-3 block">선호 도서 형태</Label>
                        <div className="space-y-2">
                          {["종이책", "전자책", "오디오북"].map((format) => (
                            <div key={format} className="flex items-center space-x-2">
                              <Checkbox
                                id={format}
                                checked={editedProfile.preferences.bookFormat.includes(format)}
                                onCheckedChange={() => toggleBookFormat(format)}
                              />
                              <Label htmlFor={format} className="text-sm">
                                {format}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setProfile(editedProfile)}
                      className="w-full bg-black text-white hover:bg-gray-800"
                    >
                      선호도 저장
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>알림 설정</span>
                  </CardTitle>
                  <CardDescription>받고 싶은 알림을 선택하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">신간 도서 알림</h4>
                        <p className="text-sm text-gray-600">관심 분야의 새로운 책이 출간되면 알려드립니다</p>
                      </div>
                      <Checkbox
                        checked={editedProfile.notifications.newBooks}
                        onCheckedChange={(checked) =>
                          setEditedProfile((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, newBooks: checked as boolean },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">AI 추천 알림</h4>
                        <p className="text-sm text-gray-600">맞춤형 도서 추천을 받아보세요</p>
                      </div>
                      <Checkbox
                        checked={editedProfile.notifications.recommendations}
                        onCheckedChange={(checked) =>
                          setEditedProfile((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, recommendations: checked as boolean },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">프로모션 알림</h4>
                        <p className="text-sm text-gray-600">할인 혜택과 특별 이벤트 정보를 받아보세요</p>
                      </div>
                      <Checkbox
                        checked={editedProfile.notifications.promotions}
                        onCheckedChange={(checked) =>
                          setEditedProfile((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, promotions: checked as boolean },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">뉴스레터</h4>
                        <p className="text-sm text-gray-600">스타트업 인사이트와 독서 팁을 받아보세요</p>
                      </div>
                      <Checkbox
                        checked={editedProfile.notifications.newsletter}
                        onCheckedChange={(checked) =>
                          setEditedProfile((prev) => ({
                            ...prev,
                            notifications: { ...prev.notifications, newsletter: checked as boolean },
                          }))
                        }
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => setProfile(editedProfile)}
                    className="w-full bg-black text-white hover:bg-gray-800"
                  >
                    알림 설정 저장
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>비밀번호 변경</CardTitle>
                    <CardDescription>계정 보안을 위해 정기적으로 비밀번호를 변경하세요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">현재 비밀번호</Label>
                      <Input id="currentPassword" type="password" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">새 비밀번호</Label>
                      <Input id="newPassword" type="password" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                      <Input id="confirmPassword" type="password" className="h-12" />
                    </div>
                    <Button className="bg-black text-white hover:bg-gray-800">비밀번호 변경</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>계정 관리</CardTitle>
                    <CardDescription>계정과 관련된 설정을 관리하세요</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium">로그인 기록</h4>
                        <p className="text-sm text-gray-600">최근 로그인 활동을 확인하세요</p>
                      </div>
                      <Button variant="outline">확인</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium">데이터 다운로드</h4>
                        <p className="text-sm text-gray-600">내 독서 데이터를 다운로드하세요</p>
                      </div>
                      <Button variant="outline">다운로드</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                      <div>
                        <h4 className="font-medium text-red-900">계정 삭제</h4>
                        <p className="text-sm text-red-700">계정을 영구적으로 삭제합니다</p>
                      </div>
                      <Button variant="destructive">삭제</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
