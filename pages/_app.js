import '../styles/globals.css'
import "mapbox-gl/dist/mapbox-gl.css"
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Component {...pageProps} />
  </>
  );
}

export default MyApp
