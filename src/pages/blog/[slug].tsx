import Layout from "../../components/Layout";
import React from "react";
import { Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import avatar from "../../../public/avatar.jpeg";
import NextImage from "next/image";
import styles from "./blog.module.css";
import BlogImage from "src/components/BlogImage";
import ViewportPadding from "src/components/ViewportPadding";
import Cta from "src/components/Cta";
import { NextSeo } from "next-seo";
import constants from "src/constants";
import { allPosts } from "src/api";

interface PostProps {
  post: Post;
}

export default function PostLayout({ post }: PostProps) {
  const MDXContent = useMDXComponent(post.body.code);
  const url = `${constants.url}${post.url}`;

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description.raw}
        canonical={url}
        openGraph={{
          url,
          title: post.title,
          description: post.description.raw,
        }}
      />
      <Layout>
        <main className="grid grid-cols-1 gap-y-20 sm:gap-y-32 md:gap-y-40">
          <section>
            <ViewportPadding>
              <article className="mx-auto mt-10 max-w-3xl">
                <h1 className="mb-3 text-3xl font-bold text-white md:mb-6 md:text-5xl">
                  {post.title}
                </h1>
                <div className="mb-8 flex items-center justify-between text-sm font-medium md:text-base">
                  <div className="flex items-center">
                    <div className="mr-3 h-9 w-9 rounded-full">
                      <NextImage
                        className="rounded-full"
                        sizes={`2.25rem`}
                        src={avatar}
                        alt="Avatar"
                      />
                    </div>
                    <div>Nick Ray</div>
                  </div>
                  <div>
                    <time dateTime={post.publishedAt}>
                      {post.publishedAtFormatted}
                    </time>
                    <span> — {post.readTime}</span>
                  </div>
                </div>

                <div
                  className={`${styles.prose} prose-pre:shadow-inner-10 prose !prose-invert prose-slate max-w-none prose-pre:bg-gray-800 lg:prose-xl`}
                >
                  <MDXContent components={{ Image: BlogImage }} />
                </div>
              </article>
              <div className="mx-auto mt-10 max-w-3xl text-xl">
                <a href="https://www.buymeacoffee.com/nraydev">
                  ☕ Help me write more articles with a coffee →
                </a>
              </div>
            </ViewportPadding>
          </section>
          <Cta
            description={`If you liked this post, consider subscribing to my newsletter. I'll let you know when new posts are released and share additional insights that can help your frontend development career.
            
            No spam. Unsubscribe at any time.
            `}
          />
        </main>
      </Layout>
    </>
  );
}

interface Params {
  params: {
    slug: string;
  };
}

export async function getStaticPaths() {
  const paths = allPosts(['status', 'url'])
    .map((post) => post.url);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const post = allPosts(['title', 'description', 'publishedAt', 'publishedAtFormatted', 'readTime', 'url', 'body', '_raw']).find(
    (post) => post._raw.flattenedPath.split("/").pop() === params.slug
  );


  if (!post) {
    return;
  }

  // Prevent `body.raw` from increasing the client JS payload.
  post.body.raw = '';

  // Only pass data that the client actually uses.
  return {
    props: {
      post
    },
  };
}
