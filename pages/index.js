import TrendingScreen from "../components/TrendingScreen";
import PopularScreen from "../components/PopularScreen";
import TopRatedScreen from "../components/TopRatedScreen";
import FavouritesScreen from "../components/FavouritesScreen";
import URL from "../url";

import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

const Home = ({ trending, popular, topRated, favourites }) => {
  return (
    <Flex
      direction="column"
      gap={{ base: "1em", md: "2em" }}
      p={{ base: "1em", md: "2em" }}
      bgColor="blackAlpha.900"
    >
      <TrendingScreen data={trending} />
      <Tabs variant="solid-rounded" colorScheme="orange">
        <TabList>
          <Tab>Popular</Tab>
          <Tab>Top rated</Tab>
          <Tab>Favourites</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PopularScreen data={popular} />
          </TabPanel>
          <TabPanel>
            <TopRatedScreen data={topRated} />
          </TabPanel>
          <TabPanel>
            <FavouritesScreen data={favourites} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Home;

export const getServerSideProps = async () => {
  let trending = await fetch(`${URL}/api/trending?pageNo=1`);
  let popular = await fetch(`${URL}/api/popular?pageNo=1`);
  let topRated = await fetch(`${URL}/api/topRated?pageNo=1`);
  let favourites = await fetch(`${URL}/api/favourites?pageNo=1`);
  trending = await trending.json();
  popular = await popular.json();
  topRated = await topRated.json();
  favourites = await favourites.json();

  return {
    props: {
      trending,
      popular,
      topRated,
      favourites,
    },
  };
};
