export function remarkCover() {
  return function (tree: unknown, { data }: any) {
    console.log(data);
    // const textOnPage = toString(tree);
    // const readingTime = getReadingTime(textOnPage);
    // // readingTime.text will give us minutes read as a friendly string,
    // // i.e. "3 min read"
    // data.astro.frontmatter.readingTime = readingTime.text;
  };
}
