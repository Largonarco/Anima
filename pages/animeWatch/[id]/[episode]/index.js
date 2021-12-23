import { useRouter } from "next/router";
import { magic } from "../../../../scrapper";
import { request, gql } from "graphql-request";
import Button from "react-bootstrap/Button";
import VideoPlayer from "../../../../components/VideoPlayer";

import { ChevronRightIcon } from "@heroicons/react/outline";
import styles from "../../../../styles/AnimeWatch.module.css";

const AnimeWatch = ({ data, videoLink, episode, id }) => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h3>{data?.title?.userPreferred}</h3>
        <h4>Episode {episode}</h4>
      </div>
      {videoLink ? (
        <VideoPlayer src={`/api/video/${videoLink}`} />
      ) : (
        <h6>Sorry, Can&apos;t get the episode</h6>
      )}
      <div className={styles.episode_control}>
        <Button
          variant="danger"
          onClick={() =>
            router.push(`/animeWatch/${id}/${parseInt(episode) + 1}`)
          }
        >
          Next episode
          <ChevronRightIcon className={styles.nextIcon}></ChevronRightIcon>
        </Button>
      </div>
      <div className={styles.episode_control}>
        <Button
          variant="danger"
          onClick={() =>
            router.push(`/alternate/${id}/${parseInt(episode)}`)
          }
        >
          In case the episode isn&apos;t available, Try this
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
            userPreferred 
          }
        }
      }
    `;
  const data = await request("https://graphql.anilist.co", query);
  let videoLink;
  videoLink = await magic(data?.info?.title?.userPreferred, episode);
  if (videoLink !== null) {
    videoLink = videoLink?.replace("https://", "");
    videoLink = videoLink?.replace(/\.[\d]{3,4}\.m3u8/, ".m3u8");
  }

  return {
    props: {
      data: data.info,
      videoLink,
      episode,
      id,
    },
  };
};
