interface HeadProps {
  title: string;
  canonical?: string;
  description?: string;
  includeOg?: boolean;
}

function Head({
  canonical,
  title,
  description = "Learn JavaScript, React, CSS and more front-end development from the portfolio site of Nick Ray.",
  includeOg = false,
}: HeadProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index,follow" />
      <link rel="shortcut icon" href="/favicon.png" />
      {canonical && <link rel="canonical" href={canonical} />}

      {includeOg && (
        <>
          <meta property="og:type" content="website" />
          <meta
            property="og:site_name"
            content={"Nick Ray - Senior Software Engineer"}
          />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={canonical} />
        </>
      )}
    </>
  );
}

export default Head;
