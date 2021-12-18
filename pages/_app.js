import SSRProvider from "react-bootstrap/SSRProvider";
import NavBar from "../components/NavBar";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SSRProvider>
      <NavBar />
      <Component {...pageProps} />
    </SSRProvider>
  );
};

export default MyApp;
