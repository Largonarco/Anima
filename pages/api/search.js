import { request, gql } from "graphql-request";

const handler = async (req, res) => {
  const { search } = req.query;

  const query = gql`
  {
    search: Page(perPage: 5, page: 1) {
      media(search: "${search}", sort: POPULARITY_DESC, type:ANIME) {
        id
        title {
          english
          userPreferred
        }
        coverImage {
          extraLarge
        }
        season
        seasonYear
        episodes
        meanScore
      }
    }
  }
  `;

  const data = await request("https://graphql.anilist.co", query);

  if (data.search.media) {
    res.setHeader("Cache-Control", "max-age=0, s-maxage=18000");
    res.status(200).json(data.search.media);
  }
};

export default handler;
