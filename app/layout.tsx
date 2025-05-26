import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientInitializer from "@/components/client-initializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "STARTUPBOOKS - 스타트업 전문 도서",
  description: "스타트업 창업자를 위한 전문 도서 출판사",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ClientInitializer />
        {children}
      </body>
    </html>
  )
}
