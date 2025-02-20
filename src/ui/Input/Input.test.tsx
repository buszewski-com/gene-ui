import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Input from "./Input";

describe("UI / Input", () => {
  it("renders basic input correctly", () => {
    render(<Input name="test-input" data-testid="test-input" />);
    const input = screen.getByTestId("test-input");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "test-input");
  });

  it("renders input with label correctly", () => {
    render(<Input label="Username" name="username" />);

    const label = screen.getByText("Username");
    const input = screen.getByLabelText("Username");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "username");
  });

  it("renders description and connects it with aria-describedby", () => {
    render(
      <Input
        label="Username"
        name="username"
        description="Enter your username"
      />,
    );

    const input = screen.getByLabelText("Username");
    const description = screen.getByText("Enter your username");

    expect(description).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-describedby", "username-description");
  });

  it("renders error state correctly", () => {
    render(<Input label="Email" name="email" error="Invalid email" />);

    const input = screen.getByLabelText("Email");
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("Invalid email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
  });

  it("combines multiple aria-describedby references", () => {
    render(
      <Input
        label="Username"
        name="username"
        description="Enter username"
        error="Invalid username"
        aria-describedby="external-desc"
      />,
    );

    const input = screen.getByLabelText("Username");
    expect(input).toHaveAttribute(
      "aria-describedby",
      "external-desc username-description username-error",
    );
  });

  it("maintains keyboard focus", async () => {
    const user = userEvent.setup();
    render(<Input label="Username" name="username" />);

    const input = screen.getByLabelText("Username");
    await user.tab();

    expect(input).toHaveFocus();
  });
});
