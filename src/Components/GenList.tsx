import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useGenre from "../assets/hooks/useGenre";
import useMoviesStore from "../store";

const GenList = () => {
  const { data: genre } = useGenre();
  const setGenreId = useMoviesStore((s) => s.setGenre);
  const genreName = useMoviesStore((s) => s.movieQuery.genre?.name);

  const currentGenreName = genre?.genres?.find((gen) => genreName === gen.name);

  return (
    <Menu>
      <MenuButton as={Button}>
        Genre: {currentGenreName?.name || "None"}
      </MenuButton>
      <MenuList>
        {genre?.genres?.map((gen) => (
          <MenuItem
            key={gen.id}
            value={gen.name}
            onClick={() => setGenreId(gen)}
          >
            {gen.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GenList;
