import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Radio from "./Radio";

describe("UI / Radio", () => {
  it("renders radio with label correctly", () => {
    render(<Radio label="Select option" name="option" />);

    const radio = screen.getByRole("radio");
    const label = screen.getByText("Select option");

    expect(radio).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(radio).toHaveAttribute("name", "option");
  });

  it("handles radio state changes", async () => {
    const user = userEvent.setup();
    render(<Radio label="Choose me" name="choice" />);

    const radio = screen.getByRole("radio");

    expect(radio).not.toBeChecked();
    await user.click(radio);
    expect(radio).toBeChecked();
  });

  it("renders description and connects with aria-describedby", () => {
    render(
      <Radio label="Option" name="option" description="Additional info" />,
    );

    const radio = screen.getByRole("radio");
    const description = screen.getByText("Additional info");

    expect(description).toBeInTheDocument();
    expect(radio).toHaveAttribute("aria-describedby", "option-description");
  });

  it("displays error state correctly", () => {
    render(
      <Radio label="Required" name="required" error="This field is required" />,
    );

    const radio = screen.getByRole("radio");
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("This field is required");
    expect(radio).toHaveAttribute("aria-invalid", "true");
  });
});
