import { Spinner, Text } from "@chakra-ui/react";
import { InfiniteData } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TVSeries } from "../assets/Entities/TVSeries";
import { FetchData } from "../services/apiClients";
import TVSeriesCard from "./TVSeriesCard";
import GridMoviesContainer from "./GridMoviesContainer";

interface Props {
  series?: InfiniteData<FetchData<TVSeries>>;
  error: Error | null;
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

const TVSeriesData = ({
  series,
  error,
  isLoading,
  fetchNextPage,
  hasNextPage,
}: Props) => {
  const allSeries = series?.pages.flatMap((page) => page.results) || [];

  if (isLoading) return <Spinner />;
  if (error) throw error;
  return (
    <>
      <InfiniteScroll
        dataLength={allSeries.length}
        loader={<Spinner />}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
      >
        {error && <Text>{error}</Text>}
        <GridMoviesContainer>
          {series?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results?.map((seriesItem) => (
                <TVSeriesCard key={seriesItem.id} series={seriesItem} />
              ))}
            </React.Fragment>
          ))}
        </GridMoviesContainer>
      </InfiniteScroll>
    </>
  );
};

export default TVSeriesData;