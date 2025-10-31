import { ORIGIN_URL } from "@/config/config";
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
        }}
      >
        <Section className="my-[16px] p-8">
          <Img
            alt="Cover image for blog"
            className="w-full rounded-[12px] object-cover"
            height="320"
            src={`${ORIGIN_URL}/blog/${id}.png${ORIGIN_URL?.includes("localhost") ? "/" : ""}`}
          />
          <Section className="mt-[32px] text-center">
            <Text className="my-[16px] text-[16px] leading-[28px] font-semibold text-slate-700">
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
              className="mt-[16px] rounded-[8px] bg-slate-900 px-[40px] py-[12px] font-medium text-white"
              href={`${ORIGIN_URL}${url}`}
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
  url: "/blog/how-to-automatically-switch-images-for-dark-and-light-mode/",
  data: {
    title: "How to Automatically Switch Images for Dark and Light Mode",
    description:
      "Learn how to display the correct image for dark and light mode on your website",
  },
};

export default NewPost;
