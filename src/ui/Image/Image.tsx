import type { ComponentProps, ReactNode } from "react";

interface Source {
  srcSet: string;
  media: string;
}

interface BaseProps {
  alt: string;
  caption?: ReactNode;
  imgProps?: ComponentProps<"img">;
  captionProps?: ComponentProps<"figcaption">;
}

interface SingleImageProps extends BaseProps {
  src: string;
  sources?: never;
}

interface ResponsiveImageProps extends BaseProps {
  src?: never;
  sources: Source[];
}

type Props = SingleImageProps | ResponsiveImageProps;

function Image({
  sources,
  src,
  alt,
  caption,
  imgProps,
  captionProps,
  ...rest
}: Props) {
  return (
    <figure {...rest}>
      {sources ? (
        <picture>
          {sources.map((source, index) => (
            <source key={index} srcSet={source.srcSet} media={source.media} />
          ))}
          <img {...imgProps} src={src} alt={alt} />
        </picture>
      ) : (
        <img {...imgProps} src={src} alt={alt} />
      )}
      {caption && <figcaption {...captionProps}>{caption}</figcaption>}
    </figure>
  );
}

export default Image;
