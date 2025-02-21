import type { Meta, StoryObj } from "@storybook/react";

import DefinitionList from "./DefinitionList";

export default {
  title: "DefinitionList",
  component: DefinitionList,
  tags: ["autodocs"],
} satisfies Meta<typeof DefinitionList>;

type Story = StoryObj<typeof DefinitionList>;

const defaultItems = [
  { term: "HTML", description: "HyperText Markup Language" },
  { term: "CSS", description: "Cascading Style Sheets" },
  { term: "JS", description: "JavaScript" },
];

export const Basic: Story = {
  args: {
    items: defaultItems,
  },
};

export const WithActiveItem: Story = {
  args: {
    items: defaultItems,
    activeItem: 0,
  },
};

export const WithCustomStyling: Story = {
  args: {
    items: defaultItems,
    termProps: { className: "font-bold" },
    descriptionProps: { className: "text-gray-600" },
    activeItem: 1,
  },
};
