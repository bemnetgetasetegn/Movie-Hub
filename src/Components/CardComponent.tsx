import { Card, CardBody, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Movies } from "../assets/Entities/Movies";
import img from "../assets/img.png";
import VoteAverage from "./VoteAverage";
interface Props {
  movie?: Movies;
}

const CardComponent = ({ movie }: Props) => {
  return (
    <Card bg={"transparent"}>
      <Image
        objectFit={"contain"}
        borderRadius={10}
        src={
          movie?.poster_path
            ? "https://image.tmdb.org/t/p/w300/" + movie.poster_path
            : img
        }
      ></Image>
      <CardBody paddingY={4} marginY={1}>
        <Link to={`movie/${movie?.id}`}>
          <Heading marginBottom={1} fontSize={"xl"}>
            {movie?.title}
          </Heading>
        </Link>
        <VoteAverage rating={movie?.vote_average}></VoteAverage>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
