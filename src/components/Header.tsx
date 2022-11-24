import Link from "next/link";
import Logo from "../../public/logo.svg";
import Github from "../../public/github.svg";
import LinkedIn from "../../public/linkedin.svg";
import ViewportPadding from "./ViewportPadding";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const items: [string | JSX.Element, string][] = [
    ["Blog", "/#blog"],
    ["Resume", "/nicholas-ray-resume.pdf"],
    ["Contact", "/contact"],
    [
      <div key="linkedin">
        <span className="sr-only">LinkedIn profile</span>
        <LinkedIn className="h-6 w-6" />
      </div>,
      "https://www.linkedin.com/in/nicholas-ray/",
    ],
    [
      <div key="github">
        <span className="sr-only">Github profile</span>
        <Github className="h-6 w-6" />
      </div>,
      "https://github.com/nicholasray",
    ],
  ];

  return (
    <ViewportPadding
      as="header"
      className="z-100 relative flex h-[var(--header-height)] items-center justify-between bg-gray-900 font-semibold text-gray-200"
    >
      <div>
        <Link href="/">
          <span className="sr-only">nray.dev home page</span>
          <Logo className="h-8 w-auto" />
        </Link>
      </div>
      <div className="flex items-center">
        <nav className="hidden md:block">
          <ul className="flex items-center gap-x-8">
            {items.map(([component, url]) => (
              <li key={url}>
                <a
                  href={url}
                  className="link-underline block p-4 text-gray-100 hover:text-white"
                >
                  {component}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <HamburgerMenu className="md:hidden" items={items} />
      </div>
    </ViewportPadding>
  );
};

export default Header;
