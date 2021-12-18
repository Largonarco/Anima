import { request, gql } from "graphql-request";

const handler = async(req, res) => {
  const { pageNo } = req.query;

  const query = gql`
    {
      Page(perPage: 5, page: ${pageNo}) {
        media(sort: TRENDING_DESC, type: ANIME, status: RELEASING) {
          id
          title {
            english
            userPreferred
          }
          genres
          coverImage {
            extraLarge
          }
          season
          seasonYear
          meanScore
        }
      }
    }
  `;

  const data = await request("https://graphql.anilist.co", query);

  if (data.Page.media) {
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=18000');
    res.status(200).json(data.Page.media);
  }
};

export default handler;
