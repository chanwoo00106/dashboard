import { IconButton, Tooltip } from "@chakra-ui/react";
import { HiOutlineThumbUp } from "react-icons/hi";
import { mutate } from "swr";
import { LikeButtonProps } from "../types/props";
import { LIKE_BUTTON_TEXT } from "../utils/constants";
import { fetcher } from "../utils/fetcher";

function LikeButton({ id, authorId }: LikeButtonProps) {
  const onClick = async () => {
    const { success, error } = await fetcher("/api/like/create", {
      id,
      authorId,
    });
    await mutate("/api/post");
  };
  return (
    <Tooltip placement="left" hasArrow label={LIKE_BUTTON_TEXT} bg="green.600">
      <IconButton
        onClick={onClick}
        aria-label="Like Button"
        icon={<HiOutlineThumbUp />}
      />
    </Tooltip>
  );
}

export default LikeButton;
