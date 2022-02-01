import {
  Avatar,
  Box,
  Center,
  Flex,
  Progress,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { PostProps } from "../types/props";
import { truncate } from "../utils/functions";
import { useMe, usePost } from "../utils/hooks";
import DeleteButton from "./DeleteButton";

function Post() {
  const toast = useToast();
  const { post } = usePost();
  const { me } = useMe();
  const color = useColorModeValue("white", "gray.900");

  return post ? (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx="auto" w={1200} py={12} px={6}>
        {post.map(
          ({ id, author, authorId, text, createdAt }: PostProps, i: number) => (
            <Center key={i} py={6}>
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
                    colorScheme="green.500"
                    textTransform="uppercase"
                    fontWeight={800}
                    fontSize="sm"
                    letterSpacing={1.1}
                  >
                    HELLO
                  </Text>
                  <Text color="gray.500">{text}</Text>
                </Stack>
                <Stack mt={10} direction="row" spacing={4} align="center">
                  <Avatar src="" name={truncate(author.email)} alt="Author" />
                  <Stack direction="column" spacing={0} fontSize="sm">
                    <Text fontWeight={600}>{author.email}</Text>
                    <Text color="gray.500">
                      {moment(createdAt).format("Do MMMM YYYY")}
                    </Text>
                  </Stack>
                  <Stack mt={8} direction="row" spacing={6}>
                    {me && author.id === me.id && <DeleteButton />}
                  </Stack>
                </Stack>
              </Box>
            </Center>
          )
        )}
      </Stack>
    </Flex>
  ) : (
    <Progress size="xs" isIndeterminate />
  );
}

export default Post;
