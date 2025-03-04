import { SimpleGrid, Text } from "@chakra-ui/react";
import useMovies from "../assets/hooks/useMovies";
import CardComponent from "./CardComponent";
import { Genre } from "../assets/hooks/useGenre";

interface Props {
  selectedGenre: Genre | null;
  sortOrder: string;
  page: number;
}

const GridMain = ({selectedGenre, sortOrder, page}: Props) => {
  const { movies, errors } = useMovies(selectedGenre, sortOrder, page);

  return (
    <div>
      {errors && <Text>{errors}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding={10}
        spacing={10}
      >
        {movies.map((movie) => (
          <CardComponent movie={movie} key={movie.id}></CardComponent>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default GridMain;
