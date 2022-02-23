import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import "../styles/globals.css";
import "../styles/bootstrap-v5.1.0/css/ltr/bootstrap.min.css";
import "../styles/lib/css/bootstrap-icons.css";
import "../styles/lib/css/aos.css";
import "../styles/css/ltr/mz-l.css";
import "../styles/css/custom.css";
import "../images/favicon.png";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
