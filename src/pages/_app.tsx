import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import constants from "src/constants";
const title = "Nick Ray - Senior Software Engineer";
const description =
  "Learn JavaScript, React, CSS and more front-end development from the portfolio site of Nick Ray.";
import { Inter } from "@next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} font-sans`}>
      <DefaultSeo
        defaultTitle={title}
        titleTemplate="%s | Nick Ray"
        description={description}
        openGraph={{
          title,
          description,
          url: constants.url,
          type: "website",
          site_name: title,
        }}
      />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
