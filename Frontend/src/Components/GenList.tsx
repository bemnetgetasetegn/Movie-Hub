import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import useGenre from "../assets/hooks/useGenre";
import useMoviesStore from "../store";

const MotionButton = motion(Button);

interface Props {
  type?: 'movie' | 'tv';
}

const GenList = ({ type = 'movie' }: Props) => {
  const { data: genre } = useGenre();
  const setMovieGenre = useMoviesStore((s) => s.setMovieGenre);
  const setTVGenre = useMoviesStore((s) => s.setTVGenre);
  const movieGenreName = useMoviesStore((s) => s.movieQuery.genre?.name);
  const tvGenreName = useMoviesStore((s) => s.tvQuery.genre?.name);

  const currentGenreName = genre?.genres?.find((gen) =>
    type === 'movie' ? movieGenreName === gen.name : tvGenreName === gen.name
  );

  const setGenreId = type === 'movie' ? setMovieGenre : setTVGenre;

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Menu>
      <MenuButton
        as={MotionButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        leftIcon={<FaFilter />}
        bg={bg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="full"
        px={6}
        py={3}
        shadow="md"
        _hover={{
          bg: useColorModeValue("purple.50", "purple.900"),
          borderColor: "purple.300",
          shadow: "lg",
        }}
        transition="all 0.2s"
      >
        Genre: {currentGenreName?.name || "All"}
      </MenuButton>
      <MenuList
        bg={bg}
        borderColor={borderColor}
        shadow="xl"
        borderRadius="lg"
      >
        {genre?.genres?.map((gen) => (
          <MenuItem
            key={gen.id}
            value={gen.name}
            onClick={() => setGenreId(gen)}
            _hover={{
              bg: useColorModeValue("purple.50", "purple.900"),
              color: "purple.600",
            }}
          >
            {gen.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GenList;
