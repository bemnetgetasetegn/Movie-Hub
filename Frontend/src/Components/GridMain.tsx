import useMovies from "../assets/hooks/useMovies";
import MovieData from "./MovieData";

const GridMain = () => {
  const {
    data: movies,
    error,
    fetchNextPage,
    isLoading,
    hasNextPage
  } = useMovies();

  
  return (
    <MovieData
      movies={movies}
      error={error}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default GridMain;
