import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchMovies from "./SearchMovies";
import { Link } from "react-router-dom";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { useState } from "react";

const NavBar = () => {
  const [display, setState] = useState(false);

  return (
    <HStack justifyContent={"space-around"} padding={"10px"}>
      <Link to={"/"}>
        {" "}
        <Image src={logo} objectFit={"cover"} boxSize={"50px"}></Image>
      </Link>
      <Text>HEllo</Text>
      {display ? (
        <IoMdClose
          size={25}
          cursor={"pointer"}
          onClick={() => setState(!display)}
        />
      ) : (
        <IoIosSearch
          size={25}
          cursor={"pointer"}
          onClick={() => setState(!display)}
        />
      )}
      {display && <SearchMovies />}
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
