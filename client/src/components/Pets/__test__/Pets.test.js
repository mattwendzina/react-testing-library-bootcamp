import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pets from "../Pets";
import { rest } from "msw";
import { setupServer } from "msw/node";
import catsMock from "../../../mocks/cats.json";

const server = setupServer(
  rest.get("http://localhost:4000/cats", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(catsMock));
  })
);

const setup = () => render(<Pets />);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Pets component", () => {
  test("should render the correct number of cards", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });

  test("should filter for male cats", async () => {
    setup();
    const cards = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");

    expect(screen.getAllByRole("article")).toStrictEqual([cards[1], cards[3]]);
  });
  test("should filter for female cats", async () => {
    setup();
    const cards = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");

    expect(screen.getAllByRole("article")).toStrictEqual([
      cards[0],
      cards[2],
      cards[4],
    ]);
  });

  test("should filter for favourite cats", async () => {
    setup();
    const cards = await screen.findAllByRole("article");
    const btnForFirstCard = within(cards[0]).getByRole("button");
    const btnForFourthCard = within(cards[3]).getByRole("button");
    userEvent.click(btnForFirstCard);
    userEvent.click(btnForFourthCard);
    userEvent.selectOptions(screen.getByLabelText(/favourite/i), "Favourite");

    expect(screen.getAllByRole("article")).toStrictEqual([cards[0], cards[3]]);
  });
  test("should filter for not favourite cats", async () => {
    setup();
    const cards = await screen.findAllByRole("article");
    const btnForFirstCard = within(cards[0]).getByRole("button");
    const btnForFourthCard = within(cards[3]).getByRole("button");
    userEvent.click(btnForFirstCard);
    userEvent.click(btnForFourthCard);
    userEvent.selectOptions(
      screen.getByLabelText(/favourite/i),
      "not favourite"
    );

    expect(screen.getAllByRole("article")).toStrictEqual([
      cards[1],
      cards[2],
      cards[4],
    ]);
  });

  test("should filter for favourite male cats", async () => {
    setup();
    const cards = await screen.findAllByRole("article");
    const btnForSecondCard = within(cards[1]).getByRole("button");
    const btnForThirdCard = within(cards[2]).getByRole("button");

    userEvent.click(btnForSecondCard);
    userEvent.click(btnForThirdCard);
    userEvent.selectOptions(screen.getByLabelText(/favourite/i), "favourite");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");
    expect(screen.getAllByRole("article")).toStrictEqual([cards[1]]);
  });
  test("should filter for favourite female cats", async () => {
    setup();
    const cards = await screen.findAllByRole("article");
    const btnForSecondCard = within(cards[1]).getByRole("button");
    const btnForThirdCard = within(cards[2]).getByRole("button");

    userEvent.click(btnForSecondCard);
    userEvent.click(btnForThirdCard);
    userEvent.selectOptions(screen.getByLabelText(/favourite/i), "favourite");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");
    expect(screen.getAllByRole("article")).toStrictEqual([cards[2]]);
  });
});
