
import useData from "./useData";
import { MovieQuery } from "../../App";

export interface Movies {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    adult: boolean;
  }
    
  const useMovies = (movieQuery: MovieQuery, page: number) =>
     useData<Movies>('/discover/movie', {
      params: {
        with_genres: movieQuery.genre?.id, 
        sort_by: movieQuery.sort,
        page: page,
        with_keywords: movieQuery.search
      }
  }, [movieQuery, page])

export default useMovies
