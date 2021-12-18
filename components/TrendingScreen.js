import Image from "next/image";
import Link from "next/link";

import { StarIcon } from '@heroicons/react/outline'
import Carousel from "react-bootstrap/Carousel";
import styles from "../styles/Screens.module.css";

const TrendingScreen = (props) => {
  return (
    <Carousel variant="dark" className="shadow-lg">
      {props.data.map(
        ({ title, genres, coverImage, season, seasonYear, meanScore, id }) => (
          <Carousel.Item key={id}>
            <Link href={`/animeInfo/${id}`}>
              <div className="d-flex flex-column bg-dark border border-dark rounded-3 pb-4">
                <Image
                  src={coverImage.extraLarge}
                  width={500}
                  height={700}
                  className="border border-dark rounded-3"
                />
                <div className="text-white align-items-center p-2">
                  <p className="fs-5 mb-1">{title.userPreferred}</p>
                  <p className="fs-6 mb-0 text-muted">
                   {genres.map((genre) => `${genre} `)}
                  </p>
                  <p className="fs-6 mb-0"><StarIcon className={styles.starIcon}/> {meanScore / 10}</p>
                  <p className="fs-6 mb-2">
                    {season} {seasonYear}
                  </p>
                </div>
              </div>
            </Link>
          </Carousel.Item>
        )
      )}
    </Carousel>
  );
};

export default TrendingScreen;
