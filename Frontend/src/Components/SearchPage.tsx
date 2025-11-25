import { useCombinedSearch } from "../assets/hooks/useSearch";
import useMoviesStore from "../store";
import CardComponent from "./CardComponent";
import TVSeriesCard from "./TVSeriesCard";
import GridMovies from "./GridMoviesContainer";
import MovieCardContainer from "./MovieCardContainer";
import { VStack, Text, Badge, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Movies } from "../assets/Entities/Movies";
import { TVSeries } from "../assets/Entities/TVSeries";

const MotionBox = motion(Box);

const Search = () => {
  const search = useMoviesStore((s) => s.movieQuery.search);
  if (!search) return null;

  const { movies, tvSeries, isLoading } = useCombinedSearch(search);

  const movieResults = movies?.results || [];
  const tvResults = tvSeries?.results || [];

  const allResults = [
    ...movieResults.map(item => ({ ...item, type: 'movie' as const })),
    ...tvResults.map(item => ({ ...item, type: 'tv' as const })),
  ].sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0)); // Sort by rating

  if (isLoading) {
    return (
      <VStack spacing={4} py={8}>
        <Text>Searching...</Text>
      </VStack>
    );
  }

  return (
    <VStack spacing={8} align="stretch">
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
          Search Results for "{search}"
        </Text>
        <Text textAlign="center" color="gray.500">
          Found {allResults.length} results ({movieResults.length} movies, {tvResults.length} TV series)
        </Text>
      </MotionBox>

      <GridMovies>
        {allResults.map((item) => (
          <MovieCardContainer key={`${item.type}-${item.id}`}>
            {item.type === 'movie' ? (
              <CardComponent movie={item as Movies} />
            ) : (
              <Box position="relative">
                <TVSeriesCard series={item as TVSeries} />
                <Badge
                  position="absolute"
                  top={2}
                  right={2}
                  bg="purple.500"
                  color="white"
                  borderRadius="full"
                  px={2}
                  py={1}
                  fontSize="xs"
                  fontWeight="bold"
                  zIndex={10}
                  shadow="md"
                >
                  TV
                </Badge>
              </Box>
            )}
          </MovieCardContainer>
        ))}
      </GridMovies>

      {allResults.length === 0 && (
        <VStack spacing={4} py={12}>
          <Text fontSize="lg" color="gray.500">
            No results found for "{search}"
          </Text>
          <Text fontSize="sm" color="gray.400">
            Try searching for movies or TV series
          </Text>
        </VStack>
      )}
    </VStack>
  );
};

export default Search;
