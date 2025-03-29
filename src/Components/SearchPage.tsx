import useSearch from "../assets/hooks/useSearch";
import useMoviesStore from "../store";
import CardComponent from "./CardComponent";
import GridMovies from "./GridMoviesContainer";
import MovieCardContainer from "./MovieCardContainer";

const Search = () => {
  const search = useMoviesStore((s) => s.movieQuery.search);
  if (!search) return null;

  const { data: movie } = useSearch(search);
  return (
    <GridMovies>
      {movie?.results?.map((mov) => (
        <MovieCardContainer key={mov.id}>
          <CardComponent movie={mov}></CardComponent>
        </MovieCardContainer>
      ))}
    </GridMovies>
  );
};

export default Search;
