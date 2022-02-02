import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DISABLED_PROFILE_TEXT } from "../utils/constants";
import { useMe } from "../utils/hooks";
import LogoutButton from "./LogoutButton";
import Navlink from "./Navlink";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const { me } = useMe();

  useEffect(() => {
    if (me) {
      const isEmpty: boolean = Object.keys(me).length === 0;
      setLoggedIn(!isEmpty);
    }
  }, [me]);

  return (
    <div>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent={"space-between"}>
          <HStack spacing={8} alignItems="center">
            <Navlink mr={4} to="/">
              Home
            </Navlink>
            <Tooltip
              isDisabled={loggedIn}
              hasArrow
              label={DISABLED_PROFILE_TEXT}
              bg="red.600"
            >
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <div className={loggedIn ? "" : "link-disabled"}>
                  <Navlink mr={4} to="/profile">
                    Profile
                  </Navlink>
                </div>
              </HStack>
            </Tooltip>
          </HStack>
          <Flex alignItems="center">
            <Stack direction="row" spacing={7}>
              {!loggedIn ? (
                <Stack direction="row" alignItems="center">
                  <Box>
                    <Badge variant="outline" colorScheme="red">
                      Not logged in
                    </Badge>
                  </Box>
                </Stack>
              ) : (
                <LogoutButton />
              )}
              <IconButton
                variant="ghost"
                aria-label="toggle theme"
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              ></IconButton>
              <HStack direction="row">
                <Tooltip
                  isDisabled={!loggedIn}
                  hasArrow
                  label={me?.email}
                  bg="green.600"
                >
                  <Avatar
                    size="sm"
                    src={loggedIn ? "https://bit.ly/3s1C5U5" : ""}
                  >
                    <AvatarBadge
                      boxSize="1.25em"
                      bg={loggedIn ? "green.500" : "tomato"}
                    ></AvatarBadge>
                  </Avatar>
                </Tooltip>
              </HStack>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
}

export default Navbar;
