import Image from "next/image";
import rocket from "@public/rocket.png";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import RoundDivider from "@public/round-divider.svg";
import avatar from "@public/avatar.jpg";
import JsLogo from "@public/third-party-logos/js.svg";
import NodeLogo from "@public/third-party-logos/node.svg";
import TypescriptLogo from "@public/third-party-logos/typescript.svg";
import HtmlLogo from "@public/third-party-logos/html.svg";
import CssLogo from "@public/third-party-logos/css.svg";
import ReactLogo from "@public/third-party-logos/react.svg";
import typeaheadImage from "@public/typeahead-search.png";
import layoutImage from "@public/wikipedia-layout.png";
import clsx from "clsx";
import Paragraph from "@components/Paragraph";
import Heading from "@components/Heading";
import Container from "@components/Container";
import ViewportPadding, { Breakpoint } from "@components/ViewportPadding";
import Link from "next/link";
import Cta from "@components/Cta";
import { screens } from "../constants";
import { allPosts } from "src/api";
import TimelinePoint from "@components/TimelinePoint";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home = () => {
  const posts = allPosts(
    ["description", "publishedAt", "publishedAtFormatted", "url", "title"],
    3
  );

  return (
    <>
      <main className="bg-white">
        <section className="relative -mt-px overflow-hidden bg-gray-900 pt-10 md:h-[calc(100vh-var(--header-height)-48px)] md:min-h-[45rem] lg:pt-0">
          <ViewportPadding className="h-full lg:pb-[calc(var(--header-height)+var(--round-section-divider-height))]">
            <Container className="flex h-full flex-col lg:grid lg:grid-cols-2 lg:items-center lg:gap-14">
              <div className="relative z-10 text-center md:text-left">
                <h1 className="mb-8 text-5xl font-bold tracking-tight text-white lg:text-6xl">
                  Hello,
                  <br />
                  I'm <span className="text-gradient">Nick Ray.</span>{" "}
                </h1>
                <p className="mb-14 text-lg text-gray-400 lg:text-2xl">
                  I'm a senior software engineer living in Salt Lake City, Utah.
                </p>
                <div className="relative inline-block">
                  <div className="absolute inset-0 h-full w-full rounded-full border-[8px] border-transparent"></div>
                  <Link
                    prefetch={false}
                    href={posts[0].url}
                    className="
              relative 
              z-10
              inline-flex 
              w-full 
              items-center
              justify-center
              rounded-full 
              bg-purple-600 
              py-5 
              px-6 
              text-lg 
              font-semibold 
              text-white 
              md:w-auto 
              "
                  >
                    <BookOpenIcon className="mr-2 h-6 w-6" />
                    Read latest blog post
                  </Link>
                </div>
              </div>
              <div className="relative z-10 mt-auto flex translate-y-[10%] justify-center pt-16 md:pt-20 lg:-mt-11 lg:translate-y-0 lg:pt-0">
                <div className="max-w-[18rem] flex-grow md:max-w-[20rem] lg:block lg:max-w-[22rem]">
                  <Image
                    className="h-auto w-full"
                    sizes={`(min-width: ${screens.lg}) 22rem, (min-width: ${screens.md}) 20rem, 18rem`}
                    src={rocket}
                    alt="rocket"
                    priority
                  />
                </div>
              </div>
            </Container>
          </ViewportPadding>
          <img
            src={"/grid.svg"}
            alt=""
            className="width-full pointer-events-none absolute bottom-0 left-0"
          />
          <RoundDivider className="absolute bottom-0 z-20 w-full" />
        </section>
        <div className="grid grid-cols-1 gap-y-20 sm:gap-y-32 md:gap-y-40">
          <section className="pt-8 text-gray-700">
            <ViewportPadding>
              <Container>
                <div className="flex flex-col items-center">
                  <div className="mb-5 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-400 p-1">
                    <div className="h-16 w-16 rounded-full border-[3px] border-white lg:h-24 lg:w-24">
                      <Image
                        className="rounded-full"
                        sizes={`(min-width: ${screens.lg}) 6rem, 4rem`}
                        src={avatar}
                        alt="Avatar of Nick Ray"
                        priority
                      ></Image>
                    </div>
                  </div>
                  <Heading className="text-center">
                    8+ years of web development experience
                  </Heading>
                  <Paragraph className="text-center">
                    Specializing in front-end web development, I use JavaScript,
                    Node.js, TypeScript, HTML, CSS, and React to make websites
                    and apps focused on performance, accessibility, and a
                    delightful user experience.
                  </Paragraph>
                </div>
                <ul className="mt-12 grid grid-cols-2 justify-items-center gap-10 sm:mt-20 md:grid-cols-3 lg:flex lg:justify-between">
                  <li>
                    <JsLogo />
                  </li>
                  <li>
                    <NodeLogo />
                  </li>
                  <li>
                    <TypescriptLogo />
                  </li>
                  <li>
                    <HtmlLogo />
                  </li>
                  <li>
                    <CssLogo />
                  </li>
                  <li>
                    <ReactLogo />
                  </li>
                </ul>
              </Container>
            </ViewportPadding>
          </section>
          <section className="overflow-hidden pt-3 text-gray-700">
            <ViewportPadding breakpoint={Breakpoint.md}>
              <Container>
                <div className="grid grid-cols-12">
                  <div className="relative col-span-5 col-start-2 h-14 rounded-tl-2xl border-t-2 border-l-2 border-gray-400">
                    <div className="absolute right-0 top-0 -my-px -translate-y-1/2 translate-x-1/2 bg-white p-2">
                      <div className="h-3 w-3 rounded-full border-2 border-gray-400"></div>
                    </div>
                  </div>
                  <div className="relative col-span-12 grid grid-cols-11 bg-gray-900 pb-28 text-gray-400 md:col-span-11 md:rounded-2xl">
                    <div className="absolute col-start-2 h-full w-[2px] bg-gray-600"></div>
                    <div className="col-span-11 mb-16 flex h-10 items-center justify-between px-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-gray-700"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-gray-700"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-gray-700"></div>
                      </div>
                      <div className="ml-4 flex h-6 max-w-xs flex-grow items-center rounded-md bg-gray-700 px-3 text-xs text-gray-300">
                        <LockClosedIcon className="mr-1.5 h-3.5 w-3.5"></LockClosedIcon>
                        wikipedia.org
                      </div>
                      <div></div>
                    </div>
                    <div className="col-span-9 col-start-2 mb-20 flex justify-center pl-1">
                      <div className="max-w-xl text-center">
                        <Heading color="white">
                          Currently working at{" "}
                          <span className="text-gradient">Wikipedia</span>
                        </Heading>
                        <Paragraph color="lightGray">
                          Since 2018, I’ve had the privilege of developing
                          features for Wikipedia's desktop and mobile sites
                          which are used by millions of users every day across
                          the world in over 300 different languages.
                        </Paragraph>
                        <a
                          className="group mt-8 inline-flex h-9 items-center rounded-full bg-gray-700 px-3 text-gray-200 hover:text-gray-100"
                          href="/resume.pdf"
                        >
                          View full resume{" "}
                          <ChevronRightIcon className="w-5 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      </div>
                    </div>
                    <ul className="col-span-10 col-start-2 space-y-20 md:space-y-32">
                      {[
                        <TimelinePoint
                          key="visual-regression"
                          description={
                            <>
                              Developed a{" "}
                              <a
                                className="font-semibold text-purple-400"
                                href="https://github.com/wikimedia/pixel"
                              >
                                visual regression tool
                              </a>{" "}
                              that was used each week to catch UI bugs before
                              users saw them and increased confidence in
                              releases to production.
                            </>
                          }
                          image={
                            <img
                              className="w-full"
                              src="/visual-regression-art.svg"
                              alt="visual regression testing abstract art"
                              key="visual-regression"
                            />
                          }
                          hasFade={false}
                        />,
                        <TimelinePoint
                          key="search"
                          description={
                            <>
                              Improved the desktop search experience by
                              developing a new typeahead search component
                              written in Vue.js and TypeScript. Increased the
                              component's robustness by implementing synthetic
                              test telemetry to automatically measure the search
                              component’s rendering performance.
                            </>
                          }
                          image={
                            <Image
                              key="typeahead-search"
                              className="w-full"
                              sizes={`(min-width: ${screens.md}) ${
                                545 / 16
                              }rem, 75vw`}
                              src={typeaheadImage}
                              alt="Wikipedia's typeahead search component"
                            />
                          }
                          hasFade={true}
                        />,
                        <TimelinePoint
                          key="layout"
                          description={
                            <>
                              Optimized article readability, accessibility, and
                              performance of the desktop site by developing a{" "}
                              <a href="https://www.mediawiki.org/wiki/Reading/Web/Desktop_Improvements/Features/Limiting_content_width">
                                new layout
                              </a>{" "}
                              to support a line length that made reading easier.
                              The new layout was one of the most dramatic visual
                              changes to the desktop site in over a decade.
                            </>
                          }
                          image={
                            <Image
                              key="wikipedia-layout"
                              className="w-full"
                              sizes={`(min-width: ${screens.md}) ${
                                545 / 16
                              }rem, 75vw`}
                              src={layoutImage}
                              alt="Wikipedia's new site max-width site layout"
                            />
                          }
                          hasFade={true}
                        />,
                      ].map((component, idx) => (
                        <li key={idx} className="text-lg">
                          {component}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Container>
            </ViewportPadding>
          </section>
          <section id="blog" className="text-gray-700">
            <ViewportPadding>
              <Container>
                <Heading color="darkGray">
                  Recently published{" "}
                  <span className="text-gradient">articles</span>
                </Heading>
                <Paragraph>
                  I recently started a blog where I share what I’ve learned
                  about JavaScript, CSS, and the rest of the front-end
                  development world.
                </Paragraph>
                <ul className="mt-12 grid gap-4 sm:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] md:gap-6 lg:gap-8">
                  {posts.map((post, idx) => (
                    <li key={idx}>
                      <Link
                        prefetch={false}
                        href={post.url}
                        className="block h-full"
                      >
                        <article className="relative flex h-full min-h-[17rem] flex-col rounded-lg bg-white py-10 px-6 shadow-md">
                          <ArrowTopRightOnSquareIcon className="absolute right-3 top-3 h-5 w-5 text-blue-600" />
                          <h3
                            className={clsx([
                              "mb-3",
                              "text-xl",
                              "font-bold",
                              "text-gray-100",
                              "md:mb-4 md:text-2xl",
                              "bg-clip-text",
                              "text-transparent",
                              "bg-gradient-to-r",
                              "from-cyan-500",
                              "to-blue-700",
                            ])}
                          >
                            {post.title}
                          </h3>
                          <div
                            className={clsx([
                              "mb-6",
                              "font-medium",
                              "text-gray-700",
                              "md:mb-10 md:text-lg",
                            ])}
                            dangerouslySetInnerHTML={{
                              __html: post.description.html,
                            }}
                          />
                          <footer className="mt-auto font-mono">
                            <time
                              dateTime={post.publishedAt}
                              className="text-gray-600"
                            >
                              {post.publishedAtFormatted}
                            </time>
                          </footer>
                        </article>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Container>
            </ViewportPadding>
          </section>
          <Cta showDivider={true} />
        </div>
      </main>
    </>
  );
};

export default Home;