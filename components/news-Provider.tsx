'use client'


import { useState, useEffect, createContext } from "react"

export const NewsContext = createContext({
    news: [],
    setNews: (news: any) => {},
})

const NewsProvider = ({ children }: { children: React.ReactNode }) => {
    const [news, setNews] = useState([])

    return (
        <NewsContext value={{ news,setNews }}>
            {children}
        </NewsContext>
    )
}

export default NewsProvider