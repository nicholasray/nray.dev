import { allPages, Page } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import Layout from "src/components/Layout";
import ViewportPadding from "src/components/ViewportPadding";

interface PageProps {
  page: Page;
}

const PageLayout = ({ page }: PageProps) => {
  const MDXContent = useMDXComponent(page.body.code);

  return (
    <>
      <Head>
        <title>{page.title}</title>
      </Head>
      <Layout>
        <ViewportPadding>
          <article className="mx-auto mt-10 mb-20 max-w-3xl sm:mb-32 md:mb-40">
            <div className="prose !prose-invert prose-slate max-w-none prose-pre:bg-gray-800 lg:prose-xl">
              <MDXContent />
            </div>
          </article>{" "}
        </ViewportPadding>
      </Layout>
    </>
  );
};

export default PageLayout;

interface Params {
  params: {
    page: string;
  };
}

export async function getStaticPaths() {
  const paths = allPages.map((page) => page.url);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const page = allPages.find((page) => page._raw.flattenedPath === params.page);

  if (!page) {
    return;
  }

  // Only pass data that the client actually uses.
  return {
    props: {
      page: {
        url: page.url,
        body: {
          code: page.body.code,
        },
      },
    },
  };
}
