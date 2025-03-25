import { List, ListItem, Button, Spinner } from "@chakra-ui/react";
import useGenre, { Genre } from "../assets/hooks/useGenre";

interface Props {
  onSelectedGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ onSelectedGenre, selectedGenre }: Props) => {
  const { data, error, isLoading } = useGenre();

  if (error) return null;
  if (isLoading) return <Spinner />;
  return (
    <List>
      {data?.genres?.map((genre) => (
        <ListItem key={genre.id}>
          <Button
            fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
            onClick={() => onSelectedGenre(genre)}
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
