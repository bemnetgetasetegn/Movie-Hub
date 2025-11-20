import { useQuery } from "@tanstack/react-query"
import APiClients from "../../services/apiClients"
import { Movies } from "../Entities/Movies"

const apiClients = new APiClients<Movies>('/movie')

const useMovieDetails = (movieId: number | string) => {
   return useQuery({
        queryKey: ['MovieDetails', movieId],
        queryFn: () => apiClients.getDetails(movieId),
        staleTime: 24 * 60 * 60 * 1000 //24h
    })
}

export default useMovieDetails