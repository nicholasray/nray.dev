import Cta from "./Cta";
import ViewportPadding from "./ViewportPadding";
import avatar from "@public/avatar.jpg";
import styles from "@styles/blog/blog.module.css";
import NextImage from "next/image";

interface BlogArticleProps {
  title: string;
  description: string;
  publishedAt: string;
  publishedAtFormatted: string;
  readingTime: string;
  children: React.ReactNode;
}

function BlogArticle({
  children,
  title,
  publishedAt,
  publishedAtFormatted,
  readingTime,
}: BlogArticleProps) {
  return (
    <main className="grid grid-cols-1 gap-y-20 sm:gap-y-32 md:gap-y-40">
      <section>
        <ViewportPadding>
          <article className="mx-auto mt-10 max-w-3xl">
            <h1 className="mb-3 text-3xl font-bold text-white md:mb-6 md:text-5xl">
              {title}
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
                <time dateTime={publishedAt}>{publishedAtFormatted}</time>
                <span> — {readingTime}</span>
              </div>
            </div>

            <div
              className={`${styles.prose} prose-pre:shadow-inner-10 prose !prose-invert prose-slate max-w-none prose-pre:mt-0 prose-pre:px-0 prose-pre:!text-sm lg:prose-xl lg:prose-pre:mt-0 lg:prose-pre:px-0`}
            >
              {children}
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
        description={`If you liked this post, consider subscribing to my newsletter. I'll let you know when new posts are released and share additional insights that can help your front-end development career.
            
            No spam. Unsubscribe at any time.
            `}
      />
    </main>
  );
}

export default BlogArticle;
