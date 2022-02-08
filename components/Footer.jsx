import React from "react";

import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex justify="center" bgColor="blackAlpha.900">
      <Text fontSize="1em" fontWeight="semibold" textColor="white">
        Made by Omkar Narayankar 😊
      </Text>
    </Flex>
  );
};

export default Footer;
