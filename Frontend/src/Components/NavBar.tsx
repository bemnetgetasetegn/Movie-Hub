import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoIosSearch, IoMdClose, IoMdMenu } from "react-icons/io";
import { FaUser, FaHome, FaFire, FaTv } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchMovies from "./SearchMovies";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

// --- Navigation Links (for easier maintenance) ---
const navLinks = [
  { name: "Home", to: "/", icon: FaHome },
  { name: "Movies", to: "/movie", icon: FaFire },
  { name: "TV Series", to: "/tv", icon: FaTv },
  // Add more links here
];

const NavBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bg = useColorModeValue("rgba(255,255,255,0.9)", "rgba(10,10,10,0.9)");
  const borderColor = useColorModeValue("gray.100", "gray.800");
  const hoverBg = useColorModeValue("purple.50", "purple.900");

  return (
    <>
      <MotionBox
        as="nav"
        position="sticky"
        top={0}
        zIndex={100}
        bg={bg}
        backdropFilter="blur(15px)"
        borderBottom="1px solid"
        borderColor={borderColor}
        shadow="xl"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      >
        <Flex
          maxW="container.xl"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={4}
          align="center"
          justify="space-between"
        >
          {/* Logo */}
          <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/">
              <Image
                src={logo}
                alt="Logo"
                boxSize={{ base: "36px", md: "42px" }}
                borderRadius="lg"
                shadow="lg"
              />
            </Link>
          </MotionBox>

          {/* Desktop Navigation Links (unchanged) */}
          <HStack spacing={6} display={{ base: "none", md: "flex" }}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.to}>
                <MotionButton
                  variant="ghost"
                  leftIcon={<link.icon />}
                  colorScheme="purple"
                  fontSize="md"
                  fontWeight="medium"
                  _hover={{
                    bg: hoverBg,
                  }}
                  p={2}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </MotionButton>
              </Link>
            ))}
          </HStack>

          {/* Controls (unchanged) */}
          <HStack spacing={{ base: 1, md: 3 }}>
            <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                aria-label="Toggle search"
                icon={isSearchOpen ? <IoMdClose /> : <IoIosSearch />}
                variant="ghost"
                size="lg"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                colorScheme="purple"
                isRound
                _hover={{ bg: hoverBg }}
              />
            </MotionBox>

            <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                aria-label="User profile"
                icon={<FaUser />}
                variant="ghost"
                size="lg"
                colorScheme="purple"
                isRound
                _hover={{ bg: hoverBg }}
              />
            </MotionBox>

            <ColorModeSwitch />

            <IconButton
              aria-label="Open menu"
              icon={<IoMdMenu />}
              variant="ghost"
              size="lg"
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              colorScheme="purple"
              isRound
              _hover={{ bg: hoverBg }}
            />
          </HStack>
        </Flex>
        {isSearchOpen && (
          <MotionBox
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.4,
              // *** FIX APPLIED HERE ***
              ease: [0.4, 0, 0.2, 1], // Passed as an array of numbers
            }}
            px={{ base: 4, md: 8 }}
            pb={4}
            pt={2}
          >
            <SearchMovies />
          </MotionBox>
        )}
      </MotionBox>

      {/* Mobile Drawer (unchanged) */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue("white", "gray.900")}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            <Text fontSize="xl" fontWeight="extrabold" color="purple.500">
              Navigation
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={2} align="stretch">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.to} onClick={onClose}>
                  <MotionButton
                    variant="ghost"
                    justifyContent="flex-start"
                    leftIcon={<link.icon />}
                    colorScheme="purple"
                    fontWeight="semibold"
                    size="lg"
                    py={6}
                    _hover={{ bg: hoverBg }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.name}
                  </MotionButton>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
