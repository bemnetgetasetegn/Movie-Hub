import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Movies } from "../assets/Entities/Movies";
import img from "../assets/img.png";
import { ImagesPoster } from "../data/TMDBImages";
import VoteAverage from "./VoteAverage";
import { FaCalendarAlt, FaStar } from "react-icons/fa";

interface Props {
  movie?: Movies;
}

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const CardComponent = ({ movie }: Props) => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Link to={`/movie/${movie?.id}`}>
      <MotionBox
        bg={bg}
        borderRadius="xl"
        overflow="hidden"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        sx={{ transition: "all 0.3s ease" }}
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        whileTap={{ scale: 0.98 }}
        position="relative"
        _hover={{
          borderColor: "purple.300",
        }}
      >
      {/* Poster Image */}
      <Box position="relative" overflow="hidden">
        <MotionImage
          src={movie?.poster_path ? ImagesPoster + movie.poster_path : img}
          alt={movie?.title}
          objectFit="cover"
          w="full"
          h="400px"
          sx={{ transition: "transform 0.3s ease" }}
          whileHover={{ scale: 1.05 }}
        />

        {/* Overlay gradient */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="50%"
          bgGradient="linear(to-t, rgba(0,0,0,0.8), transparent)"
        />

        {/* Rating badge */}
        <Box position="absolute" top={3} right={3}>
          <Badge
            bg="rgba(0,0,0,0.8)"
            color="yellow.400"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="sm"
            display="flex"
            alignItems="center"
            gap={1}
          >
            <FaStar />
            {movie?.vote_average?.toFixed(1)}
          </Badge>
        </Box>
      </Box>

      {/* Content */}
      <VStack p={4} spacing={2} align="start">
        <Heading
          size="md"
          noOfLines={2}
          color={useColorModeValue("gray.800", "white")}
          _hover={{ color: "purple.500" }}
          transition="color 0.2s"
        >
          {movie?.title}
        </Heading>

        <Text
          color={useColorModeValue("gray.600", "gray.400")}
          fontSize="sm"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <FaCalendarAlt />
          {movie?.release_date?.substring(0, 4)}
        </Text>

        <VoteAverage rating={movie?.vote_average} />
      </VStack>
      </MotionBox>
    </Link>
  );
};

export default CardComponent;
