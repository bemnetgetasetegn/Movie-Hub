import useUpcoming from "../assets/hooks/useUpcoming";
import MovieData from "./MovieData";

const UpComingMovies = () => {
  const {
    data: movies,
    error,
    fetchNextPage,
    isLoading,
    hasNextPage,
  } = useUpcoming();
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

export default UpComingMovies;
