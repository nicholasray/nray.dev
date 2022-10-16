import Image from "next/future/image";
import Layout from "../components/Layout";
import { Post } from "contentlayer/generated";
import rocket from "../../public/rocket.png";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import RoundDivider from "../../public/round-divider.svg";
import avatar from "../../public/avatar.jpeg";
import JsLogo from "../../public/third-party-logos/js.svg";
import NodeLogo from "../../public/third-party-logos/node.svg";
import TypescriptLogo from "../../public/third-party-logos/typescript.svg";
import HtmlLogo from "../../public/third-party-logos/html.svg";
import CssLogo from "../../public/third-party-logos/css.svg";
import ReactLogo from "../../public/third-party-logos/react.svg";
import typeaheadImage from "../../public/typeahead-search.png";
import layoutImage from "../../public/wikipedia-layout.png";
import visualRegressionArtImage from "../../public/visual-regression-art.svg?url";
import gridImage from "../../public/grid.svg?url";
import clsx from "clsx";
import Paragraph from "src/components/Paragraph";
import Heading from "src/components/Heading";
import Container from "src/components/Container";
import ViewportPadding, { Breakpoint } from "src/components/ViewportPadding";
import Link from "next/link";
import Cta from "src/components/Cta";
import constants, { screens } from "../constants";
import { NextSeo } from "next-seo";
import { allPosts } from "src/api";
import useIntersectionObserver from "src/hooks/useIntersectionObserver";
import { useEffect, useState } from "react";
import useMediaQuery from "src/hooks/useMediaQuery";

interface HomeProps {
  posts: Post[];
}

interface TimelinePointProps {
  image: React.ReactNode;
  description: React.ReactNode;
  hasFade: boolean;
}

