import { allPages } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import ViewportPadding from "@components/ViewportPadding";

interface Params {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPages.map((page) => ({
    slug: page.slug,
  }));
}

export const dynamicParams = false;

const Page = ({ params }: Params) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const page = allPages.find(
    (page) => page._raw.flattenedPath === params.slug
  )!;

  const MDXContent = useMDXComponent(page.body.code);

  return (
    <>
      <ViewportPadding>
        <article className="mx-auto mt-10 mb-20 max-w-3xl sm:mb-32 md:mb-40">
          <div className="prose !prose-invert prose-slate max-w-none prose-pre:bg-gray-800 lg:prose-xl">
            <MDXContent />
          </div>
        </article>{" "}
      </ViewportPadding>
    </>
  );
};

export default Page;
