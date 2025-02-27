import { useEffect, useState } from "react";

import apiClients from "../../services/apiClients";
import { AxiosError, AxiosRequestConfig } from "axios";
import { Genre } from "./useGenre";

export interface Movies {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    adult: boolean;
  }

  interface FetchMoviesData {
    page: number,
    results: Movies[];
  }
  
  
  
  const useMovies = (selectedGenre: Genre | null, sortOrder: string , page: number ,requestConfig?: AxiosRequestConfig,) => {
    const [movies, setMovies] = useState<Movies[]>([]);
    const [errors, setErrors] = useState('');

    
    useEffect(() => {
      const controller = new AbortController();
      apiClients
      .get<FetchMoviesData>("/discover/movie", {...requestConfig,       params: { 
        ...requestConfig?.params,
        with_genres: selectedGenre?.id, 
        sort_by: sortOrder,
        page: page
    },  signal: controller.signal } )
      .then(res => setMovies(res.data.results))
      .catch(err => {
        if(err instanceof AxiosError) return;
        setErrors(err.message)
      });

      return () => {controller.abort()}

    }, [selectedGenre, sortOrder, page, requestConfig]);

    return { movies, errors};
  }

export default useMovies

