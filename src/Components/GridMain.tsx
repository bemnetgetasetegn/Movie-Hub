import { Button, Heading, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import useMovies from "../assets/hooks/useMovies";
import useNowPlayingMovies from "../assets/hooks/useNowPlayingMovies";
import GridMoviesContainer from "../Components/GridMoviesContainer";
import CardComponent from "./CardComponent";
import MovieCardContainer from "./MovieCardContainer";

const GridMain = () => {
  const {
    data: movies,
    error,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useMovies();

  const { data: NowPlaying } = useNowPlayingMovies();

  if (isLoading) return <Spinner />;
  if (error) throw error;

  return (
    <>
      {error && <Text>{error}</Text>}
      <GridMoviesContainer>
        {movies?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results?.map((movie) => (
              <MovieCardContainer key={movie.id}>
                <CardComponent movie={movie}></CardComponent>
              </MovieCardContainer>
            ))}
          </React.Fragment>
        ))}
      </GridMoviesContainer>

      <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
        Load More
      </Button>
      <Heading>Now Playing</Heading>
      <GridMoviesContainer>
        {NowPlaying?.results?.map((movie) => (
          <MovieCardContainer key={movie.id}>
            <CardComponent movie={movie}></CardComponent>
          </MovieCardContainer>
        ))}
      </GridMoviesContainer>
    </>
  );
};

export default GridMain;
