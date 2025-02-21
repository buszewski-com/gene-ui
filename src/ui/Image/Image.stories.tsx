import type { Meta, StoryObj } from "@storybook/react";

import Image from "./Image";

export default {
  title: "Image",
  component: Image,
  tags: ["autodocs"],
} satisfies Meta<typeof Image>;

type Story = StoryObj<typeof Image>;

export const SingleImage: Story = {
  args: {
    src: "https://fillmurray.lucidinternets.com/800/400",
    alt: "A cute kitten",
    caption: "This is a single responsive image",
  },
};

export const ResponsiveImages: Story = {
  args: {
    sources: [
      {
        srcSet: "https://fillmurray.lucidinternets.com/400/200",
        media: "(max-width: 768px)",
      },
      {
        srcSet: "https://fillmurray.lucidinternets.com/800/400",
        media: "(min-width: 769px)",
      },
    ],
    src: "https://fillmurray.lucidinternets.com/600/300",
    alt: "Responsive kitten image",
    caption: "This image adapts to screen size",
  },
};
