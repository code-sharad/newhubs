// Function to fetch news from a specific source
export async function fetchNews(source: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news/${source}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Error fetching news from ${source}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch news from ${source}:`, error)
    throw error
  }
}

// Function to search for news across sources
export async function searchNews(query: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(`Error searching news: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to search news:", error)
    throw error
  }
}

// Function to fetch a specific article by ID
export async function fetchArticleByURL(news_url: string) {
  try {
    // This is a placeholder implementation
    // In a real application, you would have an API endpoint to fetch a specific article
    // For now, we'll fetch all articles from the source and find the one with the matching ID

    const raw = JSON.stringify({
      "url": news_url
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: raw,
      // redirect: "follow"
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/news-url`, requestOptions)
    console.log(await response.json())
    if (!response.ok) {
      throw new Error(`Error fetching article by URL: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch article ${news_url}:`, error)
    throw error
  }
}
