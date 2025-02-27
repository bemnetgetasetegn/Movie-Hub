import { Text } from "@chakra-ui/react";

interface Props {
  movie_desc: string;
}

const MovieDescription = ({movie_desc}: Props) => {
  return <Text>{movie_desc}</Text>;
};

export default MovieDescription;
