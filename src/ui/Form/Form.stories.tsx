import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../";

import Form from "./Form";

export default {
  title: "Form",
  component: Form,
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof Form>;

export const Basic: Story = {
  args: {
    children: <Input name="example" placeholder="Basic form input" />,
  },
};

export const WithFieldset: Story = {
  args: {
    legend: "Contact Information",
    children: (
      <>
        <Input label="Name" name="name" />
        <Input label="Email" type="email" name="email" />
      </>
    ),
  },
};
