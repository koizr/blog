import "highlight.js/styles/solarized-light.css";
import "normalize.css";
import "@/styles/global.scss";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />;
};

export default App;
