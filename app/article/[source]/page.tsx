"use client"

import { useContext, useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { fetchArticleByURL } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Calendar, ExternalLink, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { NewsContext } from "@/components/news-Provider"

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<any>(null)
  const [description, setDescription] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const source = params.source as string
  const id = params.id as string
  const searchParams = useSearchParams();
  const search_url = searchParams.get("id") || "";
  const { news } = useContext(NewsContext)
  useEffect(() => {
    const getArticle = async () => {
      try {
        setIsLoading(true)
        // const data = await fetchArticleByURL(search_url)
        const raw = JSON.stringify({
          "url": search_url
        });
        
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: raw,
          // redirect: "follow"
        };
        
        setArticle(news)

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, requestOptions)
        if (!response.ok) {
          throw new Error(`Error fetching article by URL: ${response.statusText}`)
        }
        const data = await response.json()
        // return await response.json()
        console.log(data.content)
        setDescription(data.content)
        setError(null)
      } catch (err) {
        console.error(`Error fetching article:`, err)
        setError(`Failed to load article. It may have been removed or is unavailable.`)
      } finally {
        setIsLoading(false)
      }
    }

    getArticle();
  }, [source])

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Get source display name
  const getSourceName = (sourceId: string) => {
    switch (sourceId) {
      case "thehindu":
        return "The Hindu"
      case "economictimes":
        return "Economic Times"
      case "indianexpress":
        return "Indian Express"
      default:
        return sourceId
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Skeleton className="h-[400px] w-full rounded-lg mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className="container mx-auto px-4 py-8 max-w-4xl">
  //       <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
  //         <ArrowLeft className="mr-2 h-4 w-4" /> Back
  //       </Button>
  //       <div className="text-center py-12">
  //         <h2 className="text-2xl font-bold text-red-500 mb-4">Article Not Found</h2>
  //         <p className="text-muted-foreground mb-6">{error}</p>
  //         <Button onClick={() => router.push("/")}>Return to Home</Button>
  //       </div>
  //     </div>
  //   )
  // }

  if (!article) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      {/* <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline">{getSourceName(source)}</Badge>
        {article.category && <Badge variant="secondary">{article.category}</Badge>}
      </div> */}

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.news_title}</h1>

      <div className="flex items-center gap-4 text-muted-foreground mb-6">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          {formatDate(article.news_publication_date)}
        </div>
        <Button variant="ghost" size="sm" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </div>

      {article.news_image && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.news_image || "/placeholder.svg"}
            alt={article.news_title}
            fill
            className="object-cover"
            priority
          />
          {/* {article.imageCaption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
              {article.imageCaption}
            </div>
          )} */}
        </div>
      )}

      {/* <div className="prose prose-lg max-w-none mb-8">
        {article.content ? (
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        ) : (
        )}
      </div> */}

      <>
        <p className="lead">{description}</p>
      </>
      {/* <div className="border-t pt-6 mt-8">
        <Link href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
          <Button>
            Read Full Article on {getSourceName(source)} <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div> */}

      {/* {article.relatedArticles && article.relatedArticles.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.relatedArticles.map((related: any, index: number) => (
              <div key={index} className="border p-4 rounded-lg">
                <h3 className="font-medium mb-2">{related.title}</h3>
                <Link
                  href={`/article/${related.source}/${related.id}`}
                  className="text-primary hover:underline text-sm"
                >
                  Read more
                </Link>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  )
}
