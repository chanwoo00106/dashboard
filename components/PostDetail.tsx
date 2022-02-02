import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { PostDetailProps } from "../types/props";
import { truncate } from "../utils/functions";
import { useMe } from "../utils/hooks";

function PostDetail({ pst, id, authorId }: PostDetailProps) {
  const [LoggedIn, setLoggedIn] = useState<boolean>(false);
  const toast = useToast();
  const { me } = useMe();

  const color = useColorModeValue("white", "gray.900");

  useEffect(() => {
    if (me) {
      const isEmpty: boolean = Object.keys(me).length === 0;
      setLoggedIn(!isEmpty);
    }
  }, [me]);

  return (
    <>
      <Flex align="center" justify="center">
        <Stack spacing={8} mx="auto" w={1200} py={6} px={6}>
          <Center py={6}>
            <Box
              maxW="800px"
              w="full"
              bg={color}
              boxShadow="2xl"
              rounded="md"
              p={6}
              overflow="hidden"
            >
              <Stack>
                <Text
                  color="green.500"
                  textTransform="uppercase"
                  fontWeight={800}
                  fontSize="sm"
                  letterSpacing={1.1}
                >
                  Post
                </Text>

                <Text color="gray.500">{pst.text}</Text>
              </Stack>

              <Stack mt={10} direction="row" spacing={4} align="center">
                <Avatar src="" name={truncate(pst.author.email)} alt="Author" />
                <Stack direction="column" spacing={0} fontSize="sm">
                  <Text fontWeight={600}>{pst.author.email}</Text>
                  <Text color="gray.500">
                    {moment(pst.createdAt).format("Do MMMM YYYY")}
                  </Text>
                </Stack>
              </Stack>

              <Stack direction="row" justify="center" spacing={6}>
                <Stack spacing={0} align="center">
                  <Text fontSize="sm" color="gray.500">
                    {pst.likes?.length}
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Center>
        </Stack>
      </Flex>

      <Center height="20px">
        <Divider width="80%" orientation="horizontal" />
      </Center>
    </>
  );
}

export default PostDetail;
