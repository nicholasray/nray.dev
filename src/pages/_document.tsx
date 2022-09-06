import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400..800&display=optional"
        />
      </Head>

      <body className="bg-gray-900 text-gray-400 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
