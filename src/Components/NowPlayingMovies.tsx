import useNowPlayingMovies from "../assets/hooks/useNowPlayingMovies";
import MovieData from "./MovieData";

const NowPlayingMovies = () => {
  const {
    data: movies,
    error,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useNowPlayingMovies();

  return (
    <MovieData
      movies={movies}
      error={error}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isLoading}
    />
  );
};

export default NowPlayingMovies;