const TimelinePoint = ({ image, description, hasFade }: TimelinePointProps) => {
  const matches = useMediaQuery(constants.animations);
  const [skip, setSkip] = useState(!matches);
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.35,
    skip,
    executeOnce: true,
  });

  const shouldTransform: boolean = !entry || !entry.isIntersecting;

  // Disable IntersectionObserver logic if the animation media query doesn't match.
  useEffect(() => {
    setSkip(!matches);
  }, [matches]);

  return (
    <div ref={ref} className="md:grid md:grid-cols-2 md:items-center md:gap-16">
      <div className="relative">
        <div className="absolute left-0 top-0 -my-px ml-px -translate-x-1/2 bg-gray-900 p-2">
          <div className="h-3 w-3 rounded-full border-2 border-gray-400"></div>
        </div>
        <p
          className={clsx(
            "max-w-xl px-6 animation-safe:transition-performant animation-safe:duration-500",
            {
              "animation-safe-safe:opacity-0 animation-safe:-translate-x-4":
                shouldTransform,
            }
          )}
        >
          {description}
        </p>
      </div>
      <div
        className={clsx(
          "relative mx-6 mt-8 flex max-w-xl justify-center overflow-hidden rounded-2xl bg-white px-4 pt-6 shadow-xl animation-safe:transition-performant animation-safe:duration-500 md:mx-0 md:mt-0 md:w-[117%]",
          { "pb-6": !hasFade },
          {
            "animation-safe:translate-x-1/3 animation-safe:scale-90 animation-safe:opacity-60":
              shouldTransform,
          }
        )}
      >
        {image}
        {hasFade && (
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white to-transparent pb-[15%]"></div>
        )}
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home = ({ posts }: HomeProps) => {
  const url = `${constants.url}`;
  return (
    <>
      <NextSeo canonical={url} />
      <Layout>
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
                    I'm a senior software engineer living in Salt Lake City,
                    Utah.
                  </p>
                  <div className="relative inline-block">
                    <div className="absolute inset-0 h-full w-full rounded-full border-[8px] border-transparent"></div>
                    <Link href={posts[0].url}>
                      <a
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
                      </a>
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
              src={gridImage}
              alt="Perspective grid"
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
                      <div className="h-16 w-16 rounded-full border-[3px] border-white lg:h-20 lg:w-20">
                        <Image
                          className="rounded-full"
                          sizes={`(min-width: ${screens.lg}) 5rem, 4rem`}
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
                      Specializing in frontend web development, I use
                      JavaScript, Node.js, TypeScript, HTML, CSS, and React to
                      make websites and apps focused on performance,
                      accessibility, and a delightful user experience.
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
                                Building a{" "}
                                <a
                                  className="font-semibold text-purple-400"
                                  href="https://github.com/wikimedia/pixel"
                                >
                                  visual regression tool
                                </a>{" "}
                                used to catch UI bugs before end users see them
                                and increase confidence during code review and
                                in production releases.
                              </>
                            }
                            image={
                              <img
                                className="w-full"
                                src={visualRegressionArtImage}
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
                                test telemetry to automatically measure the
                                search component’s rendering performance.
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
                                Optimized article readability, accessibility,
                                and perceived performance by developing a{" "}
                                <a href="https://www.mediawiki.org/wiki/Reading/Web/Desktop_Improvements/Features/Limiting_content_width">
                                  new layout
                                </a>
                                for the desktop site which heavily refactored
                                the DOM and featured an optimal line length for
                                reading. The new layout was one of the most
                                dramatic visual changes to the desktop site in
                                over a decade!
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
                    about JavaScript, CSS, and the rest of the frontend
                    development world.
                  </Paragraph>
                  <ul className="mt-12 grid gap-x-12 sm:grid-cols-2 sm:gap-y-6 md:grid-rows-[repeat(3,auto)]">
                    {posts.map((post, idx) => (
                      <li
                        className={clsx([
                          { "pt-7": idx !== 0 },
                          { "sm:pt-0": idx !== 0 },
                          { "md:row-span-3": idx === 0 },
                          { "md:col-start-2": idx !== 0 },
                        ])}
                        key={idx}
                      >
                        <Link href={post.url}>
                          <a>
                            <article
                              className={clsx([
                                "grid",
                                "grid-cols-12",
                                "gap-x-6",
                                "md:h-full",
                                "overflow-hidden",
                                { "items-start": idx !== 0 },
                                { "md:rounded-2xl md:shadow-xl": idx === 0 },
                                { "grid-rows-[auto_1fr]": idx === 0 },
                              ])}
                            >
                              <div
                                className={clsx([
                                  "block",
                                  "relative",
                                  "col-span-12",
                                  "pb-[57%]",
                                  { "md:col-span-5": idx !== 0 },
                                  { "md:pb-[100%] lg:pb-[75%]": idx !== 0 },
                                ])}
                              >
                                <img
                                  src={post.cover}
                                  className={clsx([
                                    "absolute",
                                    "h-full",
                                    "w-full",
                                    "rounded-xl",
                                    { "md:rounded-b-none": idx === 0 },
                                    "object-cover",
                                  ])}
                                  alt=""
                                />
                              </div>
                              <div
                                className={clsx([
                                  "py-4",
                                  "col-span-12",
                                  { "md:py-10 md:px-6": idx === 0 },
                                  { "md:py-0": idx !== 0 },
                                  { "md:col-span-7": idx !== 0 },
                                ])}
                              >
                                <h3
                                  className={clsx([
                                    "mb-1",
                                    "text-lg",
                                    "font-bold",
                                    "text-gray-900",
                                    { "md:mb-4 md:text-2xl": idx === 0 },
                                  ])}
                                >
                                  {post.title}
                                </h3>
                                <div
                                  className={clsx([
                                    "mb-4",
                                    "font-medium",
                                    { "md:mb-8 md:text-lg": idx === 0 },
                                  ])}
                                  dangerouslySetInnerHTML={{
                                    __html: post.description.html,
                                  }}
                                />
                                <footer>
                                  <time
                                    dateTime={post.publishedAt}
                                    className="text-gray-600"
                                  >
                                    {post.publishedAtFormatted}
                                  </time>
                                </footer>
                              </div>
                            </article>
                          </a>
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
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      posts: allPosts(
        [
          "description",
          "publishedAt",
          "publishedAtFormatted",
          "cover",
          "url",
          "title",
        ],
        3
      ),
    },
  };
}

export default Home;
