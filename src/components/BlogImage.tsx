import NextImage from "next/future/image";

interface ImageProps {
  src: string;
  caption?: string;
  width: string;
  height: string;
}

/**
 * Image component to be used in blog posts.
 */
const Image = ({ src, caption, ...props }: ImageProps) => {
  return (
    <figure>
      <a href={src}>
        <NextImage className="w-full" sizes="(min-width: 48rem) 48rem, 100vw" src={src} {...props} />
      </a>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default Image;
