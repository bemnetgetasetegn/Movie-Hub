import {
  Box,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Avatar,
  Badge,
  useColorModeValue,
  Container,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaUser, FaFemale, FaMale } from "react-icons/fa";
import DefaultProfile from "../assets/DefaultProfile.webp";
import useCredits from "../assets/hooks/useCredits";
import { ImagesPersonProfile } from "../data/TMDBImages";

interface Props {
  movieId: number | string;
}

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const MovieCredits = ({ movieId }: Props) => {
  const { data: credits, error, isLoading } = useCredits(movieId);

  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("lg", "dark-lg");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const subtleText = useColorModeValue("gray.500", "gray.400");

  if (error) return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      textAlign="center"
      py={8}
    >
      <Text color="red.500">{error.message}</Text>
    </MotionBox>
  );

  if (isLoading) return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      textAlign="center"
      py={8}
    >
      <Text>Loading cast...</Text>
    </MotionBox>
  );

  return (
    <Container maxW="container.xl">
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <VStack spacing={8} align="stretch">
          <Heading
            size="lg"
            textAlign="center"
            bgGradient="linear(to-r, purple.400, pink.400)"
            bgClip="text"
            mb={6}
          >
            🎭 Cast & Crew
          </Heading>

          <SimpleGrid
            columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
            spacing={6}
            w="full"
          >
            {credits?.cast?.slice(0, 12).map((person, index) => (
              <MotionVStack
                key={person.id}
                spacing={3}
                align="center"
                p={4}
                bg={cardBg}
                borderRadius="xl"
                shadow={cardShadow}
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                cursor="pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  shadow: "xl",
                  scale: 1.02
                }}
                _hover={{
                  borderColor: "purple.300",
                  shadow: "0 20px 40px rgba(147, 51, 234, 0.1)"
                }}
              >
                {/* Profile Image */}
                <Box position="relative">
                  <Avatar
                    size="xl"
                    src={
                      person.profile_path
                        ? ImagesPersonProfile + person.profile_path
                        : DefaultProfile
                    }
                    name={person.name}
                    borderRadius="lg"
                    shadow="md"
                  />

                  {/* Gender Badge */}
                  <Badge
                    position="absolute"
                    top={-1}
                    right={-1}
                    colorScheme={person.gender === 1 ? "pink" : "blue"}
                    borderRadius="full"
                    size="sm"
                    p={1}
                  >
                    <Icon
                      as={person.gender === 1 ? FaFemale : FaMale}
                      w={3}
                      h={3}
                    />
                  </Badge>
                </Box>

                {/* Cast Info */}
                <VStack spacing={1} textAlign="center" flex={1}>
                  <Text
                    fontWeight="bold"
                    fontSize="sm"
                    color={textColor}
                    noOfLines={2}
                    textAlign="center"
                  >
                    {person.name}
                  </Text>

                  {person.character && (
                    <Text
                      fontSize="xs"
                      color="purple.400"
                      fontWeight="medium"
                      noOfLines={1}
                    >
                      {person.character}
                    </Text>
                  )}

                  <HStack spacing={1} justify="center">
                    <Icon as={FaUser} w={3} h={3} color={subtleText} />
                    <Text fontSize="xs" color={subtleText}>
                      {"Actor"}
                    </Text>
                  </HStack>
                </VStack>
              </MotionVStack>
            ))}
          </SimpleGrid>

          {credits?.cast && credits.cast.length > 12 && (
            <MotionBox
              textAlign="center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Text color={subtleText} fontSize="sm">
                And {credits.cast.length - 12} more cast members...
              </Text>
            </MotionBox>
          )}
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default MovieCredits;
