import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import APiClients from "../../services/apiClients"
import { Movies } from "../Entities/Movies"
import { TVSeries } from "../Entities/TVSeries"

const movieApiClient = new APiClients<Movies>('/search/movie')
const tvApiClient = new APiClients<TVSeries>('/search/tv')

// Combined search hook for both movies and TV series
export const useCombinedSearch = (query: string) => {
    const moviesQuery = useQuery({
        queryKey: ['search-movies', query],
        queryFn: () => movieApiClient.get({params: {query: query}}),
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!query && query.length > 2,
    })

    const tvQuery = useQuery({
        queryKey: ['search-tv', query],
        queryFn: () => tvApiClient.get({params: {query: query}}),
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !!query && query.length > 2,
    })

    return {
        movies: moviesQuery.data,
        tvSeries: tvQuery.data,
        isLoading: moviesQuery.isLoading || tvQuery.isLoading,
        error: moviesQuery.error || tvQuery.error,
    }
}

// Legacy search hook for movies only
const useSearch = (query: string) => useQuery({
    queryKey: ['search', query],
    queryFn: () => movieApiClient.get({params: {query: query}}),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!query && query.length > 2, // Only search if query is longer than 2 characters
})

// Debounced search hook for autocomplete
export const useDebouncedSearch = (query: string, delay: number = 300) => {
    const [debouncedQuery, setDebouncedQuery] = useState(query)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [query, delay])

    return useSearch(debouncedQuery)
}

export default useSearch