import { GridItem, SimpleGrid } from "@chakra-ui/react";
import useImages from "../assets/hooks/useImages";

interface Props {
  movieId?: number | string;
}

const MovieImages = ({ movieId }: Props) => {
  if (!movieId) return null;
  const { data: images } = useImages(movieId);
  return (
    <>
      {images?.backdrops?.map((image, index) => (
        <SimpleGrid columns={{ base: 1, lg: 2 }}>
          <GridItem>
            <img
              key={index}
              src={"https://image.tmdb.org/t/p/w300" + image.file_path}
            />
          </GridItem>
        </SimpleGrid>
      ))}
    </>
  );
};

export default MovieImages;
