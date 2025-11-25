import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

interface Props {
  id: number | undefined;
}

const MotionBox = motion(Box);

const WatchMovie = ({ id }: Props) => {
  if (!id) return null;

  const bg = useColorModeValue("gray.50", "gray.900");
  const glassBg = useColorModeValue("rgba(255,255,255,0.1)", "rgba(0,0,0,0.6)");

  return (
    <MotionBox
      as="section"
      bg={bg}
      py={16}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Container maxW="container.xl">
        <VStack spacing={8}>
          {/* Section Header */}
          <MotionBox
            textAlign="center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Heading
              size="xl"
              bgGradient="linear(to-r, purple.500, pink.500)"
              bgClip="text"
              mb={2}
            >
              Watch Movie
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Enjoy the full movie experience
            </Text>
          </MotionBox>

          {/* Video Player Container */}
          <MotionBox
            w="full"
            maxW="1200px"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Box
              bg={glassBg}
              backdropFilter="blur(20px)"
              borderRadius="2xl"
              border="1px solid rgba(255,255,255,0.1)"
              shadow="0 25px 50px rgba(0,0,0,0.3)"
              overflow="hidden"
              position="relative"
              _hover={{
                shadow: "0 35px 70px rgba(0,0,0,0.4)",
                transform: "translateY(-2px)",
              }}
              transition="all 0.3s ease"
            >
              {/* Animated border */}
              <MotionBox
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                borderRadius="2xl"
                bgGradient="linear(to-r, purple.500, pink.500, blue.500)"
                opacity={0.1}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
                zIndex={1}
              />

              {/* Play Icon Overlay */}
              <MotionBox
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                <Box
                  w="80px"
                  h="80px"
                  bg="rgba(0,0,0,0.7)"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backdropFilter="blur(10px)"
                  border="2px solid rgba(255,255,255,0.3)"
                >
                  <FaPlay size={24} color="white" />
                </Box>
              </MotionBox>

              {/* Video Player */}
              <AspectRatio ratio={16 / 9} position="relative" zIndex={3}>
                <iframe
                  src={`https://vidsrc-embed.ru/embed/movie?tmdb=${id}`}
                  allowFullScreen
                  title="Watch Movie"
                  style={{
                    borderRadius: "16px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </AspectRatio>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </MotionBox>
  );
};

export default WatchMovie;
