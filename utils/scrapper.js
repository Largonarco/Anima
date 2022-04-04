const URL = "https://gogoanime.fi/";
const SEARCH = "https://gogoanime.fi/search.html?keyword";

const options = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "Referer": "https://www.gogoplay1.com/",
  },
};

const formatTitle = (title, episode) => {
  const formattedTitle = `${title
    .replace(/\b\W\b|\b\W\W\b/g, "-")
    .replace(/\W$/g, "")
    .toLowerCase()}-episode-${episode}`;

  return formattedTitle;
};

const getLink = async (string) => {
  const res = await fetch(`${URL}/${string}`, options);
  const data = await res.text();
  let s_index = data.indexOf('<li class="anime">');
  let l_index = data.indexOf('<li class="vidcdn">');
  let snip = data.slice(s_index, l_index);

  s_index = snip.indexOf("data-video");
  l_index = snip.indexOf("><i");
  snip = snip
    .slice(s_index + 12, l_index)
    .trim()
    .slice(0, -1);

  let link = "https:";
  if (snip) {
    link = link.concat(snip);
    // link = await getVideoLink(link);

    return link;
  } else {
    return null;
  }
};

export const getVideoLink = async (link) => {
  try {
    let res = await fetch(link, options);
    res = await res.text();
    res = res.match(/(?<=\[\{file:\s').*(?=',label)/g)[0];

    return res;
  } catch (error) {
    return null;
  }
};

export const magic = async (title, episode) => {
  if (title.match(/\W\d$|\W\d\W/g)) {
    try {
      const res = await fetch(`${SEARCH}=${title}`, options);
      const data = await res.text();
      const interTitle = data?.match(
        /(?<=\<p\sclass\="name"\>).*(?=\<\/p\>)/g
      )[0];
      const formattedTitle = `${interTitle.match(
        /(?<=category\/).*(?="\s)/g
      )}-episode-${episode}`;
      const link = await getLink(formattedTitle);

      return link;
    } catch (error) {
      return null;
    }
  } else {
    const formattedTitle = formatTitle(title, episode);
    const link = await getLink(formattedTitle);

    if (link) {
      try {
        const res = await fetch(
          `${SEARCH}=${title.replace(
            /(?<=(\w*\W){3}).*|(?<=(\w*\W\W){3}).*/g,
            ""
          )}`,
          options
        );

        const data = await res.text();
        const interTitle = data.match(
          /(?<=\<p\sclass\="name"\>).*(?=\<\/p\>)/g
        )[0];
        const formattedTitle = `${interTitle.match(
          /(?<=category\/).*(?="\s)/g
        )}-episode-${episode}`;
        const link = await getLink(formattedTitle);

        return link;
      } catch (error) {
        return null;
      }
    } else {
      return link;
    }
  }
};
