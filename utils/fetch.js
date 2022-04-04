import { gql, request } from "graphql-request";

export const fetchAnimeDataBasic = async (sortType) => {
  const query = gql`
    {
      Page(perPage: 10) {
        media(sort: ${sortType}, type: ANIME, status: FINISHED) {
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
  `;
  const fetchedData = await request("https://graphql.anilist.co", query);

  if (fetchedData?.Page?.media) {
    return fetchedData.Page.media;
  } else {
    return null;
  }
};

export const fetchAdvPaginatedAnimeData = async (sortType, pageNo) => {
  const query = gql`
    {
      Page(perPage: 10, page: ${pageNo}) {
          media(sort: ${sortType}, type: ANIME, status: FINISHED) {
            id
            title {
              english
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
  const fetchedData = await request("https://graphql.anilist.co", query);

  if (fetchedData?.Page?.media) {
    return fetchedData.Page.media;
  } else {
    return null;
  }
};

export const fetchRecommendationsByAnime = async (id) => {
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
  const fetchedData = await request("https://graphql.anilist.co", query);

  if (fetchedData?.Page?.recommendations) {
    return fetchedData.Page.recommendations;
  } else {
    return null;
  }
};

export const fetchSearchResults = async (searchTerm) => {
  const query = gql`
  {
    search: Page(perPage: 5, page: 1) {
      media(search: "${searchTerm}", sort: TRENDING_DESC, type:ANIME) {
        id
        title {
          english
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
  const fetchedData = await request("https://graphql.anilist.co", query);

  if (fetchedData?.search?.media) {
    return fetchedData.search.media;
  } else {
    return null;
  }
};
