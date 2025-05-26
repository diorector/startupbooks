"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LayoutDashboard, Users, BookOpen, ShoppingCart, Settings, LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"

export default function AdminHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="text-2xl font-bold tracking-tight text-blue-600">
              ADMIN
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/admin" className="flex items-center space-x-2 text-sm font-medium hover:text-blue-600">
                <LayoutDashboard className="h-4 w-4" />
                <span>대시보드</span>
              </Link>
              <Link href="/admin/users" className="flex items-center space-x-2 text-sm font-medium hover:text-blue-600">
                <Users className="h-4 w-4" />
                <span>사용자</span>
              </Link>
              <Link href="/admin/books" className="flex items-center space-x-2 text-sm font-medium hover:text-blue-600">
                <BookOpen className="h-4 w-4" />
                <span>도서</span>
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center space-x-2 text-sm font-medium hover:text-blue-600"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>주문</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm text-gray-600 hover:text-black">
              사이트로 이동
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{user?.name || "관리자"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  설정
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      대시보드
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/users">
                      <Users className="h-4 w-4 mr-2" />
                      사용자
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/books">
                      <BookOpen className="h-4 w-4 mr-2" />
                      도서
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/orders">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      주문
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
