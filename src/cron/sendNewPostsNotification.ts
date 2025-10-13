import Parser from "rss-parser";

export async function sendNewPostsNotification() {
  const startDate = new Date("Sun Oct 12 2025");
  console.log(startDate);
  const parser = new Parser();
  const feed = await parser.parseURL("https://www.nray.dev/rss.xml");
  feed.items.forEach((item) => {
    console.log(item.title + ":" + item.link);
  });
}
