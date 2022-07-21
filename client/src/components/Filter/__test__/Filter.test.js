import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filter from "../Filter";

describe("Filter component", () => {
  const setup = () => {
    return render(<Filter filters={{}} setFilters={() => {}} />);
  };
  test("should be able to change value of favourite select", () => {
    setup();
    const select = screen.getByLabelText("Favourite");
    expect(select.value).toBe("any");
    userEvent.selectOptions(select, "favourite");
    expect(select.value).toBe("favourite");
    userEvent.selectOptions(select, "not favourite");
    expect(select.value).toBe("not favourite");
  });
  test("should be able to change value of gender select", () => {
    setup();
    const select = screen.getByLabelText("Gender");
    expect(select.value).toBe("any");
    userEvent.selectOptions(select, "male");
    expect(select.value).toBe("male");
    userEvent.selectOptions(select, "female");
    expect(select.value).toBe("female");
  });
});
