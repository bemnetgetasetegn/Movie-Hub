import { Button, Img, Spinner, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useMovieDetails from "../assets/hooks/useMovieDetails";
import useMoviesStore from "../store";
import MovieImages from "./MovieImages";

const MovieDetails = () => {
  const setMovieQuery = useMoviesStore((s) => s.setGenreId);
  const navigation = useNavigate();
  const { movieId } = useParams();

  if (!movieId) return null;
  const { data, isLoading } = useMovieDetails(movieId);
  if (isLoading) return <Spinner />;
  return (
    <>
      <Img src={"https://image.tmdb.org/t/p/w300/" + data?.backdrop_path} />
      {data?.genres.map((gen) => (
        <Button
          onClick={() => {
            setMovieQuery(gen.id);
            navigation("/");
          }}
        >
          {gen.name}
        </Button>
      ))}
      <Text> {data?.title}</Text>
      <Text>{data?.overview}</Text>
      <Text>${data?.revenue}</Text>
      {data?.spoken_languages?.map((lang) => (
        <Text key={lang.iso_639_1}>eng_name: {lang.name}</Text>
      ))}
      <Text>Status: {data?.status}</Text>
      <Text> {data?.tagline}</Text>
      <MovieImages movieId={movieId} />
    </>
  );
};

export default MovieDetails;
