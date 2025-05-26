"use client"

import Link from "next/link"
import { Search, Menu, User, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"

export default function AuthHeader() {
  const { user, logout } = useAuth()

  return (
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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.name}님</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">내 정보</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/reading-history">독서 기록</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/recommendations">AI 추천</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    로그아웃
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="text-sm font-medium hover:underline">
                로그인 / 회원가입
              </Link>
            )}

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
  )
}
