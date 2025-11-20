import { FormEvent, useState } from "react";
import { useRegister } from "../assets/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Alert,
  AlertIcon,
  HStack,
  Card, // Added Card
  CardBody, // Added CardBody
  Heading, // Used Heading instead of Text for the title
  InputGroup, // For icons
  InputLeftElement, // For icons
  Link, // For navigation link
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons"; // Added Icons

// Renamed component from LoginPage to RegisterPage for clarity
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useRegister();
  const navigate = useNavigate();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          // Navigating to /login after successful registration is correct
          navigate("/login");
        },
        onError: (error) => {
          // Optional: Log error for debugging
          console.error("Registration failed:", error);
        },
      }
    );
  };

  // Outer Box centered the content on the screen
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={4}
    >
      <Card
        maxW="md"
        width="full"
        boxShadow="xl" // Stronger shadow for a lifted look
        borderRadius="lg" // Rounded corners
      >
        <CardBody p={{ base: 6, md: 8 }}>
          {" "}
          {/* Responsive padding */}
          <VStack
            spacing={6} // Increased spacing for better visual separation
            as="form"
            onSubmit={handleRegister} // Renamed handler for consistency
          >
            <VStack spacing={1} textAlign="center">
              <Heading size="lg" color="blue.600">
                🚀 Sign up to MovieHub
              </Heading>
              <Text fontSize="md" color="gray.600">
                Create your account to start tracking your favorite movies!
              </Text>
            </VStack>

            {loginMutation.isError && (
              <Alert status="error" w="full" borderRadius="md">
                <AlertIcon />
                {loginMutation.error?.message ||
                  "Registration failed. Please try again."}
              </Alert>
            )}

            {/* Email Input with Icon */}
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                borderRadius="md"
              />
            </InputGroup>

            {/* Password Input with Icon */}
            <InputGroup size="lg">
              <InputLeftElement pointerEvents="none">
                <LockIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                borderRadius="md"
              />
            </InputGroup>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg" // Larger button for prominence
              w="full"
              isLoading={loginMutation.isPending}
              isDisabled={loginMutation.isPending} // Ensure it's disabled while loading
              borderRadius="md"
            >
              {loginMutation.isPending ? "Signing Up..." : "Create Account"}
            </Button>

            <HStack spacing={1} pt={2}>
              <Text fontSize="sm" color="gray.600">
                Already have an account?
              </Text>
              <Link
                color="blue.500"
                onClick={() => navigate("/login")}
                fontSize="sm"
                fontWeight="semibold"
              >
                Log In
              </Link>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default RegisterPage;
