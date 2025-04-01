import { Box, Spinner } from "@chakra-ui/react";
import useVideos from "../assets/hooks/useVIdeos";

interface Props {
  movieId: number | string;
}

const MovieVideos = ({ movieId }: Props) => {
  const { data: videos } = useVideos(movieId);
  if (!videos?.results) return <Spinner />;
  const official = videos.results.find(
    (video) => video.type === "Trailer" && video.name?.includes("Official")
  );
  if (!official) return "No official trailer";
  return (
    <Box>
      <Box
        as="iframe"
        src={`https:/www.youtube.com/embed/${official?.key}`}
        width={"100%"}
        height={"600px"}
        title="Movie Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        padding={5}
      ></Box>
    </Box>
  );
};

export default MovieVideos;
