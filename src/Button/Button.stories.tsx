import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const LoadingSpinner = () => (
  <svg data-testid="loading-spinner" width="16" height="16" viewBox="0 0 16 16">
    <circle
      cx="8"
      cy="8"
      r="7"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

export default {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
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

export const LoadingWithIcon: Story = {
  args: {
    children: "Submit",
    loadingText: "Submitting...",
    loadingIcon: <LoadingSpinner />,
    variant: "primary",
  },
};

export const LoadingWithIconWithoutText: Story = {
  args: {
    children: "Submit",
    loadingIcon: <LoadingSpinner />,
    variant: "primary",
  },
};
