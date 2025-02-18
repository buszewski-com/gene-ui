import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Grid from "./Grid";

describe("UI / Atoms / Grid", () => {
  it("renders as div by default", () => {
    render(<Grid data-testid="grid" />);
    const element = screen.getByTestId("grid");
    expect(element.tagName).toBe("DIV");
  });

  it("renders as section when tag prop is section", () => {
    render(<Grid tag="section" data-testid="grid" />);
    const element = screen.getByTestId("grid");
    expect(element.tagName).toBe("SECTION");
  });

  it("renders with correct column configuration", () => {
    render(
      <Grid
        data-testid="grid"
        columns={{
          xs: 1,
          md: 2,
          lg: 4,
        }}
      />,
    );
    const element = screen.getByTestId("grid");

    expect(element).toHaveStyle({
      "--columns-xs": "1",
      "--columns-md": "2",
      "--columns-lg": "4",
    });
  });

  it("renders with correct gap configuration", () => {
    render(
      <Grid
        data-testid="grid"
        gaps={{
          xs: 1,
          md: 2,
          xl: 4,
        }}
      />,
    );
    const element = screen.getByTestId("grid");

    expect(element).toHaveStyle({
      "--gap-xs": "1rem",
      "--gap-md": "2rem",
      "--gap-xl": "4rem",
    });
  });

  it("logs warning for semantically incorrect tags", () => {
    const consoleSpy = vi
      .spyOn(console, "warn")
      .mockImplementation((str: string) => str);

    render(<Grid tag="nav" data-testid="grid" />);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Using nav as a grid container might not be semantically correct, Consider reverting to div, article or section.",
    );

    consoleSpy.mockRestore();
  });

  it("renders as article with children and styles", () => {
    render(
      <Grid
        tag="article"
        data-testid="grid"
        columns={{ xs: 2 }}
        gaps={{ xs: 1 }}
      >
        <span>Grid content</span>
      </Grid>,
    );
    const element = screen.getByTestId("grid");

    expect(element.tagName).toBe("ARTICLE");
    expect(element).toHaveTextContent("Grid content");
    expect(element).toHaveStyle({
      "--columns-xs": "2",
      "--gap-xs": "1rem",
    });
  });
  it("handles string gap values without adding rem suffix", () => {
    render(
      <Grid
        data-testid="grid"
        gaps={{
          xs: "10px",
          sm: "2vh",
          md: "100%",
        }}
      />,
    );
    const element = screen.getByTestId("grid");

    expect(element).toHaveStyle({
      "--gap-xs": "10px",
      "--gap-sm": "2vh",
      "--gap-md": "100%",
    });
  });

  it("handles mixed string and number gap values correctly", () => {
    render(
      <Grid
        data-testid="grid"
        gaps={{
          xs: 1,
          sm: "20px",
          md: 2.5,
          lg: "5vh",
        }}
      />,
    );
    const element = screen.getByTestId("grid");

    expect(element).toHaveStyle({
      "--gap-xs": "1rem",
      "--gap-sm": "20px",
      "--gap-md": "2.5rem",
      "--gap-lg": "5vh",
    });
  });

  it("correctly applies fallback values with mixed types", () => {
    render(
      <Grid
        data-testid="grid"
        gaps={{
          xs: "10px",
          lg: 2,
        }}
      />,
    );
    const element = screen.getByTestId("grid");

    expect(element).toHaveStyle({
      "--gap-xs": "10px",
      "--gap-sm": "10px",
      "--gap-md": "10px",
      "--gap-lg": "2rem",
      "--gap-xl": "2rem",
    });
  });

  it("renders with default column configuration when none provided", () => {
    render(<Grid data-testid="grid" />);
    const element = screen.getByTestId("grid");

    expect(element).toHaveStyle({
      "--columns-xs": "4",
      "--columns-sm": "6",
      "--columns-md": "12",
      "--columns-lg": "12",
      "--columns-xl": "12",
    });
  });

  it("renders with correct column configuration overriding defaults", () => {
    render(
      <Grid
        data-testid="grid"
        columns={{
          xs: 1,
          md: 2,
          lg: 4,
        }}
      />,
    );
    const element = screen.getByTestId("grid");

    expect(element).toHaveStyle({
      "--columns-xs": "1",
      "--columns-md": "2",
      "--columns-lg": "4",
      "--columns-xl": "4", // Falls back to lg value
    });
  });
});
