const handler = async (req, res) => {
    const { link } = req.query;
    const url = `https://${link.join("/")}`;
  
    const options = {
      headers: {
        Referer: "https://gogoplay1.com/",
      },
    };
  
    const response = await fetch(url, options);
    const setHeader = (header) => {
      res.setHeader(header, response.headers.get(header.toLowerCase()));
    };
  
    setHeader("etag");
    setHeader("expires");
  
    res.send(response.body);
  };
  
  export default handler;