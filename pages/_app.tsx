import { AppProps } from 'next/app'

import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";

import { useEffect } from "react";

import NextNProgress from 'nextjs-progressbar';

import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []); 

  return (
    <>
      <NextNProgress color='#ffbf10' stopDelayMs={100} />
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp