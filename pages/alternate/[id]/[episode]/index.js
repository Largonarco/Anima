import { useRouter } from "next/router";
import { magic } from "../../../../scrapper";
import { request, gql } from "graphql-request";
import Button from "react-bootstrap/Button";
// import VideoPlayer from "../../../../components/VideoPlayer";

import { ChevronRightIcon } from "@heroicons/react/outline";
import styles from "../../../../styles/AnimeWatch.module.css";

const AnimeWatch = ({ data, videoLink, episode, id }) => {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h3>{data?.title?.english}</h3>
        <h4>Episode {episode}</h4>
      </div>
      {videoLink ? (
        <div className={styles.videoContainer}>
          <iframe src={videoLink} loading="lazy" allowFullScreen></iframe>
        </div>
      ) : (
        <h6>Sorry, Can&apos;t get the episode</h6>
      )}
      <div className={styles.episode_control}>
        <Button
          variant="danger"
          onClick={() =>
            router.push(`/alternate/${id}/${parseInt(episode) + 1}`)
          }
        >
          Next episode
          <ChevronRightIcon className={styles.nextIcon}></ChevronRightIcon>
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
          }
        }
      }
    `;
  const data = await request("https://graphql.anilist.co", query);
  let videoLink;
  videoLink = await magic(data?.info?.title?.english, episode);
  // if (videoLink !== null) {
  //   videoLink = videoLink?.replace("https://", "");
  //   videoLink = videoLink?.replace(/\.[\d]{3,4}\.m3u8/, ".m3u8");
  // }

  return {
    props: {
      data: data.info,
      videoLink,
      episode,
      id,
    },
  };
};
