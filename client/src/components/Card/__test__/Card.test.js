import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import Card from "../Card";

describe("Card component", () => {
  const cardProps = {
    name: "Octave",
    phone: "123456789",
    email: "test@test.com",
    img: {
      url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80",
      alt: "Cute cat",
    },
    favourite: false,
    updateFavourite: () => {},
    index: 1,
  };
  test("should show name of cat", () => {
    render(<Card {...cardProps} />);
    expect(
      screen.getByRole("heading", {
        name: /Octave/i,
      })
    ).toBeInTheDocument();
  });
  test("should show phone number", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(/123456789/i)).toBeInTheDocument();
  });
  test("should show the email address", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText("test@test.com")).toBeInTheDocument();
  });
  test("should show image with correct src", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByAltText("Cute cat")).toHaveAttribute(
      "src",
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
    );
  });
  test("should show alt text for image", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByAltText("Cute cat")).toBeInTheDocument();
  });
  test("should show outlined heart", () => {
    render(<Card {...cardProps} />);
    expect(screen.queryByAltText(/Filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/Outlined heart/i)).toBeInTheDocument();
  });
  test("should show filled heart", () => {
    render(<Card {...cardProps} favoured={true} />);
    expect(screen.queryByAltText(/Outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/Filled heart/i)).toBeInTheDocument();
  });
  test("should toggle heart status", () => {
    render(<Card {...cardProps} />);
    userEvents.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/Outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/Filled heart/i)).toBeInTheDocument();

    userEvents.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/Filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/Outlined heart/i)).toBeInTheDocument();
  });
});
