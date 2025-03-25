import { Button, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import useMovies from "../assets/hooks/useMovies";
import CardComponent from "./CardComponent";

const GridMain = () => {
  const { data, error, isFetchingNextPage, fetchNextPage, isLoading } =
    useMovies();

  if (isLoading) return <Spinner />;
  if (error) throw error;

  return (
    <div>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        padding={10}
        spacing={10}
      >
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results?.map((movie) => (
              <CardComponent movie={movie} key={movie.id}></CardComponent>
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
      <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
        Load More
      </Button>
    </div>
  );
};

export default GridMain;
