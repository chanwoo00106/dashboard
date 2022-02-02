import { IconButton, Tooltip } from "@chakra-ui/react";
import { HiTrash } from "react-icons/hi";
import { mutate } from "swr";
import { DeleteButtonProps, PostProps } from "../types/props";
import { DELETE_BUTTON_TEXT } from "../utils/constants";
import { fetcher } from "../utils/fetcher";

function DeleteButton({ id, post }: Pick<DeleteButtonProps, "id" | "post">) {
  const onClick = async () => {
    await fetcher("/api/post/delete", { id });
    await mutate(
      "/api/post",
      post.filter((t: PostProps) => t.id !== id)
    );
  };
  return (
    <Tooltip hasArrow label={DELETE_BUTTON_TEXT} bg="red.600">
      <IconButton
        onClick={onClick}
        size="sm"
        variant="outline"
        colorScheme="red"
        aria-label="Delete Post"
        icon={<HiTrash />}
      ></IconButton>
    </Tooltip>
  );
}

export default DeleteButton;
