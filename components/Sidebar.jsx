import SearchResults from "./SearchResults";
import { useState, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { fetchSearchResults } from "../utils/fetch";

import {
  Flex,
  HStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

const Sidebar = () => {
  const searchField = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [toggle, setToggle] = useState(false);

  const submitSearch = async (e) => {
    e.preventDefault();

    const data = await fetchSearchResults(search);
    setSearchResults(data);
  };

  return (
    <>
      <Button colorScheme="blackAlpha" onClick={onOpen} ml="auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5em"
          height="1.5em"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={searchField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent bgColor="blackAlpha.900">
          <DrawerCloseButton onClick={() => setToggle(!toggle)} />
          <DrawerHeader>Search 👀</DrawerHeader>
          <DrawerBody>
            <FormControl>
              <HStack spacing="2em">
                <Input
                  ref={searchField}
                  type="text"
                  placeholder="Search anime"
                  name="search"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Button
                  variant="solid"
                  colorScheme="orange"
                  onClick={submitSearch}
                >
                  Search
                </Button>
              </HStack>
              {searchResults ? (
                <SearchResults results={searchResults}></SearchResults>
              ) : null}
            </FormControl>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Flex></Flex>
    </>
  );
};

export default Sidebar;
