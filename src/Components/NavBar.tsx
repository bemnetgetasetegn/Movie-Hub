import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchMovies from "./SearchMovies";

interface Props {
  onSearchinput: (searchText: string) => void;
}

const NavBar = ({ onSearchinput }: Props) => {
  return (
    <HStack padding={"10px"}>
      <Image src={logo} boxSize={"50px"}></Image>
      <SearchMovies onSearchinput={onSearchinput} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
