import { LockIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React from "react";
import { mutate } from "swr";
import { fetcher } from "../utils/fetcher";

function LogoutButton() {
  const onClick = async () => {
    const { data, error } = await fetcher("/api/logout", {});
    if (error) {
      return;
    }
    await mutate("/api/me");
  };

  return (
    <Button
      variant="solid"
      colorScheme="twitter"
      size="md"
      mr={4}
      leftIcon={<LockIcon />}
      onClick={onClick}
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
