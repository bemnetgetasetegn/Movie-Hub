import {
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchMovies from "./SearchMovies";

const NavBar = () => {
  const [display, setState] = useState(false);

  return (
    <HStack justifyContent={"space-around"} padding={"10px"}>
      <a href="/">
        <Image src={logo} objectFit={"cover"} boxSize={"50px"}></Image>
      </a>{" "}
      {!display && (
        <Menu>
          <MenuButton as={Button}>Movies</MenuButton>
          <MenuList>
            <MenuItem>
              <Link to={"/tv"}>Popular</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/tv/now-playing"}>Now Playing</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/tv/upcoming"}>Upcoming</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"/tv/top-rated"}>Top Rated</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
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
