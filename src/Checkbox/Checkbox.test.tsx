import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Checkbox from "./Checkbox";

describe("UI / Checkbox", () => {
  it("renders checkbox with label correctly", () => {
    render(<Checkbox label="Accept terms" name="terms" />);

    const checkbox = screen.getByRole("checkbox");
    const label = screen.getByText("Accept terms");

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("name", "terms");
  });

  it("handles checkbox state changes", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Subscribe" name="subscribe" />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("renders description and connects with aria-describedby", () => {
    render(
      <Checkbox
        label="Newsletter"
        name="newsletter"
        description="Receive weekly updates"
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    const description = screen.getByText("Receive weekly updates");

    expect(description).toBeInTheDocument();
    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      "newsletter-description",
    );
  });

  it("displays error state correctly", () => {
    render(
      <Checkbox
        label="Required"
        name="required"
        error="This field is required"
      />,
    );

    const checkbox = screen.getByRole("checkbox");
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("This field is required");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
  });
});
