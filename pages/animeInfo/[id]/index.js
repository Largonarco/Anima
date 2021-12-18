import { request, gql } from "graphql-request";
import Image from "next/image";
import { Button } from "react-bootstrap";
import Link from "next/link";

import {
  CollectionIcon,
  StarIcon,
  ClockIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import styles from "../../../styles/AnimeInfo.module.css";

const AnimeInfo = (props) => {
  const {
    id,
    title,
    description,
    episodes,
    status,
    genres,
    coverImage,
    duration,
    meanScore,
  } = props.data;

  let episodeButtons = [];
  for (let i = 0; i < episodes; i++) {
    episodeButtons.push(
      <Link href={`/animeWatch/${id}/${i + 1}`} key={i + 1} passHref>
        <Button variant="primary" size="sm">
          {i + 1}
        </Button>
      </Link>
    );
  }

  return (
    <div className={styles.main}>
      <div className={styles.coverImage}>
        <Image
          src={coverImage.extraLarge}
          width={500}
          height={700}
          className="border border-secondary rounded-3"
        />
      </div>
      <div className={styles.info}>
        <h2>{title.userPreferred}</h2>
        <h3>
          {genres.map((genre) => {
            return `${genre} `;
          })}
        </h3>
        <div className={styles.stats}>
          <h4>
            <StarIcon className={styles.starIcon} /> {meanScore / 10}
          </h4>
          <h4>
            <CollectionIcon className={styles.icon} /> {episodes}
          </h4>
          <h4>
            <ClockIcon className={styles.icon} /> {duration} minutes
          </h4>
          <h4>
            <BadgeCheckIcon className={styles.icon} /> {status}
          </h4>
        </div>
        <h4>Description: </h4>
        <p>{description}</p>
        <div className={styles.episodes}>
          <h4>Episodes</h4>
          <div className={styles.episodeButtons}>
            {episodeButtons.map((button) => button)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfo;

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const query = gql`
    {
      info: Media(id: ${id}) {
        id
        title {
          english
          userPreferred
        }
        description
        episodes
        status
        genres
        coverImage {
          extraLarge
        }
        duration
        meanScore
      }
    }
  `;

  const data = await request("https://graphql.anilist.co", query);

  return {
    props: {
      data: data.info,
    },
  };
};
