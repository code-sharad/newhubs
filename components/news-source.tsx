"use client"

import { useState, useEffect } from "react"
import { NewsCard } from "@/components/news-card"
import { fetchNews } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

interface NewsSourceProps {
  source: string
  limit?: number
}

export function NewsSource({ source, limit }: NewsSourceProps) {
  const [news, setNews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true)
        const data = await fetchNews(source)
        setNews(limit ? data.slice(0, limit) : data)
        setError(null)
      } catch (err) {
        console.error(`Error fetching news from ${source}:`, err)
        setError(`Failed to load news from ${source}`)
      } finally {
        setIsLoading(false)
      }
    }

    getNews()
  }, [source, limit])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[...Array(limit || 6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>
  }

  if (news.length === 0) {
    return <div className="text-center text-muted-foreground py-8">No news available from this source</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <NewsCard key={index} article={item} source={source} />
      ))}
    </div>
  )
}
