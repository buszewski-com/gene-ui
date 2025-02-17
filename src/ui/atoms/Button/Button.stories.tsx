import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

export default {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Loading: Story = {
  args: {
    children: "Submit",
    loadingText: "Submitting...",
    variant: "primary",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
    variant: "primary",
  },
};
