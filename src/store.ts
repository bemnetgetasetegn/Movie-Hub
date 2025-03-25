import { create } from "zustand";

interface MovieQuery {
  genreId?: Number;
  sort?: string;
  search?: string;
}

interface MovieQueryStore {
    movieQuery: MovieQuery,
    setGenreId: (genreId: number) => void,
    setSort: (sort: string) => void,
    setSearch: (search: string) => void
}

const useMoviesStore =  create<MovieQueryStore>(set => ({
  movieQuery: {},
  setGenreId: (genreId) => set(() => ({movieQuery: {genreId}})),
  setSort: (sort) => set((store) => ({movieQuery: {...store.movieQuery, sort}})),
  setSearch: (search) => set(store => ({movieQuery: {...store.movieQuery, search}}))
}))

export default useMoviesStore