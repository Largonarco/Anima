import { request, gql } from "graphql-request";

const handler = async (req, res) => {
  const { pageNo } = req.query;

  const query = gql`
    {
      Page(perPage: 10, page: ${pageNo}) {
        media(sort: TRENDING_DESC, type: ANIME, status: FINISHED) {
          id
          title {
            english
          }
          coverImage{
            extraLarge
          }
          meanScore
        }
      }
    }
  `;

  const data = await request("https://graphql.anilist.co", query);

  if (data.Page.media) {
    res.setHeader("Cache-Control", "max-age=0, s-maxage=18000");
    res.status(200).json(data.Page.media);
  }
};

export default handler;
