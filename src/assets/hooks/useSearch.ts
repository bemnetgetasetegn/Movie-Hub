import { useQuery } from "@tanstack/react-query"
import APiClients from "../../services/apiClients"
import { Movies } from "../Entities/Movies"

const apiClient = new APiClients<Movies>('/search/movie')

const useSearch = (query: string) => useQuery({
    queryKey: ['search', query],
    queryFn: () => apiClient.get({params: {query: query}}),
    staleTime: 24 * 60 * 60 * 1000,
})
export default useSearch