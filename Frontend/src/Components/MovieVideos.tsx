import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  AspectRatio,
  Text,
  VStack,
  HStack,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorModeValue,
  Spinner,
  Center,
  Icon,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaPlay, FaYoutube, FaExternalLinkAlt } from "react-icons/fa";
import useVideos from "../assets/hooks/useVIdeos";

interface Props {
  movieId: number | string;
}

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const MovieVideos = ({ movieId }: Props) => {
  const { data: videos, isLoading, error } = useVideos(movieId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("lg", "dark-lg");

  if (isLoading)
    return (
      <Center py={12}>
        <VStack spacing={4}>
          <Spinner size="xl" color="red.500" />
          <Text>Loading videos...</Text>
        </VStack>
      </Center>
    );

  console.log(videos);

  if (error)
    return (
      <Center py={12}>
        <Text color="red.500">Failed to load videos</Text>
      </Center>
    );

  const handleVideoClick = (video: any) => {
    setSelectedVideo(video);
    onOpen();
  };

  const getVideoTypeColor = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
      case "trailer":
        return "red";
      case "teaser":
        return "orange";
      case "clip":
        return "blue";
      case "featurette":
        return "purple";
      case "behind the scenes":
        return "green";
      default:
        return "gray";
    }
  };

  const getVideoTypeIcon = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
      case "trailer":
        return FaYoutube;
      default:
        return FaPlay;
    }
  };

  // Filter and sort videos (prioritize trailers)
  const sortedVideos =
    videos?.results
      ?.filter((video) => video.site === "YouTube")
      ?.sort((a, b) => {
        if (a.type === "Trailer" && b.type !== "Trailer") return -1;
        if (b.type === "Trailer" && a.type !== "Trailer") return 1;
        return 0;
      }) || [];

  if (!sortedVideos.length)
    return (
      <Center py={12}>
        <VStack spacing={4}>
          <Icon as={FaYoutube} size="3xl" color="gray.400" />
          <Text color="gray.500" fontSize="lg">
            No videos available
          </Text>
        </VStack>
      </Center>
    );

  return (
    <Container maxW="container.xl">
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <VStack spacing={8} align="stretch">
          <HStack justify="space-between" align="center">
            <Heading
              size="lg"
              bgGradient="linear(to-r, red.400, pink.400)"
              bgClip="text"
            >
              🎬 Videos & Trailers
            </Heading>
            <Badge colorScheme="red" fontSize="sm" px={3} py={1}>
              {sortedVideos.length} Videos
            </Badge>
          </HStack>

          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={6}
            w="full"
          >
            <AnimatePresence>
              {sortedVideos.slice(0, 8).map((video, index) => {
                const TypeIcon = getVideoTypeIcon(video.type);
                const thumbnailUrl = `https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`;

                return (
                  <MotionVStack
                    key={video.key}
                    spacing={3}
                    align="stretch"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    cursor="pointer"
                    onClick={() => handleVideoClick(video)}
                    borderRadius="xl"
                    overflow="hidden"
                    shadow={cardShadow}
                    bg={cardBg}
                    position="relative"
                  >
                    {/* Thumbnail */}
                    <Box position="relative" overflow="hidden">
                      <AspectRatio ratio={16 / 9}>
                        <MotionBox
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={thumbnailUrl}
                            alt={video.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </MotionBox>
                      </AspectRatio>

                      {/* Play overlay */}
                      <MotionBox
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="rgba(0,0,0,0.4)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        opacity={0}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <MotionBox
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          bg="red.500"
                          borderRadius="full"
                          p={4}
                          shadow="lg"
                        >
                          <FaPlay color="white" size={20} />
                        </MotionBox>
                      </MotionBox>

                      {/* Duration badge */}
                      <Badge
                        position="absolute"
                        top={2}
                        right={2}
                        colorScheme={getVideoTypeColor(video.type)}
                        fontSize="xs"
                      >
                        {video.type}
                      </Badge>
                    </Box>

                    {/* Video info */}
                    <VStack spacing={2} p={4} align="start" flex={1}>
                      <Text
                        fontWeight="bold"
                        fontSize="sm"
                        noOfLines={2}
                        lineHeight="1.3"
                      >
                        {video.name}
                      </Text>

                      <HStack spacing={2} w="full" justify="space-between">
                        <HStack spacing={1}>
                          <Icon as={TypeIcon} w={3} h={3} color="red.500" />
                          <Text fontSize="xs" color="gray.500">
                            YouTube
                          </Text>
                        </HStack>

                        <Button
                          as="a"
                          href={`https://www.youtube.com/watch?v=${video.key}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="xs"
                          variant="ghost"
                          colorScheme="red"
                          rightIcon={<FaExternalLinkAlt />}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Watch
                        </Button>
                      </HStack>
                    </VStack>
                  </MotionVStack>
                );
              })}
            </AnimatePresence>
          </SimpleGrid>

          {sortedVideos.length > 8 && (
            <MotionBox
              textAlign="center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Text color="gray.500" fontSize="sm">
                And {sortedVideos.length - 8} more videos...
              </Text>
            </MotionBox>
          )}
        </VStack>
      </MotionBox>

      {/* Video Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="black" borderRadius="2xl" overflow="hidden">
          <ModalCloseButton color="white" size="lg" />
          <ModalBody p={0}>
            <VStack spacing={0}>
              {/* Video title */}
              <Box p={4} w="full">
                <HStack spacing={3} align="center">
                  <Icon as={FaYoutube} color="red.500" size="lg" />
                  <VStack spacing={0} align="start" flex={1}>
                    <Text color="white" fontWeight="bold" fontSize="lg">
                      {selectedVideo?.name}
                    </Text>
                    <HStack spacing={2}>
                      <Badge
                        colorScheme={getVideoTypeColor(selectedVideo?.type)}
                      >
                        {selectedVideo?.type}
                      </Badge>
                      <Text color="gray.400" fontSize="sm">
                        {selectedVideo?.published_at?.substring(0, 10)}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              </Box>

              {/* Video player */}
              <AspectRatio ratio={16 / 9} w="full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo?.key}?autoplay=1`}
                  title={selectedVideo?.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "0 0 16px 16px" }}
                />
              </AspectRatio>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MovieVideos;
