import { Box, Flex } from "@chakra-ui/react";
import useImages from "../assets/hooks/useImages";
import { Images } from "../data/TMDBImages";

interface Props {
  movieId?: number | string;
}

const MovieImages = ({ movieId }: Props) => {
  if (!movieId) return null;
  const { data: images } = useImages(movieId);
  return (
    <Box padding={5}>
      <Flex overflowX={"scroll"} gap={2}>
        {images?.backdrops?.map((image, index) => (
          <img width={500} key={index} src={Images + image.file_path} />
        ))}
      </Flex>
    </Box>
  );
};

export default MovieImages;
