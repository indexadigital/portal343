import { Html, Head, Main, NextScript } from 'next/document'
import Analytics from '../components/Anatytics'

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,600,800&display=swap" />
        <Analytics />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}