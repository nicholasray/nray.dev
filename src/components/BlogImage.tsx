import NextImage, { StaticImageData } from "next/image";

interface ImageProps {
  src: StaticImageData;
  caption?: string;
}

/**
 * Image component to be used in blog posts.
 */
const Image = ({ src, caption, ...props }: ImageProps) => {
  return (
    <figure>
      <a href={src.src}>
        <NextImage
          alt=""
          className="w-full"
          sizes="(min-width: 48rem) 48rem, 100vw"
          src={src}
          {...props}
        />
      </a>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default Image;
