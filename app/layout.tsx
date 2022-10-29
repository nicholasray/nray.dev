import "./globals.css";
import Footer from "@app/components/Footer";
import Header from "@app/components/Header";
import { Inter } from "@next/font/google";
import constants from "@app/constants";
import { DefaultSeo } from "next-seo";
const title = "Nick Ray - Senior Software Engineer";
const description =
  "Learn Javascript, React, CSS and more frontend development from the portfolio site of Nick Ray.";

interface LayoutProps {
  children: React.ReactNode;
}

const inter = Inter();

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en" className={inter.className}>
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
      <body className="bg-gray-900 text-gray-400 antialiased">
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
};

export default RootLayout;
