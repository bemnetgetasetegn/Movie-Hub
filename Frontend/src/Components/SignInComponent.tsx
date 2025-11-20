import { FormEvent, useState } from "react";
import { useRegister } from "../assets/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  VStack,
  Text,
  Alert,
  AlertIcon,
  Heading,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

// Motion components for animations
const MotionVStack = motion(VStack);

// Signup Form Component
const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerMutation = useRegister();
  const navigate = useNavigate();

  // Dark mode colors
  const inputBg = useColorModeValue("white", "gray.800");
  const inputBorder = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("blue.600", "purple.300");
  const iconColor = useColorModeValue("gray.400", "gray.500");

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/login");
        },
        onError: (error) => {
          console.error("Registration failed:", error);
        },
      }
    );
  };

  return (
    <MotionVStack
      spacing={6}
      as="form"
      onSubmit={handleRegister}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      key="signup-form"
    >
      <VStack spacing={1} textAlign="center">
        <Heading size="lg" color={headingColor}>
          🚀 Join MovieHub!
        </Heading>
        <Text fontSize="md" color={textColor}>
          Create your account to track favorite movies
        </Text>
      </VStack>

      {registerMutation.isError && (
        <Alert status="error" w="full" borderRadius="md">
          <AlertIcon />
          {registerMutation.error?.message ||
            "Registration failed. Please try again."}
        </Alert>
      )}

      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <EmailIcon color={iconColor} />
        </InputLeftElement>
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          borderRadius="md"
          bg={inputBg}
          borderColor={inputBorder}
          color={useColorModeValue("gray.800", "white")}
          _placeholder={{ color: textColor }}
        />
      </InputGroup>

      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <LockIcon color={iconColor} />
        </InputLeftElement>
        <Input
          type="password"
          placeholder="Password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          borderRadius="md"
          bg={inputBg}
          borderColor={inputBorder}
          color={useColorModeValue("gray.800", "white")}
          _placeholder={{ color: textColor }}
        />
      </InputGroup>

      <Button
        type="submit"
        colorScheme="purple"
        size="lg"
        w="full"
        isLoading={registerMutation.isPending}
        isDisabled={registerMutation.isPending}
        borderRadius="md"
      >
        {registerMutation.isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </MotionVStack>
  );
};

export default SignupForm;
