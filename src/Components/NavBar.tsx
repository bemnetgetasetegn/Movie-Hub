import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchMovies from "./SearchMovies";

const NavBar = () => {
  return (
    <HStack padding={"10px"}>
      <Image src={logo} boxSize={"50px"}></Image>
      <SearchMovies />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
