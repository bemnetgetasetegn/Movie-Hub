import useTVSeries from "../assets/hooks/useTVSeries";
import TVSeriesData from "./TVSeriesData";

const TVSeriesGrid = () => {
  const {
    data: tvSeries,
    error,
    fetchNextPage,
    isLoading,
    hasNextPage
  } = useTVSeries();

  return (
    <TVSeriesData
      series={tvSeries}
      error={error}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default TVSeriesGrid;