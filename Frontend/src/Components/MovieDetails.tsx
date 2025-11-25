import { useState, useEffect, useRef } from "react";
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
  VStack,
  IconButton,
  useColorModeValue,
  Container,
  Progress,
  Tooltip,
  chakra,
  GridItem,
  SlideFade,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
  Collapse,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  FaStar,
  FaPlay,
  FaShare,
  FaHeart,
  FaBookmark,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaEye,
  FaThumbsUp,
} from "react-icons/fa";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import useMovieDetails from "../assets/hooks/useMovieDetails";
import { Images, ImagesPoster } from "../data/TMDBImages";
import useMoviesStore from "../store";
import MovieImages from "./MovieImages";
import minutesToReadable from "../services/MinutesToReadable";
import MovieVideos from "./MovieVideos";
import MovieCredits from "./MovieCredits";
import useVideos from "../assets/hooks/useVIdeos";
import WatchMovie from "./WatchMovie";

const MotionBox = motion(chakra.div);
const MotionImg = motion(chakra.img);
const MotionHStack = motion(HStack);

const MovieDetails = () => {
  const setMovieQuery = useMoviesStore((s) => s.setMovieGenre);
  const navigation = useNavigate();
  const { movieId } = useParams();

  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showWatchMovie, setShowWatchMovie] = useState(false);
  const [showCast, setShowCast] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Responsive values
  const headingSize = useBreakpointValue({ base: "3xl", md: "5xl", lg: "6xl" });
  const containerPadding = useBreakpointValue({ base: 4, md: 6 });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const gridLayout = useBreakpointValue({ base: 1, lg: 12 });
  const posterMaxWidth = useBreakpointValue({ base: "150px", md: "200px" });
  // const statsSpacing = useBreakpointValue({ base: 4, md: 6 });

  if (!movieId) return null;
  const { data, isLoading } = useMovieDetails(movieId);
  const { data: videosData } = useVideos(movieId);

  const bgGradient = useColorModeValue(
    "linear(to-br, gray.50, purple.50, pink.50)",
    "linear(to-br, gray.900, purple.900, blue.900)"
  );
  const glassBg = useColorModeValue("rgba(255,255,255,0.1)", "rgba(0,0,0,0.6)");
  const subtle = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    if (data) {
      document.title = `${data.title} — MovieHub`;
    }
  }, [data]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [movieId]);

  const handleGenreClick = (genre: any) => {
    setMovieQuery(genre);
    navigation("/");
  };

  const handleShare = async () => {
    if (navigator.share && data) {
      try {
        await navigator.share({
          title: data.title,
          text: data.overview,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Add toast notification here
    }
  };

  if (isLoading)
    return (
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="black"
      >
        <VStack spacing={4}>
          <MotionBox
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Spinner size="xl" color="purple.500" thickness="4px" />
          </MotionBox>
          <Text color="white" fontSize="lg">
            Loading movie details...
          </Text>
        </VStack>
      </MotionBox>
    );

  return (
    <Box as="section" minH="100vh" bg="black" color="white" overflow="hidden">
      {/* HERO SECTION */}
      <MotionBox
        ref={heroRef}
        position="relative"
        minH={{ base: "70vh", md: "90vh" }}
        overflow="hidden"
        style={{ y, willChange: "transform" }}
        layout="position"
      >
        {/* Backdrop Image */}
        <MotionImg
          src={`${Images}${data?.backdrop_path}`}
          alt={data?.title}
          objectFit="cover"
          width="100%"
          height="100%"
          position="absolute"
          top={0}
          left={0}
          zIndex={0}
          filter="brightness(0.4) contrast(1.1) saturate(1.2)"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          loading="lazy"
          style={{ willChange: "transform" }}
        />

        {/* Gradient overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-t, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.4) 100%)"
          zIndex={1}
        />

        {/* Main Content */}
        <Container
          maxW="container.xl"
          zIndex={3}
          position="relative"
          height="100%"
          py={{ base: 6, md: 8 }}
          px={containerPadding}
        >
          <SimpleGrid
            columns={gridLayout}
            spacing={{ base: 6, lg: 8 }}
            alignItems="center"
            h="100%"
          >
            {/* LEFT: Main content - Full width on mobile */}
            <GridItem colSpan={{ base: 1, lg: 7 }}>
              <Flex
                direction="column"
                align={{ base: "center", md: "start" }}
                textAlign={{ base: "center", md: "left" }}
                gap={{ base: 4, md: 6 }}
                pt={{ base: 8, md: 12 }}
                as={motion.div}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {/* Title */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Heading
                    as="h1"
                    fontSize={headingSize}
                    lineHeight="0.9"
                    letterSpacing={{ base: "-1px", md: "-2px" }}
                    bgGradient="linear(to-r, white, purple.200)"
                    bgClip="text"
                    mb={3}
                  >
                    {data?.title}
                  </Heading>
                  <Text
                    color={subtle}
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="300"
                  >
                    {data?.release_date?.substring(0, 4)} •{" "}
                    {data?.genres?.[0]?.name}
                  </Text>
                </MotionBox>

                {/* Rating - Stack on mobile */}
                <MotionBox
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    align="center"
                    gap={4}
                  >
                    <HStack
                      bg="rgba(255,255,255,0.1)"
                      backdropFilter="blur(10px)"
                      px={{ base: 4, md: 6 }}
                      py={{ base: 2, md: 3 }}
                      borderRadius="full"
                      border="1px solid rgba(255,255,255,0.2)"
                    >
                      <FaStar color="gold" size={18} />
                      <Text
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="bold"
                      >
                        {data?.vote_average?.toFixed(1)}
                      </Text>
                      <VStack spacing={0} align="start">
                        <Text fontSize="xs" color="gray.300">
                          /10
                        </Text>
                        <Text fontSize="xs" color="gray.400">
                          {data?.vote_count?.toLocaleString()} votes
                        </Text>
                      </VStack>
                    </HStack>

                    <VStack spacing={1} align="center">
                      <Progress
                        value={(data?.vote_average || 0) * 10}
                        colorScheme="purple"
                        size="sm"
                        w="60px"
                        borderRadius="full"
                      />
                      <Text fontSize="xs" color="gray.400">
                        Rating
                      </Text>
                    </VStack>
                  </Flex>
                </MotionBox>

                {/* Quick Stats - Moved up for better visibility */}
                <MotionHStack
                  spacing={{ base: 4, md: 6 }}
                  color="gray.400"
                  fontSize="sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  flexWrap="wrap"
                  justify={{ base: "center", md: "start" }}
                  bg="rgba(255,255,255,0.05)"
                  backdropFilter="blur(10px)"
                  borderRadius="full"
                  px={6}
                  py={3}
                  border="1px solid rgba(255,255,255,0.1)"
                >
                  <HStack>
                    <FaClock size={14} />
                    <Text fontWeight="medium">{minutesToReadable(data?.runtime)}</Text>
                  </HStack>
                  <HStack>
                    <FaCalendarAlt size={14} />
                    <Text fontWeight="medium">{data?.release_date?.substring(0, 4)}</Text>
                  </HStack>
                  <HStack>
                    <FaUsers size={14} />
                    <Text fontWeight="medium">{data?.popularity?.toFixed(0)} popularity</Text>
                  </HStack>
                </MotionHStack>

                {/* Action Buttons - Stack on mobile */}
                <MotionHStack
                  spacing={3}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  flexWrap="wrap"
                  justify={{ base: "center", md: "start" }}
                >
                  <Button
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    leftIcon={<FaPlay />}
                    size={buttonSize}
                    bgGradient="linear(to-r, purple.500, pink.500)"
                    color="white"
                    px={{ base: 6, md: 8 }}
                    py={{ base: 3, md: 4 }}
                    borderRadius="full"
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="bold"
                    shadow="0 8px 32px rgba(147, 51, 234, 0.3)"
                    _hover={{
                      bgGradient: "linear(to-r, purple.600, pink.600)",
                      shadow: "0 12px 40px rgba(147, 51, 234, 0.4)",
                    }}
                    onClick={() => setShowWatchMovie(true)}
                  >
                    Watch Now
                  </Button>

                  <Button
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="outline"
                    size={buttonSize}
                    color="white"
                    borderColor="white"
                    borderWidth={2}
                    px={{ base: 5, md: 6 }}
                    py={{ base: 3, md: 4 }}
                    borderRadius="full"
                    fontSize={{ base: "md", md: "lg" }}
                    onClick={() => setShowTrailer(true)}
                    _hover={{
                      bg: "whiteAlpha.200",
                      borderColor: "purple.300",
                    }}
                  >
                    Trailer
                  </Button>
                </MotionHStack>

                {/* Content Toggle Buttons - Wrap on mobile */}
                <MotionHStack
                  spacing={2}
                  wrap="wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  justify={{ base: "center", md: "start" }}
                >
                  <Button
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant={showCast ? "solid" : "outline"}
                    colorScheme="purple"
                    size="sm"
                    leftIcon={<FaUsers />}
                    onClick={() => setShowCast(!showCast)}
                    borderRadius="full"
                    mb={2}
                  >
                    Cast
                  </Button>

                  <Button
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant={showImages ? "solid" : "outline"}
                    colorScheme="purple"
                    size="sm"
                    leftIcon={<FaEye />}
                    onClick={() => setShowImages(!showImages)}
                    borderRadius="full"
                    mb={2}
                  >
                    Images
                  </Button>

                  <Button
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant={showVideos ? "solid" : "outline"}
                    colorScheme="purple"
                    size="sm"
                    leftIcon={<FaPlay />}
                    onClick={() => setShowVideos(!showVideos)}
                    borderRadius="full"
                    mb={2}
                  >
                    Videos
                  </Button>
                </MotionHStack>

                {/* Overview */}
                <MotionBox
                  maxW={{ base: "100%", md: "80%" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <Collapse in={isOverviewOpen} startingHeight={100}>
                    <Text
                      color="gray.300"
                      fontSize={{ base: "md", md: "lg" }}
                      lineHeight="1.6"
                      textAlign={{ base: "center", md: "left" }}
                    >
                      {data?.overview}
                    </Text>
                  </Collapse>

                  <Button
                    as={motion.button}
                    variant="ghost"
                    color="purple.300"
                    onClick={() => setIsOverviewOpen(!isOverviewOpen)}
                    mt={3}
                    size="sm"
                    rightIcon={
                      isOverviewOpen ? <LuChevronUp /> : <LuChevronDown />
                    }
                    whileHover={{ x: 5 }}
                  >
                    {isOverviewOpen ? "Show less" : "Read more"}
                  </Button>
                </MotionBox>

                {/* Genre Pills */}
                <MotionHStack
                  spacing={2}
                  flexWrap="wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  justify={{ base: "center", md: "start" }}
                >
                  {data?.genres?.map((genre) => (
                    <Button
                      key={genre.id}
                      as={motion.button}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(147, 51, 234, 0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      variant="outline"
                      color="white"
                      borderColor="rgba(255,255,255,0.1)"
                      bg="rgba(255,255,255,0.05)"
                      _hover={{
                        bg: "rgba(147, 51, 234, 0.2)",
                        borderColor: "purple.300",
                      }}
                      size="sm"
                      borderRadius="full"
                      onClick={() => handleGenreClick(genre)}
                      mb={2}
                    >
                      {genre.name}
                    </Button>
                  ))}
                </MotionHStack>

              </Flex>
            </GridItem>

            {/* RIGHT: Info Card - Hidden on mobile, shown on desktop */}
            <GridItem
              colSpan={{ base: 1, lg: 5 }}
              display={{ base: "none", lg: "block" }}
            >
              <MotionBox
                initial={{ opacity: 0, y: 50, rotateY: 15 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                borderRadius="2xl"
                overflow="hidden"
                bg={glassBg}
                style={{ backdropFilter: "blur(20px)" }}
                border="1px solid rgba(255,255,255,0.1)"
                shadow="0 25px 50px rgba(0,0,0,0.3)"
                position="relative"
              >
                <VStack spacing={6} p={6} position="relative" zIndex={1}>
                  {/* Poster */}
                  <MotionBox
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <AspectRatio ratio={2 / 3} w="full" maxW={posterMaxWidth}>
                      <Img
                        src={`${ImagesPoster}${data?.poster_path}`}
                        alt={data?.title}
                        borderRadius="xl"
                        shadow="2xl"
                        onLoad={() => setImageLoaded(true)}
                        opacity={imageLoaded ? 1 : 0}
                        transition="opacity 0.3s"
                        loading="lazy"
                      />
                    </AspectRatio>
                  </MotionBox>

                  {/* Stats Grid */}
                  <SimpleGrid columns={2} spacing={4} w="full">
                    <MotionBox
                      whileHover={{ scale: 1.02 }}
                      p={4}
                      bg="rgba(255,255,255,0.05)"
                      borderRadius="lg"
                      textAlign="center"
                    >
                      <FaThumbsUp color="#48BB78" size={20} />
                      <Text fontSize="2xl" fontWeight="bold" color="green.400">
                        {data?.vote_average?.toFixed(1)}
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        Rating
                      </Text>
                    </MotionBox>

                    <MotionBox
                      whileHover={{ scale: 1.02 }}
                      p={4}
                      bg="rgba(255,255,255,0.05)"
                      borderRadius="lg"
                      textAlign="center"
                    >
                      <FaEye color="#4299E1" size={20} />
                      <Text fontSize="2xl" fontWeight="bold" color="blue.400">
                        {data?.popularity?.toFixed(0)}
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        Popularity
                      </Text>
                    </MotionBox>
                  </SimpleGrid>

                  {/* Action Buttons */}
                  <HStack spacing={3} w="full" justify="center">
                    <Tooltip
                      label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <IconButton
                        as={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="favorite"
                        icon={<FaHeart />}
                        color={isFavorite ? "pink.500" : "gray.400"}
                        variant="ghost"
                        size="lg"
                        borderRadius="full"
                        onClick={() => setIsFavorite(!isFavorite)}
                      />
                    </Tooltip>

                    <Tooltip
                      label={
                        isBookmarked
                          ? "Remove from watchlist"
                          : "Add to watchlist"
                      }
                    >
                      <IconButton
                        as={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="bookmark"
                        icon={<FaBookmark />}
                        color={isBookmarked ? "blue.500" : "gray.400"}
                        variant="ghost"
                        size="lg"
                        borderRadius="full"
                        onClick={() => setIsBookmarked(!isBookmarked)}
                      />
                    </Tooltip>

                    <Tooltip label="Share movie">
                      <IconButton
                        as={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="share"
                        icon={<FaShare />}
                        variant="ghost"
                        color="gray.400"
                        size="lg"
                        borderRadius="full"
                        onClick={handleShare}
                      />
                    </Tooltip>
                  </HStack>

                  {/* Tagline */}
                  {data?.tagline && (
                    <MotionBox
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      textAlign="center"
                    >
                      <Text fontStyle="italic" color="purple.200" fontSize="lg">
                        "{data.tagline}"
                      </Text>
                    </MotionBox>
                  )}
                </VStack>
              </MotionBox>
            </GridItem>
          </SimpleGrid>
        </Container>
      </MotionBox>

      {/* Mobile Info Card - Only shown on mobile */}
      <Box display={{ base: "block", lg: "none" }} bg="black" py={6}>
        <Container maxW="container.sm">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            bg={glassBg}
            borderRadius="2xl"
            p={6}
            style={{ backdropFilter: "blur(20px)" }}
            border="1px solid rgba(255,255,255,0.1)"
          >
            <VStack spacing={4}>
              {/* Mobile Poster and Stats */}
              <HStack spacing={4} w="full" align="start">
                <AspectRatio ratio={2 / 3} w="100px">
                  <Img
                    src={`${ImagesPoster}${data?.poster_path}`}
                    alt={data?.title}
                    borderRadius="lg"
                  />
                </AspectRatio>

                <VStack spacing={3} align="start" flex={1}>
                  <SimpleGrid columns={2} spacing={3} w="full">
                    <Box textAlign="center">
                      <FaThumbsUp color="#48BB78" size={16} />
                      <Text fontSize="lg" fontWeight="bold" color="green.400">
                        {data?.vote_average?.toFixed(1)}
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        Rating
                      </Text>
                    </Box>
                    <Box textAlign="center">
                      <FaEye color="#4299E1" size={16} />
                      <Text fontSize="lg" fontWeight="bold" color="blue.400">
                        {data?.popularity?.toFixed(0)}
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        Popularity
                      </Text>
                    </Box>
                  </SimpleGrid>

                  {/* Mobile Action Buttons */}
                  <HStack spacing={2} w="full" justify="center">
                    <IconButton
                      aria-label="favorite"
                      icon={<FaHeart />}
                      color={isFavorite ? "pink.500" : "gray.400"}
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFavorite(!isFavorite)}
                    />
                    <IconButton
                      aria-label="bookmark"
                      icon={<FaBookmark />}
                      color={isBookmarked ? "blue.500" : "gray.400"}
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    />
                    <IconButton
                      aria-label="share"
                      icon={<FaShare />}
                      variant="ghost"
                      color="gray.400"
                      size="sm"
                      onClick={handleShare}
                    />
                  </HStack>
                </VStack>
              </HStack>

              {/* Mobile Tagline */}
              {data?.tagline && (
                <Text
                  fontStyle="italic"
                  color="purple.200"
                  fontSize="md"
                  textAlign="center"
                >
                  "{data.tagline}"
                </Text>
              )}
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* CONTENT SECTIONS */}
      {(showCast || showImages || showVideos) && (
        <MotionBox
          bg={bgGradient}
          py={{ base: 8, md: 16 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Container maxW="container.xl" px={containerPadding}>
            <VStack spacing={{ base: 8, md: 16 }}>
              {showCast && (
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  position="relative"
                >
                  {/* Sticky Cast Header Overlay */}
                  <MotionBox
                    position="sticky"
                    top="20px"
                    zIndex={10}
                    mb={6}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Box
                      bg={useColorModeValue("rgba(255,255,255,0.95)", "rgba(0,0,0,0.95)")}
                      backdropFilter="blur(20px)"
                      borderRadius="2xl"
                      p={6}
                      shadow="2xl"
                      border="1px solid rgba(255,255,255,0.2)"
                      mx="auto"
                      maxW="600px"
                    >
                      <VStack spacing={3}>
                        <Heading
                          size="lg"
                          bgGradient="linear(to-r, purple.500, pink.500)"
                          bgClip="text"
                          textAlign="center"
                        >
                          Cast & Crew
                        </Heading>
                        <Text color="gray.600" fontSize="sm" textAlign="center">
                          Meet the talented people behind the movie
                        </Text>
                      </VStack>
                    </Box>
                  </MotionBox>

                  {/* Cast Content with Background */}
                  <MotionBox
                    bg={useColorModeValue("rgba(255,255,255,0.05)", "rgba(0,0,0,0.3)")}
                    backdropFilter="blur(10px)"
                    borderRadius="2xl"
                    border="1px solid rgba(255,255,255,0.1)"
                    overflow="hidden"
                    shadow="xl"
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <MovieCredits movieId={movieId} />
                  </MotionBox>
                </MotionBox>
              )}

              {showImages && (
                <SlideFade in offsetY={30} delay={0.2}>
                  <MovieImages movieId={movieId} />
                </SlideFade>
              )}

              {showVideos && (
                <SlideFade in offsetY={30} delay={0.4}>
                  <MovieVideos movieId={movieId} />
                </SlideFade>
              )}
            </VStack>
          </Container>
        </MotionBox>
      )}

      {/* MODALS */}
      <Modal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        size={{ base: "full", md: "4xl", lg: "6xl" }}
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="black" borderRadius={{ base: "none", md: "2xl" }}>
          <ModalCloseButton
            color="white"
            size="lg"
            position="absolute"
            top={2}
            right={2}
            zIndex={10}
          />
          <ModalBody p={0}>
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={`https://www.youtube.com/embed/${videosData?.results?.[0]?.key}?autoplay=1`}
                allowFullScreen
                style={{ borderRadius: "16px" }}
              />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={showWatchMovie}
        onClose={() => setShowWatchMovie(false)}
        size="full"
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropFilter="blur(20px)" bg="blackAlpha.800" />
        <ModalContent
          bg="transparent"
          shadow="none"
          maxW="100vw"
          maxH="100vh"
          borderRadius={{ base: "none", md: "2xl" }}
        >
          <ModalCloseButton
            color="white"
            size="lg"
            _hover={{ bg: "whiteAlpha.200" }}
            position="absolute"
            top={2}
            right={2}
            zIndex={10}
          />
          <ModalBody p={0} borderRadius="inherit" overflow="auto">
            <WatchMovie id={data?.id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieDetails;
