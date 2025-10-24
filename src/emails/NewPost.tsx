import type { Post } from "@/types";
import {
  Section,
  Img,
  Text,
  Heading,
  Button,
  Tailwind,
  pixelBasedPreset,
  Font,
  Head,
  Html,
} from "@react-email/components";

export const NewPost = ({ id, url, data }: Post) => {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcviYwYZ8UA3.woff2",
            format: "woff2",
          }}
          fontWeight="400 800"
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                primary: "hsl(222.2 47.4% 11.2%) ",
              },
            },
          },
        }}
      >
        <Section className="my-[16px] p-8">
          <Img
            alt="Cover image for blog"
            className="w-full rounded-[12px] object-cover"
            height="320"
            src={`https://www.nray.dev/blog/${id}.png`}
          />
          <Section className="mt-[32px] text-center">
            <Text className="text-primary my-[16px] text-[18px] leading-[28px] font-semibold">
              New article
            </Text>
            <Heading
              as="h1"
              className="m-0 mt-[8px] text-[36px] leading-[36px] font-extrabold tracking-tight text-slate-900"
            >
              {data.title}
            </Heading>
            <Text className="text-[16px] leading-[24px] text-slate-500">
              {data.description}
            </Text>
            <Button
              className="bg-primary mt-[16px] rounded-[8px] px-[40px] py-[12px] font-medium text-white"
              href={url}
            >
              Read more
            </Button>
            <Button
              className="bg-primary mt-[16px] rounded-[8px] px-[40px] py-[12px] font-semibold text-white"
              href={url}
            >
              Read more
            </Button>
          </Section>
        </Section>
      </Tailwind>
    </Html>
  );
};

NewPost.PreviewProps = {
  id: "how-to-automatically-switch-images-for-dark-and-light-mode",
  url: "https://www.nray.dev/blog/how-to-automatically-switch-images-for-dark-and-light-mode/",
  data: {
    title: "How to Automatically Switch Images for Dark and Light Mode",
    description:
      "Learn how to display the correct image for dark and light mode on your website",
  },
};

export default NewPost;
