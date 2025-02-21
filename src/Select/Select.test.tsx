import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Select from "./Select";

const defaultOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

describe("UI / Select", () => {
  it("renders select with options correctly", () => {
    render(
      <Select label="Choose option" name="select" options={defaultOptions} />,
    );

    const select = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");

    expect(select).toBeInTheDocument();
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("Option 1");
  });

  it("handles option selection", async () => {
    const user = userEvent.setup();
    render(
      <Select label="Choose option" name="select" options={defaultOptions} />,
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "2");

    expect(screen.getByRole("option", { name: "Option 2" })).toHaveValue("2");
    expect(select).toHaveValue("2");
  });

  it("renders description and connects with aria-describedby", () => {
    render(
      <Select
        label="Choose option"
        name="select"
        options={defaultOptions}
        description="Make your selection"
      />,
    );

    const select = screen.getByRole("combobox");
    const description = screen.getByText("Make your selection");

    expect(description).toBeInTheDocument();
    expect(select).toHaveAttribute("aria-describedby", "select-description");
  });

  it("displays error state correctly", () => {
    render(
      <Select
        label="Required"
        name="required"
        options={defaultOptions}
        error="Selection required"
      />,
    );

    const select = screen.getByRole("combobox");
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("Selection required");
    expect(select).toHaveAttribute("aria-invalid", "true");
  });
});
