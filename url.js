let URL;

if (process.env.NODE_ENV === "production") {
  URL = "https://anima-woad.vercel.app";
} else {
  URL = "http://localhost:3000";
}

export default URL;
