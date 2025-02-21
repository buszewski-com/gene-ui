import { render, screen } from "@testing-library/react";

import AppHeader from "./AppHeader";

describe("UI / AppHeader", () => {
  const defaultProps = {
    logo: <div>Logo</div>,
    menu: (
      <div>
        <a key="1" href="#" role="link">
          Home
        </a>
        <a key="2" href="#" role="link">
          About
        </a>
        <a key="3" href="#" role="link">
          Contact
        </a>
      </div>
    ),
  };

  it("renders header with logo and navigation", () => {
    render(<AppHeader {...defaultProps} />);

    const header = screen.getByRole("banner");
    const nav = screen.getByRole("navigation", { hidden: true });
    const logo = screen.getByText("Logo");

    expect(header).toBeInTheDocument();
    expect(nav).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });

  it("renders all menu items in navigation", () => {
    render(<AppHeader {...defaultProps} />);

    const links = screen.getAllByRole("link", { hidden: true });

    expect(links).toHaveLength(3);
    expect(links[0]).toHaveTextContent("Home");
  });

  it("applies custom container props", () => {
    render(
      <AppHeader
        {...defaultProps}
        containerProps={{ className: "custom-container" }}
      />,
    );

    const container = screen.getByText("Logo").parentElement;
    expect(container).toHaveClass("custom-container");
  });

  it("has accessible navigation", () => {
    render(<AppHeader {...defaultProps} />);

    const nav = screen.getByRole("navigation", { hidden: true });
    expect(nav).toHaveAttribute("aria-label", "Main navigation");
  });
});
