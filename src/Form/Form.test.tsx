import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { FormEvent } from "react";

import { Input } from "../";

import Form from "./Form";

describe("UI / Form", () => {
  it("renders basic form correctly", () => {
    render(
      <Form data-testid="test-form">
        <input type="text" />
      </Form>,
    );

    expect(screen.getByTestId("test-form")).toBeInTheDocument();
  });

  it("renders form with fieldset and legend", () => {
    render(
      <Form legend="Personal Information">
        <Input type="text" />
      </Form>,
    );

    const legend = screen.getByText("Personal Information");
    const fieldset = screen.getByRole("group");

    expect(legend).toBeInTheDocument();
    expect(fieldset).toBeInTheDocument();
  });

  it("captures and submits form data correctly", async () => {
    const handleSubmit = vi.fn((e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      return Object.fromEntries(formData);
    });

    const user = userEvent.setup();

    render(
      <Form onSubmit={handleSubmit}>
        <Input name="username" data-testid="username" />
        <Input name="email" type="email" data-testid="email" />
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.type(screen.getByTestId("username"), "testuser");
    await user.type(screen.getByTestId("email"), "test@example.com");
    await user.click(screen.getByRole("button"));

    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit.mock.results[0].value).toEqual({
      username: "testuser",
      email: "test@example.com",
    });
  });

  it("handles multiple input types and their values", async () => {
    const handleSubmit = vi.fn((e: FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      return Object.fromEntries(formData);
    });

    const user = userEvent.setup();

    render(
      <Form onSubmit={handleSubmit}>
        <Input name="text" type="text" />
        <Input name="checkbox" type="checkbox" />
        <select name="select">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.type(screen.getByRole("textbox"), "text input");
    await user.click(screen.getByRole("checkbox"));
    await user.selectOptions(screen.getByRole("combobox"), "option2");
    await user.click(screen.getByRole("button"));

    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit.mock.results[0].value).toEqual({
      text: "text input",
      checkbox: "on",
      select: "option2",
    });
  });
});
