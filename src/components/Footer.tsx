import Logo from "../../public/logo.svg";
import ViewportPadding from "./ViewportPadding";

const Footer = () => (
  <footer className="sticky top-[100vh] bg-white py-10 text-gray-700">
    <ViewportPadding>
      <div className="flex flex-col items-center justify-center text-center">
        <a href="/" className="mb-5">
          <span className="sr-only">nray.dev home page</span>
          <Logo className="h-8 w-auto" />
        </a>
        <div className="mb-4">
          Curious how I built this site?{" "}
          <a
            className="font-semibold text-purple-700"
            href="https://github.com/nicholasray/nray.dev"
          >
            View source
          </a>
        </div>
        <div className="mb-12 text-sm text-gray-600">
          © 2022 NRAY LLC. All rights reserved.
        </div>
        <div className="text-sm font-bold">
          <a href="/privacy" className="mb-5">
            Privacy
          </a>
        </div>
      </div>
    </ViewportPadding>
  </footer>
);

export default Footer;
