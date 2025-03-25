import { Button, List, ListItem, Spinner } from "@chakra-ui/react";
import useGenre from "../assets/hooks/useGenre";
import useMoviesStore from "../store";

const GenreList = () => {
  const { data, error, isLoading } = useGenre();
  const selectedGenreId = useMoviesStore((s) => s.movieQuery.genreId);
  const setSelectedGenreId = useMoviesStore((s) => s.setGenreId);

  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <List>
      {data?.genres?.map((genre) => (
        <ListItem key={genre.id}>
          <Button
            fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
            onClick={() => setSelectedGenreId(genre.id)}
            width={150}
            margin={1}
            variant={"outline"}
          >
            {genre.name}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
