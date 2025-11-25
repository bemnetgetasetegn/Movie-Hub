import { Spinner, Text, Box, Skeleton } from "@chakra-ui/react";
import { InfiniteData } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Movies } from "../assets/Entities/Movies";
import { FetchData } from "../services/apiClients";
import CardComponent from "./CardComponent";
import GridMoviesContainer from "./GridMoviesContainer";
import MovieCardContainer from "./MovieCardContainer";

const MovieSkeletonGrid = () => (
  <GridMoviesContainer>
    {[...Array(20)].map((_, i) => (
      <Box key={i} borderRadius="xl" overflow="hidden">
        <Skeleton height="400px" borderRadius="xl" />
        <Box p={4}>
          <Skeleton height="20px" mb={2} />
          <Skeleton height="16px" w="60%" />
        </Box>
      </Box>
    ))}
  </GridMoviesContainer>
);

interface Props {
  movies?: InfiniteData<FetchData<Movies>>;
  error: Error | null;
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

const MovieData = ({
  movies,
  error,
  isLoading,
  fetchNextPage,
  hasNextPage,
}: Props) => {
  const allMovies = movies?.pages.flatMap((page) => page.results) || [];
if (isLoading) return <MovieSkeletonGrid />;

if (error) throw error;
  return (
    <>
      <InfiniteScroll
        dataLength={allMovies.length}
        loader={<Spinner />}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
      >
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
      </InfiniteScroll>
    </>
  );
};

export default MovieData;
