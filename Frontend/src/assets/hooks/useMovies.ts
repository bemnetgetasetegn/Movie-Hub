
import { useInfiniteQuery } from "@tanstack/react-query";
import APiClients, { FetchData } from "../../services/apiClients";
import useMoviesStore from "../../store";
import { Movies } from "../Entities/Movies";

const apiClients = new APiClients<Movies>('/discover/movie');

  const useMovies = () => {
      const movieQuery = useMoviesStore(s => s.movieQuery)

    return useInfiniteQuery<FetchData<Movies>, Error>({
    queryKey: ['movies', movieQuery],
    queryFn:({pageParam = 1}) => {
      const params: any = {
        include_adult: false,
        page: pageParam,
      };

      // Add genre filter if selected
      if (movieQuery.genre?.id) {
        params.with_genres = movieQuery.genre.id;
      }

      // Add sort option if selected
      if (movieQuery.sort) {
        params.sort_by = movieQuery.sort;
      } else {
        params.sort_by = 'popularity.desc';
      }

      // Add search query if present
      if (movieQuery.search) {
        params.query = movieQuery.search;
        // Use search endpoint for search queries
        const searchClient = new APiClients<Movies>('/search/movie');
        return searchClient.get({ params });
      }

      return apiClients.get({ params });
    },
    staleTime: 24 * 60 * 60 * 1000,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPage ) => {
      return lastPage.total_pages  ? allPage.length + 1 : undefined
    }
  })
}
     

export default useMovies
