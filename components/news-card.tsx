import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import NewsProvider, { NewsContext } from "./news-Provider"

interface NewsCardProps {
  article: {
    news_title: string
    news_url: string
    news_image?: string
    news_publication_date: string
    category?: string
    loc: string
    source?: {
      name: string
    }
    id: string
  }
  source: string
}

export function NewsCard({ article, source }: NewsCardProps) {
  const { news_title, news_url, news_image, news_publication_date, category } = article
  const { setNews } = useContext(NewsContext)
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
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

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {article.news_image && (
        <div className="relative w-full h-48">
          <Image
            src={article.news_image || "/placeholder.svg?height=200&width=400"}
            alt={article.news_title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <Badge variant="outline">{getSourceName(source)}</Badge>
          {article.category && <Badge variant="secondary">{article.category}</Badge>}
        </div>
        <CardTitle className="line-clamp-2">{article.news_title}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <Calendar className="h-3 w-3" />
          {formatDate(article.news_publication_date)}
        </CardDescription>
      </CardHeader>
      {/* <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{article.description}</p>
      </CardContent> */}
      <CardFooter>
        <Link
          onClick={() => {
            setNews(article)
          }}
          href={`/article/${source}?id=${article.loc}`}
          className="text-sm font-medium text-primary flex items-center gap-1 hover:underline"
        >
          Read full article <ExternalLink className="h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  )
}
