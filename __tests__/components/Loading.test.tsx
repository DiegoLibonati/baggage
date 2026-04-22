import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import Loading from "@/components/Loading/Loading";

const renderComponent = (): RenderResult => render(<Loading />);

describe("Loading", () => {
  describe("rendering", () => {
    it("should render the loading heading", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: "Loading..." })).toBeInTheDocument();
    });
  });
});
