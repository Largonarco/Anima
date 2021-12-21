import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PopularScreen from "../components/PopularScreen";
import TopRatedScreen from "../components/TopRatedScreen";
import TrendingScreen from "../components/TrendingScreen";
import URL  from "../url";

import styles from "../styles/Home.module.css";


const Home = (props) => {
  const [key, setKey] = useState("popular");

  return (
    <div className={styles.main}>
      <div className={styles.trending}>
        <TrendingScreen data={props.trending} />
      </div>
      <div className={styles.tabs}>
        <Tabs
          id="controlled-tab"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-2"
        >
          <Tab eventKey="popular" title="Popular">
            <PopularScreen data={props.popular} />
          </Tab>
          <Tab eventKey="topRated" title="Top Rated">
            <TopRatedScreen data={props.topRated} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  let trending = await fetch(`${URL}/api/trending?pageNo=1`);
  let popular = await fetch(`${URL}/api/popular?pageNo=1`);
  let topRated = await fetch(`${URL}/api/topRated?pageNo=1`);
  trending = await trending.json();
  popular = await popular.json();
  topRated = await topRated.json();

  return {
    props: {
      trending,
      popular,
      topRated,
    },
  };
};
