import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="A web-app for taking notes" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="referrer" content={'strict-origin'} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
