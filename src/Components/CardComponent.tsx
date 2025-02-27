import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import { Movies } from "../assets/hooks/useMovies";
import VoteAverage from "./VoteAverage";
interface Props {
  movie: Movies;
}

const CardComponent = ({ movie }: Props) => {
  return (
    <Card size={"sm"} borderRadius={10} overflow={"hidden"}>
      <Image
        objectFit={"contain"}
        src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path}
      ></Image>
      <CardBody>
        <HStack justifyContent={"space-between"} paddingY={"5px"}>
          <Heading fontSize={"2xl"}>{movie.title}</Heading>
          <VoteAverage rating={movie.vote_average}></VoteAverage>
        </HStack>
        {/* <MovieDescription movie_desc={movie.overview} /> */}
        {movie.release_date}
      </CardBody>
    </Card>
  );
};

export default CardComponent;
