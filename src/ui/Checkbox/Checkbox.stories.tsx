import type { Meta, StoryObj } from "@storybook/react";

import Checkbox from "./Checkbox";

export default {
  title: "Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Basic: Story = {
  args: {
    label: "Accept terms and conditions",
    name: "terms",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Subscribe to newsletter",
    name: "newsletter",
    description: "Get weekly updates about our products",
  },
};

export const WithError: Story = {
  args: {
    label: "Required checkbox",
    name: "required",
    error: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    name: "disabled",
    disabled: true,
  },
};
