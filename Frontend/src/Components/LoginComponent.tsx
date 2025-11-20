import { FormEvent, useState } from "react";
import { useLogin } from "../assets/hooks/useAuth";
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

// Login Form Component
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const navigate = useNavigate();

  // Dark mode colors
  const inputBg = useColorModeValue("white", "gray.800");
  const inputBorder = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("blue.600", "purple.300");
  const iconColor = useColorModeValue("gray.400", "gray.500");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  return (
    <MotionVStack
      spacing={6}
      as="form"
      onSubmit={handleLogin}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      key="login-form"
    >
      <VStack spacing={1} textAlign="center">
        <Heading size="lg" color={headingColor}>
          🎬 Welcome Back!
        </Heading>
        <Text fontSize="md" color={textColor}>
          Sign in to your MovieHub account
        </Text>
      </VStack>

      {loginMutation.isError && (
        <Alert status="error" w="full" borderRadius="md">
          <AlertIcon />
          {loginMutation.error?.message ||
            "Login failed. Please check your credentials."}
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
          placeholder="Password"
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
        isLoading={loginMutation.isPending}
        isDisabled={loginMutation.isPending}
        borderRadius="md"
      >
        Sign In
      </Button>
    </MotionVStack>
  );
};

export default LoginForm;
