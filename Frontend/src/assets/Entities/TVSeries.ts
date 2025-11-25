import { Genre } from "./Genre";

export interface TVSeries {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
  adult: boolean;
  backdrop_path?: string;
  genres: Genre[];
  popularity?: number;
  vote_count?: number;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  status?: string;
  tagline?: string;
  type?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  created_by?: {name: string}[];
  production_companies?: {name: string}[];
  networks?: {name: string, logo_path?: string}[];
  seasons?: Season[];
  imdb_id?: string;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path?: string;
  season_number: number;
  episode_count: number;
  air_date?: string;
  episodes?: Episode[];
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  air_date?: string;
  still_path?: string;
  vote_average: number;
  runtime?: number;
  vote_count: number;
}