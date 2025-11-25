import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaExpand } from "react-icons/fa";
import useImages from "../assets/hooks/useImages";
import { Images } from "../data/TMDBImages";

interface Props {
  movieId?: number | string ;
}

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const MovieImages = ({ movieId }: Props) => {
  const { data: images, isLoading, error } = useImages(movieId || '');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("lg", "dark-lg");

  if (!movieId) return null;

  if (isLoading)
    return (
      <Center py={12}>
        <VStack spacing={4}>
          <Spinner size="xl" color="purple.500" />
          <Text>Loading images...</Text>
        </VStack>
      </Center>
    );

  if (error)
    return (
      <Center py={12}>
        <Text color="red.500">Failed to load images</Text>
      </Center>
    );

  const handleImageClick = (image: any, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    onOpen();
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % (images?.backdrops?.length || 1);
    setCurrentIndex(nextIndex);
    setSelectedImage(images?.backdrops?.[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      currentIndex === 0
        ? (images?.backdrops?.length || 1) - 1
        : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(images?.backdrops?.[prevIndex]);
  };

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
              bgGradient="linear(to-r, blue.400, purple.400)"
              bgClip="text"
            >
              📸 Movie Gallery
            </Heading>
            <Badge colorScheme="purple" fontSize="sm" px={3} py={1}>
              {images?.backdrops?.length || 0} Images
            </Badge>
          </HStack>

          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={6}
            w="full"
          >
            <AnimatePresence>
              {images?.backdrops?.slice(0, 8).map((image, index) => (
                <MotionBox
                  key={image.file_path}
                  position="relative"
                  borderRadius="xl"
                  overflow="hidden"
                  cursor="pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => handleImageClick(image, index)}
                  shadow={cardShadow}
                  bg={cardBg}
                >
                  <Box position="relative" overflow="hidden">
                    <MotionImage
                      src={`${Images}${image.file_path}`}
                      alt={`Movie image ${index + 1}`}
                      width="100%"
                      height="200px"
                      objectFit="cover"
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.1 }}
                    />

                    {/* Overlay with expand icon */}
                    <MotionBox
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg="rgba(0,0,0,0.6)"
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
                      >
                        <FaExpand color="white" size={24} />
                      </MotionBox>
                    </MotionBox>

                    {/* Image info overlay */}
                    <Box
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                      p={3}
                    >
                      <HStack justify="space-between" align="center">
                        {/* <Text color="white" fontSize="xs" fontWeight="bold">
                          {image} × {image.height}
                        </Text> */}
                        <Badge colorScheme="purple" size="sm">
                          {index + 1}
                        </Badge>
                      </HStack>
                    </Box>
                  </Box>
                </MotionBox>
              ))}
            </AnimatePresence>
          </SimpleGrid>

          {images?.backdrops && images.backdrops.length > 8 && (
            <MotionBox
              textAlign="center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Text color="gray.500" fontSize="sm">
                And {images.backdrops.length - 8} more images...
              </Text>
            </MotionBox>
          )}
        </VStack>
      </MotionBox>

      {/* Image Modal/Lightbox */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="black" borderRadius="2xl" overflow="hidden">
          <ModalCloseButton color="white" size="lg" />
          <ModalBody p={0} position="relative">
            <AnimatePresence mode="wait">
              <MotionBox
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={`${Images}${selectedImage?.file_path}`}
                  alt="Movie image"
                  width="100%"
                  height="auto"
                  maxH="80vh"
                  objectFit="contain"
                />
              </MotionBox>
            </AnimatePresence>

            {/* Navigation arrows */}
            {images?.backdrops && images.backdrops.length > 1 && (
              <>
                <MotionBox
                  position="absolute"
                  left={4}
                  top="50%"
                  transform="translateY(-50%)"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevImage}
                  cursor="pointer"
                  bg="rgba(0,0,0,0.5)"
                  borderRadius="full"
                  p={3}
                  color="white"
                >
                  ‹
                </MotionBox>
                <MotionBox
                  position="absolute"
                  right={4}
                  top="50%"
                  transform="translateY(-50%)"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextImage}
                  cursor="pointer"
                  bg="rgba(0,0,0,0.5)"
                  borderRadius="full"
                  p={3}
                  color="white"
                >
                  ›
                </MotionBox>
              </>
            )}

            {/* Image counter */}
            <Box
              position="absolute"
              bottom={4}
              left="50%"
              transform="translateX(-50%)"
              bg="rgba(0,0,0,0.7)"
              color="white"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
            >
              {currentIndex + 1} / {images?.backdrops?.length || 0}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MovieImages;
