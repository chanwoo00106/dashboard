import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Navlink from "./Navlink";

function Navbar() {
  return (
    <div>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent={"space-between"}>
          <HStack spacing={8} alignItems="center">
            <Navlink mr={4} to="/profile">
              profile
            </Navlink>
          </HStack>
        </Flex>
      </Box>
    </div>
  );
}

export default Navbar;
