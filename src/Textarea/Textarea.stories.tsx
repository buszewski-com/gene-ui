import type { Meta, StoryObj } from "@storybook/react";

import Textarea from "./Textarea";

export default {
  title: "Textarea",
  component: Textarea,
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

export const Basic: Story = {
  args: {
    label: "Comments",
    name: "comments",
    placeholder: "Enter your comments...",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Bio",
    name: "bio",
    description: "Tell us about yourself",
    placeholder: "Write your bio here...",
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: "Message",
    name: "message",
    error: "Message is too short",
    placeholder: "Type your message",
    value: "Hi",
  },
};

export const Disabled: Story = {
  args: {
    label: "Readonly feedback",
    name: "feedback",
    disabled: true,
    value: "This is a readonly textarea",
  },
};
