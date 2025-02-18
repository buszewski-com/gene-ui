import type { Meta, StoryObj } from "@storybook/react";

import Grid from "./Grid";

const Box = () => (
  <div
    style={{
      background: "#eee",
      padding: "1rem",
      textAlign: "center",
      border: "1px solid #ccc",
    }}
  >
    Item
  </div>
);

export default {
  title: "Atoms/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    tag: {
      control: "select",
      options: ["div", "section", "article"],
    },
    columns: {
      control: "object",
    },
    gaps: {
      control: "object",
    },
  },
} satisfies Meta<typeof Grid>;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {
  args: {
    children: Array(12)
      .fill(0)
      .map((_, i) => <Box key={i} />),
  },
};

export const CustomColumns: Story = {
  args: {
    children: Array(6)
      .fill(0)
      .map((_, i) => <Box key={i} />),
    columns: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 6,
    },
  },
};

export const WithGaps: Story = {
  args: {
    children: Array(12)
      .fill(0)
      .map((_, i) => <Box key={i} />),
    gaps: {
      xs: 1,
      md: 2,
      xl: 4,
    },
  },
};

export const MixedGapTypes: Story = {
  args: {
    children: Array(12)
      .fill(0)
      .map((_, i) => <Box key={i} />),
    gaps: {
      xs: "10px",
      sm: 1,
      md: "2vh",
      lg: 2,
    },
  },
};

export const AsArticle: Story = {
  args: {
    tag: "article",
    children: Array(6)
      .fill(0)
      .map((_, i) => <Box key={i} />),
    columns: {
      xs: 2,
      md: 3,
      lg: 6,
    },
    gaps: {
      xs: 1,
      md: 2,
    },
  },
};

export const MultipleGrids: Story = {
  render: () => (
    <div>
      <Grid
        columns={{ xs: 2, md: 4 }}
        gaps={{ xs: 1, md: 2 }}
        style={{ marginBottom: "2rem" }}
      >
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Box key={i} />
          ))}
      </Grid>

      <Grid columns={{ xs: 3, md: 6 }} gaps={{ xs: "20px", md: "40px" }}>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Box key={i} />
          ))}
      </Grid>
    </div>
  ),
};
