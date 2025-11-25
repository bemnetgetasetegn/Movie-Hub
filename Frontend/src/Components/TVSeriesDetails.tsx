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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
  Collapse,
  Badge,
} from "@chakra-ui/react";
import {
  FaStar,
  FaPlay,
  FaShare,
  FaHeart,
  FaBookmark,
  FaCalendarAlt,
  FaUsers,
  FaEye,
  FaThumbsUp,
  FaTv,
} from "react-icons/fa";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { motion, useScroll, useTransform } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  useTVSeriesDetails,
  useSeasonEpisodes,
  useTVSeriesExternalIds,
} from "../assets/hooks/useTVSeries";
import { Images, ImagesPoster } from "../data/TMDBImages";

const MotionBox = motion(chakra.div);
const MotionImg = motion(chakra.img);
const MotionHStack = motion(HStack);

const TVSeriesDetails = () => {
  const { seriesId } = useParams();
  // const navigation = useNavigate();

  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [showEpisodesModal, setShowEpisodesModal] = useState(false);
  const [playingEpisode, setPlayingEpisode] = useState<{
    season: number;
    episode: number;
  } | null>(null);
  // const [showTrailer, setShowTrailer] = useState(false); // TODO: Add TV series videos

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  if (!seriesId) return null;
  const { data, isLoading } = useTVSeriesDetails(seriesId);
  const { data: externalIds } = useTVSeriesExternalIds(seriesId);
  const { data: seasonData, isLoading: seasonLoading } = useSeasonEpisodes(
    seriesId,
    selectedSeason || undefined
  );

  const glassBg = useColorModeValue("rgba(255,255,255,0.1)", "rgba(0,0,0,0.6)");
  const subtle = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    if (data) {
      document.title = `${data.name} — MovieHub`;
    }
  }, [data]);

  const handleShare = async () => {
    if (navigator.share && data) {
      try {
        await navigator.share({
          title: data.name,
          text: data.overview,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
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
            Loading TV series details...
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
          alt={data?.name}
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
        >
          <SimpleGrid
            columns={{ base: 1, lg: 12 }}
            spacing={{ base: 6, lg: 8 }}
            alignItems="center"
            h="100%"
          >
            {/* LEFT: Main content */}
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
                    fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                    lineHeight="0.9"
                    letterSpacing={{ base: "-1px", md: "-2px" }}
                    bgGradient="linear(to-r, white, purple.200)"
                    bgClip="text"
                    mb={3}
                  >
                    {data?.name}
                  </Heading>
                  <Text
                    color={subtle}
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="300"
                  >
                    {data?.first_air_date?.substring(0, 4)} •{" "}
                    {data?.genres?.[0]?.name} • {data?.number_of_seasons} Season
                    {data?.number_of_seasons !== 1 ? "s" : ""}
                  </Text>
                </MotionBox>

                {/* Rating */}
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

                {/* Action Buttons */}
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
                    size="lg"
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
                  >
                    Watch Now
                  </Button>

                  {/* Trailer button removed for now - TODO: Add TV series videos */}
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

                {/* Quick Stats */}
                <MotionHStack
                  spacing={{ base: 4, md: 6 }}
                  color="gray.400"
                  fontSize="sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
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
                    <FaCalendarAlt size={14} />
                    <Text fontWeight="medium">
                      {data?.first_air_date?.substring(0, 4)}
                    </Text>
                  </HStack>
                  <HStack>
                    <FaTv size={14} />
                    <Text fontWeight="medium">
                      {data?.number_of_seasons} Season
                      {data?.number_of_seasons !== 1 ? "s" : ""}
                    </Text>
                  </HStack>
                  <HStack>
                    <FaUsers size={14} />
                    <Text fontWeight="medium">
                      {data?.popularity?.toFixed(0)} popularity
                    </Text>
                  </HStack>
                </MotionHStack>
              </Flex>
            </GridItem>

            {/* RIGHT: Info Card */}
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
                    <AspectRatio ratio={2 / 3} w="full" maxW="200px">
                      <Img
                        src={`${ImagesPoster}${data?.poster_path}`}
                        alt={data?.name}
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

                    <Tooltip label="Share series">
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

      {/* SEASONS & EPISODES SECTION */}
      <Box bg="black" color="white" py={{ base: 8, md: 16 }}>
        <Container maxW="container.xl" px={4}>
          <VStack spacing={{ base: 8, md: 16 }}>
            {/* Seasons */}
            {data?.seasons && data.seasons.length > 0 && (
              <VStack spacing={6} w="full" align="start">
                <Heading size="lg" color="white">
                  Seasons
                </Heading>
                <SimpleGrid
                  columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  spacing={4}
                  w="full"
                >
                  {data.seasons
                    .filter((season) => season.season_number > 0) // Filter out specials
                    .map((season) => (
                      <MotionBox
                        key={season.id}
                        bg="gray.800"
                        borderRadius="lg"
                        overflow="hidden"
                        shadow="md"
                        cursor="pointer"
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedSeason(season.season_number);
                          setShowEpisodesModal(true);
                        }}
                        border={
                          selectedSeason === season.season_number
                            ? "2px solid"
                            : "1px solid"
                        }
                        borderColor={
                          selectedSeason === season.season_number
                            ? "purple.500"
                            : "gray.600"
                        }
                      >
                        <Box position="relative">
                          <Img
                            src={
                              season.poster_path
                                ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                                : "/placeholder.jpg"
                            }
                            alt={season.name}
                            w="full"
                            h="200px"
                            objectFit="cover"
                          />
                          <Box
                            position="absolute"
                            top={2}
                            right={2}
                            bg="rgba(0,0,0,0.8)"
                            color="white"
                            px={2}
                            py={1}
                            borderRadius="md"
                            fontSize="sm"
                            fontWeight="bold"
                          >
                            Season {season.season_number}
                          </Box>
                        </Box>
                        <VStack p={4} spacing={2} align="start">
                          <Text fontWeight="bold" fontSize="md" noOfLines={1} color="white">
                            {season.name}
                          </Text>
                          <Text fontSize="sm" color="gray.300">
                            {season.episode_count} Episodes
                          </Text>
                          {season.air_date && (
                            <Text fontSize="sm" color="gray.400">
                              {new Date(season.air_date).getFullYear()}
                            </Text>
                          )}
                        </VStack>
                      </MotionBox>
                    ))}
                </SimpleGrid>
              </VStack>
            )}

            {/* Episodes Modal */}
            <Modal
              isOpen={showEpisodesModal}
              onClose={() => {
                setShowEpisodesModal(false);
                setSelectedSeason(null);
                setPlayingEpisode(null);
              }}
              size={{ base: "full", md: "4xl", lg: "6xl" }}
              scrollBehavior="inside"
              isCentered
              motionPreset="slideInBottom"
            >
              <ModalOverlay backdropFilter="blur(10px)" />
              <ModalContent
                bg={useColorModeValue("white", "gray.800")}
                borderRadius={{ base: "none", md: "2xl" }}
                maxH={{ base: "100vh", md: "90vh" }}
                minH={{ base: "100vh", md: "auto" }}
                margin={0}
              >
                <ModalHeader
                  borderBottomWidth="1px"
                  pb={4}
                  pt={{ base: 6, md: 4 }}
                  px={{ base: 4, md: 6 }}
                >
                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    align={{ base: "start", sm: "center" }}
                    justify="space-between"
                    gap={3}
                  >
                    <HStack spacing={3} align="center">
                      <FaTv />
                      <VStack spacing={0} align="start">
                        <Text
                          fontSize={{ base: "md", md: "xl" }}
                          fontWeight="bold"
                        >
                          {data?.name}
                        </Text>
                        <Text
                          fontSize={{ base: "sm", md: "lg" }}
                          color="gray.500"
                        >
                          Season {selectedSeason}
                        </Text>
                      </VStack>
                    </HStack>

                    {seasonData?.episodes && (
                      <Badge
                        colorScheme="purple"
                        fontSize="sm"
                        alignSelf={{ base: "start", sm: "center" }}
                      >
                        {seasonData.episodes.length} Episodes
                      </Badge>
                    )}
                  </Flex>
                </ModalHeader>

                <ModalCloseButton
                  size="lg"
                  top={{ base: 4, md: 4 }}
                  right={{ base: 4, md: 4 }}
                />

                <ModalBody
                  py={6}
                  px={{ base: 4, md: 6 }}
                  maxH={{ base: "80vh", md: "70vh" }}
                  overflowY="auto"
                >
                  {/* Inline Video Player - Full Modal When Playing */}
                  {playingEpisode ? (
                    <VStack spacing={6} align="stretch">
                      <AspectRatio
                        ratio={16 / 9}
                        w="full"
                        borderRadius="lg"
                        overflow="hidden"
                        shadow="2xl"
                      >
                        <iframe
                          src={`https://vidsrc-embed.ru/embed/tv?imdb=${externalIds?.imdb_id || data?.id}&s=${playingEpisode.season}&e=${playingEpisode.episode}`}
                          allowFullScreen
                          style={{ width: "100%", height: "100%" }}
                          title={`Playing ${data?.name} S${playingEpisode.season}E${playingEpisode.episode}`}
                        />
                      </AspectRatio>

                      <VStack spacing={4}>
                        <Text
                          fontSize={{ base: "md", md: "lg" }}
                          fontWeight="bold"
                          textAlign="center"
                        >
                          Now Playing: {data?.name} - S{playingEpisode.season}E{playingEpisode.episode}
                        </Text>

                        <HStack spacing={4} justify="center" flexWrap="wrap">
                          <Button
                            colorScheme="purple"
                            onClick={() => setPlayingEpisode(null)}
                            leftIcon={<FaPlay />}
                            size={{ base: "sm", md: "md" }}
                          >
                            Back to Episodes
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => {
                              const url = `https://vidsrc-embed.ru/embed/tv?imdb=${externalIds?.imdb_id || data?.id}&s=${playingEpisode.season}&e=${playingEpisode.episode}`;
                              window.open(url, '_blank');
                            }}
                            leftIcon={<FaShare />}
                            size={{ base: "sm", md: "md" }}
                          >
                            Open in New Tab
                          </Button>
                        </HStack>
                      </VStack>
                    </VStack>
                  ) : seasonLoading ? (
                    <VStack spacing={4} py={8}>
                      <Spinner size="lg" color="purple.500" />
                      <Text fontSize={{ base: "sm", md: "md" }}>
                        Loading episodes...
                      </Text>
                    </VStack>
                  ) : seasonData?.episodes ? (
                    <VStack
                      spacing={4}
                      align="stretch"
                      maxH={{
                        base: "calc(100vh - 200px)",
                        md: "60vh",
                      }}
                      overflowY="auto"
                      pb={2}
                    >
                      {seasonData.episodes.map((episode) => (
                        <MotionBox
                          key={episode.id}
                          bg={useColorModeValue("gray.50", "gray.700")}
                          borderRadius="lg"
                          p={4}
                          cursor="pointer"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            if (selectedSeason) {
                              setPlayingEpisode({
                                season: selectedSeason,
                                episode: episode.episode_number,
                              });
                            }
                          }}
                          transition={{ duration: 0.2 }}
                          _hover={{
                            bg: useColorModeValue("gray.100", "gray.600"),
                          }}
                        >
                          <HStack spacing={4} align="start">
                            <Box position="relative" flexShrink={0}>
                              <Img
                                src={episode.still_path ? `https://image.tmdb.org/t/p/w300${episode.still_path}` : '/placeholder.jpg'}
                                alt={episode.name}
                                w="150px"
                                h="100px"
                                objectFit="cover"
                                borderRadius="md"
                                shadow="md"
                              />
                              <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                bg="rgba(0,0,0,0.8)"
                                color="white"
                                borderRadius="full"
                                w="40px"
                                h="40px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                shadow="lg"
                              >
                                <FaPlay size={16} />
                              </Box>
                            </Box>

                            <VStack spacing={2} align="start" flex={1}>
                              <HStack spacing={3} align="center">
                                <Badge colorScheme="purple" fontSize="sm">
                                  Episode {episode.episode_number}
                                </Badge>
                                {episode.runtime && (
                                  <Text fontSize="sm" color="gray.500">
                                    {episode.runtime} min
                                  </Text>
                                )}
                                {episode.air_date && (
                                  <Text fontSize="sm" color="gray.500">
                                    {new Date(episode.air_date).toLocaleDateString()}
                                  </Text>
                                )}
                              </HStack>

                              <Text fontWeight="bold" fontSize="lg">
                                {episode.name}
                              </Text>

                              <Text fontSize="sm" color="gray.600" noOfLines={3}>
                                {episode.overview || "No description available for this episode."}
                              </Text>
                            </VStack>
                          </HStack>
                        </MotionBox>
                      ))}
                    </VStack>
                  ) : (
                    <VStack spacing={4} py={8} textAlign="center">
                      <FaTv
                        size={48}
                        color={useColorModeValue("gray.300", "gray.600")}
                      />
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        color="gray.500"
                      >
                        No episodes found for this season.
                      </Text>
                      <Button
                        variant="outline"
                        onClick={() => setShowEpisodesModal(false)}
                        size="sm"
                      >
                        Close
                      </Button>
                    </VStack>
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </VStack>
        </Container>
      </Box>

      {/* Trailer modal removed for now - TODO: Add TV series videos */}
    </Box>
  );
};

export default TVSeriesDetails;
