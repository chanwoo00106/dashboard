import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { mutate } from "swr";
import { fetcher } from "../utils/fetcher";

function AuthForm() {
  const toast = useToast();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [authButtonState, setAuthButtonState] = useState<boolean>(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, err } = await fetcher(
        `/api/${authButtonState ? "login" : "signup"}`,
        { email, password }
      );
      if ((email.trim() === "" || password.trim() === "") && authButtonState) {
        toast({
          position: "top",
          title: "An error occured",
          description: `${err}`,
          status: "error",
          isClosable: true,
        });
        setLoading(false);
      } else if (err) {
        toast({
          position: "top",
          title: "An error occured",
          description: `${err}`,
          status: "error",
          isClosable: true,
        });
        setLoading(false);
      } else {
        toast({
          position: "top",
          title: "Success",
          description: `Logged in with success`,
          status: "success",
          isClosable: true,
        });
      }
    } catch (e: any) {
      return;
    }
    await mutate("/api/me");
  };

  return (
    <form onSubmit={onSubmit}>
      <Flex minH="50vh" align="center" justify="center">
        <Stack spacing={8} mx="auto" w={600} maxW="lg" py={12} px={6}>
          <Stack align="center">
            <Text fontSize="lg" color={"gray.600"}>
              {authButtonState
                ? "Login to your account"
                : "Sign up to your account"}
            </Text>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="lg"
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setEmail(e.target.value)}
                ></Input>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  type="submit"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                >
                  {authButtonState ? "Login" : "Signup"}
                  {loading && <Spinner ml={5} />}
                </Button>
              </Stack>
              <Stack>
                <Text align="center">
                  <Link
                    onClick={() => setAuthButtonState(!authButtonState)}
                    color="blue.400"
                  >
                    {authButtonState
                      ? "New? Sign up"
                      : "Already a User? Log in"}
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}

export default AuthForm;
