
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MovieQuery } from "../../App";
import APiClients, { FetchData } from "../../services/apiClients";
import useMoviesStore from "../../store";

const apiClients = new APiClients<Movies>('/discover/movie');

export interface Movies {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    adult: boolean;
  }
    
  const useMovies = () => {
    const movieQuery = useMoviesStore(s => s.movieQuery)
    return useInfiniteQuery<FetchData<Movies>, Error>({
    queryKey: ['movies', movieQuery], 
    queryFn:({pageParam = 1}) => apiClients.get({
      params: {
      include_adult: false,
      with_genres: movieQuery.genreId, 
      sort_by: movieQuery.sort,
      page: pageParam,
      with_keywords: movieQuery.search
    }
  }),
    staleTime: 24 * 60 * 60 * 1000,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage ) => {
      return lastPage.total_pages ? allPage.length + 1 : undefined
    }
  })
}
     

export default useMovies
