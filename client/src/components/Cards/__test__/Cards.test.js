import { render, screen } from "@testing-library/react";
import Cards from "../Cards";
import catsData from "../../../mocks/cats.json";

describe("Cards component", () => {
  test("should render five card components", () => {
    render(<Cards cats={catsData} />);
    expect(screen.getAllByRole("article").length).toBe(5);
  });
});
