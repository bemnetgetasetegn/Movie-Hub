import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useMoviesStore from "../store";

const SearchMovies = () => {
  const setSearchInput = useMoviesStore((s) => s.setSearch);
  const ref = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          setSearchInput(ref.current.value);
          navigation("/search");
        }
      }}
    >
      <InputGroup>
        <InputLeftElement />
        <Input ref={ref} variant={"outline"} />
      </InputGroup>
    </form>
  );
};

export default SearchMovies;
