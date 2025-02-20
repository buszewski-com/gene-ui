import type { Meta, StoryObj } from "@storybook/react";

import Radio from "./Radio";

export default {
  title: "Radio",
  component: Radio,
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

type Story = StoryObj<typeof Radio>;

export const Basic: Story = {
  args: {
    label: "Radio option",
    name: "option",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Select me",
    name: "choice",
    description: "Additional information about this option",
  },
};

export const WithError: Story = {
  args: {
    label: "Required option",
    name: "required",
    error: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Unavailable option",
    name: "disabled",
    disabled: true,
  },
};
