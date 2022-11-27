import ViewportPadding from "@components/ViewportPadding";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ViewportPadding>
      <article className="mx-auto mt-10 mb-20 max-w-3xl sm:mb-32 md:mb-40">
        <div className="prose !prose-invert prose-slate max-w-none prose-pre:bg-gray-800 lg:prose-xl">
          {children}
        </div>
      </article>
    </ViewportPadding>
  );
}
