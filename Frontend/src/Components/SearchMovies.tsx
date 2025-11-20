import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useMoviesStore from "../store";

const SearchMovies = () => {
  const setSearchInput = useMoviesStore((s) => s.setSearch);
  const ref = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();

  return (
    <Box width={"100%"}>
      <Box width={"100%"}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (ref.current?.value) {
              setSearchInput(ref.current.value);
              navigation("/search");
            }
          }}
        >
          <InputGroup>
            <InputLeftElement>
              <IoIosSearch size={20} />
            </InputLeftElement>
            <Input ref={ref} variant={"outline"} />
          </InputGroup>
        </form>
      </Box>
    </Box>
  );
};

export default SearchMovies;
