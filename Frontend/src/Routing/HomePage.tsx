import {
  Box,
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IoIosSearch } from "react-icons/io";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useMoviesStore from "../store";
import GenList from "../Components/GenList";
import GridMain from "../Components/GridMain";
import Sort from "../Components/Sort";
import TVSeriesGrid from "../Components/TVSeriesGrid";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const HomePage = () => {
  const bgGradient = useColorModeValue(
    "linear(to-br, gray.50, purple.50, pink.50)",
    "linear(to-br, gray.900, purple.900, blue.900)"
  );
  const setSearchInput = useMoviesStore((s) => s.setSearch);
  const ref = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();

  return (
    <MotionBox
      minH="100vh"
      bg={bgGradient}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Hero Section */}
          <MotionBox
            textAlign="center"
            py={12}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Heading
              size="2xl"
              bgGradient="linear(to-r, purple.500, pink.500, blue.500)"
              bgClip="text"
              mb={4}
            >
              Discover Movies & TV Series
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
              Explore the latest movies and TV series, filter by genre, and find your next favorite entertainment
            </Text>
          </MotionBox>

          {/* Filters Section - Now inside tabs */}

          {/* Big Search Bar */}
          <MotionBox
            maxW="600px"
            w="full"
            mx="auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (ref.current?.value) {
                  setSearchInput(ref.current.value);
                  navigation("/search");
                }
              }}
            >
              <InputGroup size="lg">
                <InputLeftElement h="16" pointerEvents="none">
                  <IoIosSearch size={20} />
                </InputLeftElement>
                <Input
                  ref={ref}
                  placeholder="Search for movies and TV series..."
                  bg={useColorModeValue("white", "gray.800")}
                  border="2px solid"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                  _hover={{
                    borderColor: "purple.300",
                  }}
                  _focus={{
                    borderColor: "purple.500",
                    boxShadow: "0 0 0 1px purple.500",
                  }}
                  borderRadius="full"
                  fontSize="lg"
                  h="16"
                  pl="12"
                  shadow="md"
                />
              </InputGroup>
            </form>
          </MotionBox>

          {/* Movies & TV Series Tabs */}
          <MotionBox
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Tabs variant="soft-rounded" colorScheme="purple" size="lg">
              <TabList justifyContent="center" mb={8}>
                <Tab fontWeight="bold">Movies</Tab>
                <Tab fontWeight="bold">TV Series</Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  {/* Filters for Movies */}
                  <MotionFlex
                    justify="center"
                    gap={6}
                    wrap="wrap"
                    mb={8}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <GenList type="movie" />
                    <Sort type="movie" />
                  </MotionFlex>
                  <GridMain />
                </TabPanel>
                <TabPanel px={0}>
                  {/* Filters for TV Series */}
                  <MotionFlex
                    justify="center"
                    gap={6}
                    wrap="wrap"
                    mb={8}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <GenList type="tv" />
                    <Sort type="tv" />
                  </MotionFlex>
                  <TVSeriesGrid />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </MotionBox>
        </VStack>
      </Container>
    </MotionBox>
  );
};

export default HomePage;
