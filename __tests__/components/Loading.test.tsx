import { render, screen } from "@testing-library/react";

import Loading from "@/components/Loading/Loading";

describe("Loading", () => {
  it("should render the loading container", () => {
    const { container } = render(<Loading />);

    expect(container.querySelector<HTMLDivElement>("div.loading")).toBeInTheDocument();
  });

  it("should display the loading heading", () => {
    render(<Loading />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Loading...");
  });
});
