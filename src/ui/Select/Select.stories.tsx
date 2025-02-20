import type { Meta, StoryObj } from "@storybook/react";

import Select from "./Select";

export default {
  title: "Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

export const Basic: Story = {
  args: {
    label: "Select size",
    name: "size",
    options: defaultOptions,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Choose country",
    name: "country",
    description: "Select your shipping destination",
    options: [
      { value: "us", label: "United States" },
      { value: "ca", label: "Canada" },
      { value: "uk", label: "United Kingdom" },
    ],
  },
};

export const WithError: Story = {
  args: {
    label: "Required selection",
    name: "required",
    options: defaultOptions,
    error: "Please select an option",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled select",
    name: "disabled",
    options: defaultOptions,
    disabled: true,
  },
};
