import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import Button from "./Button";

describe("UI / Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
  });

  it("handles different variants", () => {
    render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </>,
    );

    expect(screen.getByText("Primary")).toBeInTheDocument();
    expect(screen.getByText("Secondary")).toBeInTheDocument();
  });

  it("handles loading state correctly", () => {
    render(<Button loadingText="Loading...">Submit</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Loading...");
  });

  it("forwards refs correctly", () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Click me</Button>);

    expect(ref).toHaveBeenCalled();
  });

  it("handles click events when not disabled", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders loading icon when provided and in loading state", () => {
    const LoadingIcon = () => <span data-testid="loading-icon">⌛</span>;

    render(
      <Button loadingIcon={<LoadingIcon />} loadingText="Loading...">
        Submit
      </Button>,
    );

    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
