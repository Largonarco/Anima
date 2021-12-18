import { getLink } from "../../../../scrapper";
import { request, gql } from "graphql-request";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";

import styles from "../../../../styles/AnimeWatch.module.css";

const AnimeWatch = (props) => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h3>{props?.data?.title?.english}</h3>
        <h4>Episode {props.episode}</h4>
      </div>
      {props.link ? (
        <div className={styles.video_wrapper}>
          <div className={styles.video}>
            <iframe
              src={props.link}
              frameBorder="0"
              allowFullScreen
              marginWidth="0"
              marginHeight="0"
            ></iframe>
          </div>
        </div>
      ) : (
        <h6>Sorry, Can&apos;t get the episode</h6>
      )}
      <div className={styles.episode_control}>
        <Button
          variant="primary"
          onClick={() => router.push(`/animeWatch/${props.id}/${parseInt(props.episode) + 1}`)}
        >
          Next episode
        </Button>
      </div>
    </div>
  );
};

export default AnimeWatch;

export const getServerSideProps = async (context) => {
  const { id, episode } = context.params;

  const query = gql`
      {
        info: Media(id: ${id}) {
          title {
            english
            userPreferred
            romaji
          }
        }
      }
    `;
  const data = await request("https://graphql.anilist.co", query);
  let link;
  link = await getLink(data?.info?.title?.userPreferred, episode);
  if (!link) {
    link = await getLink(data?.info?.title?.english, episode);
  }

  return {
    props: {
      data: data.info,
      link,
      episode,
      id,
    },
  };
};
