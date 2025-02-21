import type { Meta, StoryObj } from "@storybook/react";

import AppHeader from "./AppHeader";

export default {
  title: "AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof AppHeader>;

type Story = StoryObj<typeof AppHeader>;

const Logo = () => <div>Logo</div>;
const MenuItem = ({ text }: { text: string }) => <a href="#">{text}</a>;

export const Basic: Story = {
  args: {
    logo: <Logo />,
    menu: (
      <ul>
        <MenuItem text="Products" />
        <MenuItem text="Services" />
        <MenuItem text="Support" />
      </ul>
    ),
  },
};

export const WithCustomContainer: Story = {
  args: {
    logo: <Logo />,
    menu: (
      <ul>
        <MenuItem text="Products" />
        <MenuItem text="Services" />
        <MenuItem text="Support" />
      </ul>
    ),
    containerProps: {
      className: "custom-container",
    },
  },
};
