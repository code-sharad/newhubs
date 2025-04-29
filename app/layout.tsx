import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import NewsProvider from "@/components/news-Provider"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "NewsHub - Aggregated News from Top Sources",
  description: "A comprehensive digital platform for news from India's top publications",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NewsProvider>
            {children}
          </NewsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
