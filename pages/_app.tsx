import { Web3ReactProvider } from "@web3-react/core";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
