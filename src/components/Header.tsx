import Link from "next/link";
import Logo from "../../public/logo.svg";
import Github from "../../public/github.svg";
import ViewportPadding from "./ViewportPadding";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  const items: [string | JSX.Element, string][] = [
    ["Blog", "/#blog"],
    ["Resume", "/resume.pdf"],
    ["Contact", "/contact"],
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
      className="relative z-10 flex h-[var(--header-height)] items-center justify-between font-semibold text-gray-200"
    >
      <div>
        <Link href="/">
          <a>
            <span className="sr-only">nray.dev home page</span>
            <Logo className="h-8 w-auto" />
          </a>
        </Link>
      </div>
      <div className="flex items-center">
        <nav>
          <ul className="hidden items-center gap-x-8 md:flex">
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
        <HamburgerMenu items={items} />
      </div>
    </ViewportPadding>
  );
};

export default Header;
