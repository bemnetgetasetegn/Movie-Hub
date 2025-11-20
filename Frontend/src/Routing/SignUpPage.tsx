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
} from "@chakra-ui/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useRegister();
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/login");
        },
      }
    );
  };
  return (
    <Box paddingX={10}>
      <VStack
        spacing={4}
        as="form"
        onSubmit={handleLogin}
        maxW="md"
        mx="auto"
        mt={8}
      >
        <Text fontSize="2xl" fontWeight="bold">
          Sign up to MovieHub
        </Text>

        {loginMutation.isError && (
          <Alert status="error" w="full">
            <AlertIcon />
            {loginMutation.error?.message || "Login failed"}
          </Alert>
        )}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <HStack spacing={4} w="full">
          <Button
            type="submit"
            colorScheme="blue"
            flex={1}
            isLoading={loginMutation.isPending}
          >
            Sign up
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default LoginPage;
