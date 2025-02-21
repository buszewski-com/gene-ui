import { render, screen } from "@testing-library/react";

import Image from "./Image";

describe("UI / Image", () => {
  it("renders single image with caption", () => {
    render(
      <Image src="/image.jpg" alt="Test image" caption="Image description" />,
    );

    const image = screen.getByAltText("Test image");
    const caption = screen.getByText("Image description");

    expect(image).toHaveAttribute("src", "/image.jpg");
    expect(caption).toBeInTheDocument();
  });

  it("renders responsive images with sources", () => {
    const sources = [
      { srcSet: "/mobile.jpg", media: "(max-width: 768px)" },
      { srcSet: "/desktop.jpg", media: "(min-width: 769px)" },
    ];

    const { container } = render(
      <Image sources={sources} alt="Responsive image" src="/fallback.jpg" />,
    );

    const picture = container.querySelector("picture");
    const sourceElements = container.querySelectorAll("source");
    const image = container.querySelector("img");

    expect(picture).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(sourceElements).toHaveLength(2);
    expect(sourceElements[0]).toHaveAttribute("media", "(max-width: 768px)");
  });
});
