import {
  Box,
  Text,
  VStack
} from "@chakra-ui/react";
import DefaultProfile from "../assets/DefaultProfile.webp";
import useCredits from "../assets/hooks/useCredits";
import { ImagesPersonProfile } from "../data/TMDBImages";

interface Props {
  movieId: number | string;
}

const MovieCredits = ({ movieId }: Props) => {
  const { data: credits, error } = useCredits(movieId);
  if (error) return <Text>{error.message}</Text>;
  return (
    <Box display="flex" overflowX="auto">
      {credits?.cast.map((c) => (
        <VStack
          key={c.id}
          p={3}
          align="center"
          minW="150px" 
        >
          {/* Profile Image */}
          <img
            src={
              c.profile_path
                ? ImagesPersonProfile + c.profile_path
                : DefaultProfile
            }
            alt={c.name}
            width="100px"
            height="100px"
            style={{ borderRadius: "10px", objectFit: "cover" }}
          />

          {/* Cast Info */}
          <Box textAlign="center">
            <Text fontWeight="bold">{c.name}</Text>
            <Text color="gray.500">{c.original_name}</Text>
            <Text fontSize="sm">
              Gender: {c.gender === 1 ? "Female" : "Male"}
            </Text>
          </Box>
        </VStack>
      ))}
    </Box>
  );
};

export default MovieCredits;
