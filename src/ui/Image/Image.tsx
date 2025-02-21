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
  src: string;
}

interface SingleImageProps extends BaseProps {
  sources?: never;
  pictureProps?: never;
}

interface ResponsiveImageProps extends BaseProps {
  sources: Source[];
  pictureProps?: ComponentProps<"picture">;
}

type Props = SingleImageProps | ResponsiveImageProps;

function Image({
  sources,
  src,
  alt,
  caption,
  imgProps,
  captionProps,
  pictureProps,
  ...rest
}: Props) {
  return (
    <figure {...rest}>
      {sources ? (
        <picture {...pictureProps}>
          {sources.map((source) => (
            <source
              key={source.srcSet}
              srcSet={source.srcSet}
              media={source.media}
            />
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
