import type { Meta, StoryObj } from "@storybook/react";

import Input from "./Input";

export default {
  title: "Input",
  tags: ["autodocs"],
  component: Input,
  args: {
    name: "default-input",
  },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Password",
    type: "password",
    description: "Password must be at least 8 characters long",
    placeholder: "Enter password",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    error: "Please enter a valid email address",
    placeholder: "Enter email",
    defaultValue: "invalid-email",
  },
};

export const WithLabelAndDescriptionAndError: Story = {
  args: {
    label: "Username",
    description: "Choose a unique username",
    error: "This username is already taken",
    placeholder: "Enter username",
    defaultValue: "taken-username",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    disabled: true,
    placeholder: "Cannot type here",
  },
};
