
import { useInfiniteQuery } from "@tanstack/react-query";
import APiClients, { FetchData } from "../../services/apiClients";
import useMoviesStore from "../../store";
import { Movies } from "../Entities/Movies";

const apiClients = new APiClients<Movies>('/discover/movie');

  const useMovies = () => {
      const movieQuery = useMoviesStore(s => s.movieQuery)

    return useInfiniteQuery<FetchData<Movies>, Error>({
    queryKey: ['movies', movieQuery], 
    queryFn:({pageParam = 1}) => apiClients.get({
      params: {
        include_adult: false,
        with_genres: movieQuery.genre?.id, 
        sort_by: movieQuery.sort,
        page: pageParam,
        with_keywords: movieQuery.search
    }}),
    staleTime: 24 * 60 * 60 * 1000,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPage ) => {
      return lastPage.total_pages  ? allPage.length + 1 : undefined
    }
  })
}
     

export default useMovies
