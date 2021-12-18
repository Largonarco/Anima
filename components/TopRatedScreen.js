import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import URL from "../const";

import { StarIcon, CollectionIcon } from "@heroicons/react/outline";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "../styles/Screens.module.css";

const TopRatedScreen = (props) => {
  const [topRatedItems, addNewTopRatedItems] = useState(props.data);
  const [pageNo2, incrPageNo2] = useState(2);

  const getNewTopRatedItems = async () => {
    let topRated = await fetch(`${URL}/api/topRated?pageNo=${pageNo2}`);
    topRated = await topRated.json();

    addNewTopRatedItems(topRatedItems.concat(topRated));
    incrPageNo2(pageNo2 + 1);
  };

  return (
    <div>
      <Row lg={5} xs={2} md={3}>
        {topRatedItems.map(
          ({
            title,
            coverImage,
            season,
            seasonYear,
            episodes,
            meanScore,
            id,
          }) => (
            <Col key={id} className="pb-4 px-2">
              <Link href={`/animeInfo/${id}`} passHref>
                <div className={styles.anime_card}>
                  <Image
                    src={coverImage.extraLarge}
                    width={500}
                    height={650}
                    className={styles.image}
                  />
                  <div className="text-white align-items-center p-2">
                    <h6 className="mb-1">{title.english}</h6>
                    <p className="mb-0">
                      <CollectionIcon className={styles.collectionIcon} />{" "}
                      {episodes}
                    </p>
                    <p className="mb-0">
                      <StarIcon className={styles.starIcon} /> {meanScore / 10}
                    </p>
                    <p className="text-muted">
                      {season} {seasonYear}
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
          )
        )}
      </Row>
      <Button variant="primary" onClick={getNewTopRatedItems}>
        Load more
      </Button>
    </div>
  );
};

export default TopRatedScreen;
