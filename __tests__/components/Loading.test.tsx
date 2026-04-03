import { render, screen } from "@testing-library/react";

import Loading from "@/components/Loading/Loading";

type RenderComponent = { container: HTMLElement };

const renderComponent = (): RenderComponent => {
  const { container } = render(<Loading />);
  return { container };
};

describe("Loading", () => {
  it("should render the loading container", () => {
    const { container } = renderComponent();

    expect(container.querySelector<HTMLDivElement>("div.loading")).toBeInTheDocument();
  });

  it("should display the loading heading", () => {
    renderComponent();

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Loading...");
  });
});
