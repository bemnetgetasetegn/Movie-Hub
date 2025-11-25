import { create } from "zustand";
import { Genre } from "./assets/Entities/Genre";

interface ContentQuery {
  genre?: Genre;
  sort?: string;
  search?: string;
}

interface ContentQueryStore {
  movieQuery: ContentQuery;
  tvQuery: ContentQuery;
  setMovieGenre: (genre: Genre) => void;
  setTVGenre: (genre: Genre) => void;
  setMovieSort: (sort: string) => void;
  setTVSort: (sort: string) => void;
  setSearch: (search: string) => void;
}

const useMoviesStore = create<ContentQueryStore>((set) => ({
  movieQuery: {},
  tvQuery: {},
  setMovieGenre: (genre) => set((store) => ({
    movieQuery: { ...store.movieQuery, genre }
  })),
  setTVGenre: (genre) => set((store) => ({
    tvQuery: { ...store.tvQuery, genre }
  })),
  setMovieSort: (sort) => set((store) => ({
    movieQuery: { ...store.movieQuery, sort }
  })),
  setTVSort: (sort) => set((store) => ({
    tvQuery: { ...store.tvQuery, sort }
  })),
  setSearch: (search) => set((store) => ({
    movieQuery: { ...store.movieQuery, search },
    tvQuery: { ...store.tvQuery, search }
  })),
  // Keep backward compatibility
  setGenre: (genre: Genre) => set((store) => ({
    movieQuery: { ...store.movieQuery, genre }
  })),
  setSort: (sort: string) => set((store) => ({
    movieQuery: { ...store.movieQuery, sort }
  })),
}));

export default useMoviesStore;