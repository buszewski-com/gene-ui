import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Textarea from "./Textarea";

describe("UI / Textarea", () => {
  it("renders textarea with label correctly", () => {
    render(<Textarea label="Comments" name="comments" />);

    const textarea = screen.getByRole("textbox");
    const label = screen.getByText("Comments");

    expect(textarea).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(textarea).toHaveAttribute("name", "comments");
  });

  it("handles text input", async () => {
    const user = userEvent.setup();
    render(<Textarea label="Bio" name="bio" />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Hello World");

    expect(textarea).toHaveValue("Hello World");
  });

  it("renders description and connects with aria-describedby", () => {
    render(
      <Textarea
        label="Message"
        name="message"
        description="Enter your message here"
      />,
    );

    const textarea = screen.getByRole("textbox");
    const description = screen.getByText("Enter your message here");

    expect(description).toBeInTheDocument();
    expect(textarea).toHaveAttribute("aria-describedby", "message-description");
  });

  it("displays error state correctly", () => {
    render(
      <Textarea
        label="Required"
        name="required"
        error="This field is required"
      />,
    );

    const textarea = screen.getByRole("textbox");
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("This field is required");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });
});
