import { Button, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { ReactMoreButtonProps } from "../types/props";

function ReadMoreButton({ id, comments }: ReactMoreButtonProps) {
  return (
    <Link passHref href={`/post/${id}`}>
      <Stack mt={8} direction="row" justify="center" spacing={6}>
        <div>
          <Button
            flex={1}
            rounded="full"
            bg="blue.400"
            color="white"
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Read More
          </Button>
        </div>
      </Stack>
    </Link>
  );
}

export default ReadMoreButton;
