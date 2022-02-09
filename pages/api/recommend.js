import { request, gql } from "graphql-request";

const handler = async (req, res) => {
  const { id } = req.query;

  const query = gql`
    {
      Page(perPage: 5, page: 1) {
        recommendations(mediaRecommendationId: ${id} sort: RATING_DESC) {
          media {
            id
            title {
              english
            }
            coverImage {
              extraLarge
            }
            meanScore
          }
        }
      }
    }
  `;

  const data = await request("https://graphql.anilist.co", query);

  if (data.Page.recommendations) {
    res.setHeader("Cache-Control", "max-age=0, s-maxage=18000");
    res.status(200).json(data.Page.recommendations);
  }
};

export default handler;
