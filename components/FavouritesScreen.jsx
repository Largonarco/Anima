import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { fetchAdvPaginatedAnimeData } from "../utils/fetch";

import styles from "../styles/Screens.module.css";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

const FavouritesScreen = ({ data }) => {
  const [favouriteItems, addNewFavouriteItems] = useState(data);
  const [pageNo, incrPageNo] = useState(2);

  const getNewFavouriteItems = async () => {
    const favourites = await fetchAdvPaginatedAnimeData(
      "FAVOURITES_DESC",
      pageNo
    );

    addNewFavouriteItems(favouriteItems.concat(favourites));
    incrPageNo(pageNo++);
  };

  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="2em">
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr 1fr 1fr" }}
        gridGap="2em"
      >
        {favouriteItems.map(
          (
            { title, coverImage, season, seasonYear, episodes, meanScore, id },
            index
          ) => (
            <Link key={index} href={`/animeInfo/${id}`} passHref>
              <Box
                display="grid"
                gridTemplateColumns="1fr"
                gridGap="0.5em"
                _hover={{
                  transform: "scale(1.05)",
                  transition: "all 0.25s ease-in-out",
                }}
              >
                <Image
                  src={coverImage.extraLarge}
                  alt={title.english}
                  width={280}
                  height={380}
                  layout="responsive"
                  className={styles.img}
                  loading="lazy"
                />
                <Box display="grid" gridTemplateColumns="1fr">
                  <Text fontWeight="bold" textColor="white" isTruncated>
                    {title.english}
                  </Text>
                  <HStack spacing="1em">
                    <HStack>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="yellow"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                      <Text textColor="white">{meanScore / 10}</Text>
                    </HStack>
                    <HStack>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="firebrick"
                      >
                        <path d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z" />
                        <path d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z" />
                      </svg>
                      <Text textColor="white">{episodes}</Text>
                    </HStack>
                  </HStack>
                  <Text fontWeight="semibold" textColor="white">
                    {season} {seasonYear}
                  </Text>
                </Box>
              </Box>
            </Link>
          )
        )}
      </Box>
      <Button
        width="6em"
        justifySelf="center"
        colorScheme="orange"
        variant="solid"
        onClick={getNewFavouriteItems}
      >
        Load more
      </Button>
    </Box>
  );
};

export default FavouritesScreen;
