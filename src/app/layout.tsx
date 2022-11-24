import "@styles/globals.css";
import { Inter } from "@next/font/google";
import Header from "@components/Header";
import Footer from "@components/Footer";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-900 text-gray-400 antialiased">
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
