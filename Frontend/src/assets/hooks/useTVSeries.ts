import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import APiClients, { FetchData } from "../../services/apiClients";
import { TVSeries, Season } from "../Entities/TVSeries";
import axios from "axios";
import useMoviesStore from "../../store";

const apiClients = new APiClients<TVSeries>('/discover/tv');

// Hook for fetching TV series with infinite scroll
const useTVSeries = () => {
  const tvQuery = useMoviesStore(s => s.tvQuery);

  return useInfiniteQuery<FetchData<TVSeries>, Error>({
    queryKey: ['tv-series', tvQuery],
    queryFn: ({ pageParam = 1 }) => {
      const params: any = {
        include_adult: false,
        page: pageParam,
      };

      // Add genre filter if selected
      if (tvQuery.genre?.id) {
        params.with_genres = tvQuery.genre.id;
      }

      // Add sort option if selected
      if (tvQuery.sort) {
        params.sort_by = tvQuery.sort;
      } else {
        params.sort_by = 'popularity.desc';
      }

      // Add search query if present
      if (tvQuery.search) {
        params.query = tvQuery.search;
        // Use search endpoint for search queries
        const searchClient = new APiClients<TVSeries>('/search/tv');
        return searchClient.get({ params });
      }

      return apiClients.get({ params });
    },
    staleTime: 24 * 60 * 60 * 1000,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.total_pages ? allPages.length + 1 : undefined;
    }
  });
};

// Hook for fetching popular TV series
export const usePopularTVSeries = () => {
  const popularApiClient = new APiClients<TVSeries>('/tv/popular');
  return useInfiniteQuery<FetchData<TVSeries>, Error>({
    queryKey: ['tv-series', 'popular'],
    queryFn: ({ pageParam = 1 }) => popularApiClient.get({
      params: {
        page: pageParam,
      }
    }),
    staleTime: 24 * 60 * 60 * 1000,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.total_pages ? allPages.length + 1 : undefined;
    }
  });
};

// Hook for fetching top rated TV series
export const useTopRatedTVSeries = () => {
  const topRatedApiClient = new APiClients<TVSeries>('/tv/top_rated');
  return useInfiniteQuery<FetchData<TVSeries>, Error>({
    queryKey: ['tv-series', 'top-rated'],
    queryFn: ({ pageParam = 1 }) => topRatedApiClient.get({
      params: {
        page: pageParam,
      }
    }),
    staleTime: 24 * 60 * 60 * 1000,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.total_pages ? allPages.length + 1 : undefined;
    }
  });
};

// Hook for fetching TV series on the air
export const useOnTheAirTVSeries = () => {
  const onTheAirApiClient = new APiClients<TVSeries>('/tv/on_the_air');
  return useInfiniteQuery<FetchData<TVSeries>, Error>({
    queryKey: ['tv-series', 'on-the-air'],
    queryFn: ({ pageParam = 1 }) => onTheAirApiClient.get({
      params: {
        page: pageParam,
      }
    }),
    staleTime: 24 * 60 * 60 * 1000,
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.total_pages ? allPages.length + 1 : undefined;
    }
  });
};

// Hook for fetching TV series external IDs
export const useTVSeriesExternalIds = (id: string | undefined) => {
  return useQuery<{ imdb_id?: string }, Error>({
    queryKey: ['tv-series', id, 'external-ids'],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/external_ids`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQwNTAxZWExMzgyMmRiMjUyNzhkZGRlMDE0NmEzOSIsIm5iZiI6MTczOTc0MzMyOS4xNTY5OTk4LCJzdWIiOiI2N2IyNjA2MTQxZWE2MTA0NjI2ZGJhODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Xe2nfp8aIbeLvNOj6mkummAvOVWOUmDboJeFsDh6LXw`
          }
        }
      );
      return response.data;
    },
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!id,
  });
};

// Hook for fetching TV series details
export const useTVSeriesDetails = (id: string | undefined) => {
  const apiClient = new APiClients<TVSeries>('/tv');
  return useQuery<TVSeries, Error>({
    queryKey: ['tv-series', id],
    queryFn: () => apiClient.getDetails(id!),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!id,
  });
};

// Hook for fetching TV series seasons (seasons are included in the series details)
export const useTVSeriesSeasons = (seriesId: string | undefined) => {
  const seriesApiClient = new APiClients<TVSeries>('/tv');
  return useQuery<TVSeries, Error>({
    queryKey: ['tv-series', seriesId, 'details'],
    queryFn: () => seriesApiClient.getDetails(seriesId!),
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!seriesId,
    select: (data) => data, // Return the full series data, seasons will be in data.seasons
  });
};

// Hook for fetching season episodes
export const useSeasonEpisodes = (seriesId: string | undefined, seasonNumber: number | undefined) => {
  return useQuery<Season, Error>({
    queryKey: ['tv-series', seriesId, 'season', seasonNumber],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWQwNTAxZWExMzgyMmRiMjUyNzhkZGRlMDE0NmEzOSIsIm5iZiI6MTczOTc0MzMyOS4xNTY5OTk4LCJzdWIiOiI2N2IyNjA2MTQxZWE2MTA0NjI2ZGJhODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Xe2nfp8aIbeLvNOj6mkummAvOVWOUmDboJeFsDh6LXw`
          }
        }
      );
      return response.data;
    },
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!seriesId && seasonNumber !== undefined,
  });
};

export default useTVSeries;