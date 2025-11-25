import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Text,
  Image,
  Spinner, useColorModeValue,
  Badge
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaFilm, FaTv } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCombinedSearch } from "../assets/hooks/useSearch";
import { ImagesPoster } from "../data/TMDBImages";
import useMoviesStore from "../store";

const MotionBox = motion(Box);

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();
  const setSearchInput = useMoviesStore((s) => s.setSearch);

  const { movies, tvSeries, isLoading } = useCombinedSearch(query);

  const bg = useColorModeValue("rgba(255,255,255,0.95)", "rgba(0,0,0,0.95)");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("purple.50", "purple.900");

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  // Handle item selection
  const handleItemSelect = (item: any) => {
    setQuery("");
    if (item.title) {
      // Movie
      navigation(`/movie/${item.id}`);
    } else {
      // TV Series
      navigation(`/tv/${item.id}`);
    }
  };

  // Handle form submission (fallback to search page)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      setSearchInput(query);
      setQuery("");
      navigation("/search");
    }
  };

  // Combine and limit results to 6 suggestions
  const movieSuggestions = movies?.results?.slice(0, 3) || [];
  const tvSuggestions = tvSeries?.results?.slice(0, 3) || [];
  const suggestions = [
    ...movieSuggestions.map((item) => ({ ...item, type: "movie" })),
    ...tvSuggestions.map((item) => ({ ...item, type: "tv" })),
  ].slice(0, 6);

  return (
    <Box width="100%" ref={ref} position="relative">
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLeftElement>
            <IoIosSearch size={20} />
          </InputLeftElement>
          <Input
            ref={inputRef}
            variant="outline"
            placeholder="Search movies (3+ chars)..."
            value={query}
            onChange={handleInputChange}
            bg={useColorModeValue("white", "gray.800")}
            borderColor={borderColor}
            _hover={{ borderColor: "purple.300" }}
            _focus={{
              borderColor: "purple.400",
              boxShadow: "0 0 0 1px purple.400",
            }}
          />
        </InputGroup>
      </form>

      {/* Autocomplete Dropdown */}
      {query.length >= 3 && (
        <MotionBox
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          position="absolute"
          top="100%"
          left={0}
          right={0}
          zIndex={2000}
          bg={bg}
          backdropFilter="blur(20px)"
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          shadow="2xl"
          maxH="400px"
          overflowY="auto"
          mt={2}
        >
          {isLoading ? (
            <Box p={6} textAlign="center">
              <Spinner size="sm" color="purple.500" />
              <Text mt={2} fontSize="sm" color="gray.500">
                Searching...
              </Text>
            </Box>
          ) : suggestions.length > 0 ? (
            <VStack spacing={0} align="stretch">
              {suggestions.map((item: any) => (
                <MotionBox
                  key={`${item.type}-${item.id}`}
                  whileHover={{ backgroundColor: hoverBg }}
                  cursor="pointer"
                  onClick={() => handleItemSelect(item)}
                  px={4}
                  py={3}
                  borderBottom="1px solid"
                  borderColor={borderColor}
                  _last={{ borderBottom: "none" }}
                  _hover={{ bg: hoverBg }}
                >
                  <HStack spacing={3}>
                    <Box position="relative">
                      <Image
                        src={`${ImagesPoster}${item.poster_path}`}
                        alt={item.title || item.name}
                        boxSize="40px"
                        objectFit="cover"
                        borderRadius="md"
                        fallback={
                          item.type === "movie" ? (
                            <FaFilm size={20} color="gray" />
                          ) : (
                            <FaTv size={20} color="gray" />
                          )
                        }
                      />
                      {item.type === "tv" && (
                        <Badge
                          position="absolute"
                          top="-2px"
                          right="-2px"
                          bg="purple.500"
                          color="white"
                          borderRadius="full"
                          fontSize="xs"
                          px={1}
                          py={0}
                          fontWeight="bold"
                          size="sm"
                        >
                          TV
                        </Badge>
                      )}
                    </Box>
                    <VStack spacing={0} align="start" flex={1}>
                      <HStack spacing={2} align="center">
                        <Text fontWeight="medium" fontSize="sm" noOfLines={1}>
                          {item.title || item.name}
                        </Text>
                      </HStack>
                      <Text fontSize="xs" color="gray.500">
                        {item.release_date?.substring(0, 4) ||
                          item.first_air_date?.substring(0, 4) ||
                          "TBA"}
                      </Text>
                    </VStack>
                  </HStack>
                </MotionBox>
              ))}
            </VStack>
          ) : query.length > 2 ? (
            <Box p={6} textAlign="center">
              <Text fontSize="sm" color="gray.500">
                No movies found for "{query}"
              </Text>
            </Box>
          ) : null}
        </MotionBox>
      )}
    </Box>
  );
};

export default SearchMovies;
