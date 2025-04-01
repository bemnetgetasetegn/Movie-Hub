import { create } from "zustand";
import { Genre } from "./assets/Entities/Genre";

interface MovieQuery {
  genre?: Genre ;
  sort?: string;
  search?: string;
}

interface MovieQueryStore {
    movieQuery: MovieQuery,
    setGenre: (genre: Genre) => void,
    setSort: (sort: string) => void,
    setSearch: (search: string) => void
}

const useMoviesStore =  create<MovieQueryStore>(set => ({
  movieQuery: {},
  setGenre: (genre) => set(() => ({movieQuery: {genre: genre}})),
  setSort: (sort) => set((store) => ({movieQuery: {...store.movieQuery, sort}})),
  setSearch: (search) => set(store => ({movieQuery: {...store.movieQuery, search}}))
}))

export default useMoviesStore