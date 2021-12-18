const URL = {
  base: "https://webcache.googleusercontent.com/search?q=cache:https://www1.gogoanime.cm",
  alternate: "https://www1.gogoanime.cm",
};

const options = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    Referer: "https://www.google.com/",
  },
};

const formatTitle = (title, episode) => {
  const formattedTitle = `${title
    .replace(/\b\W\b|\b\W\W\b/g, "-")
    .replace(/\W$/g, "")
    .toLowerCase()}-episode-${episode}`;

  return formattedTitle;
};

export const getLink = async (title, episode) => {
  const f_title = formatTitle(title, episode);
  const res = await fetch(`${URL.base}/${f_title}`, options);
  if (res.status === 200) {
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
      return link;
    } else {
      return null;
    }
  } else {
    const res = await fetch(`${URL.alternate}/${f_title}`, options);
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
    link = link.concat(snip);
    if (snip) {
      link = link.concat(snip);
      return link;
    } else {
      return null;
    }
  }
};

export const getVideoLink = async (link) => {
  const res = await fetch(link, options);
  const data = await res.text();

  return data;
};
