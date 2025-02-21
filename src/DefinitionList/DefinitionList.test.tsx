import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DefinitionList from "./DefinitionList";

describe("UI / DefinitionList", () => {
  const defaultItems = [
    { term: "HTML", description: "HyperText Markup Language" },
    { term: "CSS", description: "Cascading Style Sheets" },
  ];

  it("renders terms and descriptions correctly", () => {
    render(<DefinitionList items={defaultItems} />);

    const terms = screen.getAllByRole("term");
    const descriptions = screen.getAllByRole("definition");

    expect(terms).toHaveLength(2);
    expect(descriptions).toHaveLength(2);
    expect(terms[0]).toHaveTextContent("HTML");
    expect(descriptions[0]).toHaveTextContent("HyperText Markup Language");
  });

  it("handles toggling when activeItem is provided", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DefinitionList items={defaultItems} activeItem={0} />,
    );

    const definitionGroups = container.querySelectorAll("dl > div");

    expect(definitionGroups[0]).toHaveAttribute("data-active", "true");
    expect(definitionGroups[1]).toHaveAttribute("data-active", "false");

    await user.click(definitionGroups[1]);

    expect(definitionGroups[0]).toHaveAttribute("data-active", "false");
    expect(definitionGroups[1]).toHaveAttribute("data-active", "true");
  });

  it("applies aria-hidden to inactive descriptions", () => {
    render(<DefinitionList items={defaultItems} activeItem={0} />);

    const descriptions = screen.getAllByRole("definition", { hidden: true });

    expect(descriptions[0]).toHaveAttribute("aria-hidden", "false");
    expect(descriptions[1]).toHaveAttribute("aria-hidden", "true");
  });

  it("applies custom props to terms and descriptions", () => {
    render(
      <DefinitionList
        items={defaultItems}
        termProps={{ className: "term-class" }}
        descriptionProps={{ className: "desc-class" }}
      />,
    );

    const terms = screen.getAllByRole("term");
    const descriptions = screen.getAllByRole("definition");

    expect(terms[0]).toHaveClass("term-class");
    expect(descriptions[0]).toHaveClass("desc-class");
  });
});
