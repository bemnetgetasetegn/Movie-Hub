import { SimpleGrid, Text } from "@chakra-ui/react";
import useMovies from "../assets/hooks/useMovies";
import CardComponent from "./CardComponent";
import { MovieQuery } from "../App";

interface Props {
  movieQuery: MovieQuery;
  page: number;
}

const GridMain = ({ page, movieQuery }: Props) => {
  const { data, errors } = useMovies(movieQuery, page);

  return (
    <div>
      {errors && <Text>{errors}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding={10}
        spacing={10}
      >
        {data.map((movie) => (
          <CardComponent movie={movie} key={movie.id}></CardComponent>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default GridMain;
