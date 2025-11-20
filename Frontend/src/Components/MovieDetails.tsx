import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Img,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FaStar, FaDollarSign } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import useMovieDetails from "../assets/hooks/useMovieDetails";
import { Images, ImagesPoster } from "../data/TMDBImages";
import useMoviesStore from "../store";
import MovieImages from "./MovieImages";
import FontBold from "./FontBold";
import minutesToReadable from "../services/MinutesToReadable";
import MovieVideos from "./MovieVideos";
import MovieCredits from "./MovieCredits";

const MovieDetails = () => {
  const setMovieQuery = useMoviesStore((s) => s.setGenre);
  const navigation = useNavigate();
  const { movieId } = useParams();

  if (!movieId) return null;
  const { data, isLoading } = useMovieDetails(movieId);
  if (isLoading) return <Spinner />;
  return (
    <>
      <Flex justifyContent={"space-between"}>
        <Box padding={3}>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            bgImg={`linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${Images}${data?.backdrop_path})`}
            bgAttachment={"scroll"}
            bgSize={"cover"}
            bgPosition={"center"}
            bgRepeat={"no-repeat"}
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
            padding={30}
            gap={5}
            borderRadius={10}
            justifyContent={"center"}
            alignItems={"center"}
            
          >
            <Img
              borderRadius={10}
              boxSize={{ md: 400 }}
              objectFit={"contain"}
              src={ImagesPoster + data?.poster_path}
            />
            <Box color={"white"} padding={5}>
              <Heading textAlign={{ base: "center", md: "unset" }}>
                {" "}
                {data?.title}{" "}
                <Text as={"span"} color={"lightgrey"} fontWeight={"medium"}>
                  ({data?.release_date.substring(0, 4)})
                </Text>
              </Heading>
              <Box
                // border={"2px solid"}
                display={"flex"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                width={450}
                pt={3}
                color={"gray.200"}
              >
                <Text> {minutesToReadable(data?.runtime)}</Text>
                <LuDot size={30} />
                <Text>{data?.popularity?.toFixed(1)}</Text>
                <LuDot size={30} />
                <Text>{data?.status}</Text>
              </Box>
              {/* ====overVIew */}
              <Text py={3} fontWeight={"500"} fontSize={"lg"}>
                {data?.overview}
              </Text>

              {/* ====/overVIew */}
              {/* ============displaying revenue ===========*/}
              <HStack pt={1.5}>
                <Text>
                  <FontBold>
                    <Text display="flex" alignItems="center">
                      Revenue:
                      {data?.revenue ? (
                        <Box display="flex" alignItems="center" ml={1}>
                          <FaDollarSign color="green" />
                          <Text as="span" fontWeight={"normal"}>
                            {data.revenue.toLocaleString()}
                          </Text>
                        </Box>
                      ) : (
                        <Text as="span" ml={1}>
                          Unknown
                        </Text>
                      )}
                    </Text>
                  </FontBold>
                </Text>
              </HStack>
              {/* ======== end of displaying revenue ============= */}
              <HStack py={0.5} display={"flex"}>
                <Text fontWeight={"bold"}>Language:</Text>
                {data?.spoken_languages?.map((lang) => (
                  <Text key={lang.iso_639_1}> {lang.english_name},</Text>
                ))}
              </HStack>
              <Text> {data?.tagline}</Text>
              <Text>Vote count: {data?.vote_count}</Text>
              <HStack py={3} display={"flex"}>
                <FaStar color="gold" />
                <Text>
                  <Text as={"span"} fontWeight={"bold"} fontSize={"xl"}>
                    {data?.vote_average}
                  </Text>
                  /10
                </Text>
              </HStack>
              {data?.genres.map((gen, index) => (
                <Button
                  key={index}
                  color={"white"}
                  border={"1px solid white"}
                  bg={"transparent"}
                  margin={2}
                  borderRadius={50}
                  onClick={() => {
                    setMovieQuery(gen);
                    navigation("/");
                  }}
                >
                  {gen.name}
                </Button>
              ))}
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
      <Box>
        <MovieCredits movieId={movieId} />
        <MovieImages movieId={movieId} />
        <MovieVideos movieId={movieId} />
      </Box>
    </>
  );
};

export default MovieDetails;
