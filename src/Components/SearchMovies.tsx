import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  onSearchinput: (searchText: string) => void;
}

const SearchMovies = ({ onSearchinput }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearchinput(ref.current.value);
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
