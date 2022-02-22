import { Web3ReactProvider } from "@web3-react/core";
import type { AppProps } from "next/app";
import getLibrary from "../getLibrary";
import Script from "next/script";
// import "../styles/globals.css";
import "../resources/bootstrap-v5.1.0/css/ltr/bootstrap.min.css";
import "../resources/lib/css/bootstrap-icons.css";
import "../resources//lib/css/aos.css";
import "../resources/css/ltr/mz-l.css";
import "../resources/css/custom.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
      <Script src="./resources/lib/js/jquery-3.6.0.slim.min.js"></Script>
      <Script src="./resources/bootstrap-v5.1.0/js/bootstrap.bundle.min.js"></Script>
      <Script src="./resources/lib/js/aos.js"></Script>
      <Script src="./resources/js/ltr/mz-l.js"></Script>
    </Web3ReactProvider>
  );
}

export default MyApp;
