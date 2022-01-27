import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Header from './Header';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
