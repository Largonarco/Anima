import React from "react";
import URL from "../../../url";
import Link from "next/link";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { StarIcon, CollectionIcon } from "@heroicons/react/outline";

import styles from "../../../styles/AnimeSearch.module.css";

function AnimeSearch(props) {
  return (
    <div className={styles.main}>
      <Row lg={4} xs={2} md={3}>
        {props.data.map(
          ({
            id,
            title,
            episodes,
            season,
            seasonYear,
            coverImage,
            meanScore,
          }) => (
            <Col key={id} className="pb-4 px-2">
              <Link href={`/animeInfo/${id}`} passHref>
                <div className={styles.anime_card}>
                  <Image
                    src={coverImage.extraLarge}
                    alt=""
                    width={500}
                    height={650}
                    className={styles.image}
                  />
                  <div className="text-white align-items-center p-2">
                    <h6 className="mb-1">{title.userPreferred}</h6>
                    <p className="mb-0">
                      <StarIcon className={styles.starIcon} /> {meanScore / 10}
                    </p>
                    <p className="mb-0">
                      <CollectionIcon className={styles.collectionIcon} /> {episodes}
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
    </div>
  );
}

export default AnimeSearch;

export const getServerSideProps = async (context) => {
  const { search } = context.params;

  let data = await fetch(`${URL}/api/search?search=${search}`);
  data = await data.json();

  return {
    props: {
      data,
    },
  };
};
