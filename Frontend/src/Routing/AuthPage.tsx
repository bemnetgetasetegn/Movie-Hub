import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Card,
  Heading,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../Components/LoginComponent";
import SignupForm from "../Components/SignInComponent";

// Motion components for animations
const MotionBox = motion(Box);

// Main Unified Auth Page
const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Dark mode colors
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, gray.900, purple.900)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const leftPanelGradient = useColorModeValue(
    "linear(to-br, purple.600, blue.600)",
    "linear(to-br, purple.800, gray.900)"
  );
  const leftPanelText = useColorModeValue("white", "purple.100");
  const leftPanelSubtext = useColorModeValue("whiteAlpha.900", "purple.200");
  const buttonHoverBg = useColorModeValue("whiteAlpha.300", "purple.700");

  // Scroll to form on mobile when tab changes
  useEffect(() => {
    if (isMobile && formContainerRef.current) {
      // Small timeout to ensure the form has rendered after animation
      const timer = setTimeout(() => {
        formContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [activeTab, isMobile]);

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={4}
      bgGradient={bgGradient}
    >
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        w="full"
        maxW="6xl"
      >
        <Card boxShadow="2xl" borderRadius="2xl" overflow="hidden" bg={cardBg}>
          <Flex
            direction={{ base: "column", md: "row" }}
            minH={{ md: "600px" }}
          >
            {/* Left Panel - Tab Selection */}
            <Box
              bgGradient={leftPanelGradient}
              color={leftPanelText}
              p={8}
              flex={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              order={{ base: 1, md: 1 }}
            >
              <VStack spacing={8} align="start">
                <VStack spacing={2} align="start">
                  <Heading size="xl" color={leftPanelText}>
                    MovieHub
                  </Heading>
                  <Text fontSize="lg" color={leftPanelSubtext}>
                    Your personal movie tracking companion
                  </Text>
                </VStack>

                <VStack spacing={4} w="full">
                  <Button
                    variant={activeTab === "login" ? "solid" : "outline"}
                    colorScheme="whiteAlpha"
                    size="lg"
                    w="full"
                    onClick={() => handleTabChange("login")}
                    _hover={{
                      bg:
                        activeTab === "login"
                          ? buttonHoverBg
                          : "whiteAlpha.200",
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant={activeTab === "signup" ? "solid" : "outline"}
                    colorScheme="whiteAlpha"
                    size="lg"
                    w="full"
                    onClick={() => handleTabChange("signup")}
                    _hover={{
                      bg:
                        activeTab === "signup"
                          ? buttonHoverBg
                          : "whiteAlpha.200",
                    }}
                  >
                    Create Account
                  </Button>
                </VStack>

                <Text fontSize="sm" color={leftPanelSubtext}>
                  {activeTab === "login"
                    ? "Don't have an account? Switch to sign up!"
                    : "Already have an account? Switch to sign in!"}
                </Text>
              </VStack>
            </Box>

            {/* Right Panel - Form Content */}
            <Box
              ref={formContainerRef}
              flex={1.5}
              p={8}
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
              minH={{ base: "500px", md: "auto" }}
              order={{ base: 0, md: 2 }}
            >
              <AnimatePresence mode="wait">
                {activeTab === "login" ? <LoginForm /> : <SignupForm />}
              </AnimatePresence>
            </Box>
          </Flex>
        </Card>
      </MotionBox>
    </Box>
  );
};

export default AuthPage;
