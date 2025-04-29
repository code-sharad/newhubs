"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewsSource } from "@/components/news-source"
import { NewsSearch } from "@/components/news-search"
import { Button } from "@/components/ui/button"
import { Newspaper } from "lucide-react"

export default function Home() {
  const [activeSource, setActiveSource] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main className="container mx-auto px-4 py-6">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Newspaper className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">NewsHub</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive digital platform for news from India's top publications
        </p>
      </header>

      {/* <NewsSearch /> */}

      <Tabs defaultValue="all" className="mt-8 " onValueChange={setActiveSource}>
          <h2 className="text-2xl font-semibold">Latest News</h2>
        <div className="flex items-center justify-between mb-4">
          <TabsList className="pl-32">
            <TabsTrigger value="all">All Sources</TabsTrigger>
            <TabsTrigger value="thehindu">The Hindu</TabsTrigger>
            <TabsTrigger value="economictimes">Economic Times</TabsTrigger>
            <TabsTrigger value="indianexpress">Indian Express</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <NewsSource source="thehindu" limit={2} />
            <NewsSource source="economictimes" limit={2} />
            <NewsSource source="indianexpress" limit={2} />
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg">
              Load More News
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="thehindu" className="mt-0">
          <NewsSource source="thehindu" />
        </TabsContent>

        <TabsContent value="economictimes" className="mt-0">
          <NewsSource source="economictimes" />
        </TabsContent>

        <TabsContent value="indianexpress" className="mt-0">
          <NewsSource source="indianexpress" />
        </TabsContent>
      </Tabs>
    </main>
  )
}
