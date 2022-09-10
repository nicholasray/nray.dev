import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import constants from "src/constants";
const title = "Nick Ray - Software Engineer";
const description =
  "Learn Javascript, React, CSS and more frontend development from the portfolio site of Nick Ray.";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
    </>
  );
}

export default App;
