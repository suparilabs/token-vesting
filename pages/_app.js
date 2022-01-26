<<<<<<< Updated upstream:pages/_app.js
import '../styles/globals.css'
=======
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Header from './Header';
>>>>>>> Stashed changes:pages/_app.tsx

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
