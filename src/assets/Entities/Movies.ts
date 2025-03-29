import { Genre } from "./Genre";


export interface Movies {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  adult: boolean;
  backdrop_path?: string;
  genres: Genre[];
  revenue?: number;
  spoken_languages?: {english_name: string, iso_639_1: string, name: string}[]
  status?: string
  tagline?: string
}
