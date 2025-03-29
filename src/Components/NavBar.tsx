import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchMovies from "./SearchMovies";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <HStack padding={"10px"}>
      <Link to={"/"}>
        {" "}
        <Image src={logo} objectFit={"cover"} boxSize={"50px"}></Image>
      </Link>
      <SearchMovies />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
