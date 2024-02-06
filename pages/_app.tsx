import { AppProps } from 'next/app'

import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import "../styles/globals.css";

import { useEffect } from "react";

import NextNProgress from 'nextjs-progressbar';

import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';

import { GoogleAnalytics } from '@next/third-parties/google'
import Analytics from '../components/anatytics';

export default function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []); 

  return (
    <>
      <NextNProgress color='#ffbf10' stopDelayMs={100} />
      <DefaultSeo {...SEO} />
      <GoogleAnalytics gaId="G-NVLJWGW01D" />
      <Analytics GTAG="G-NVLJWGW01D" />
      <Component {...pageProps} />      
    </>
  );
}