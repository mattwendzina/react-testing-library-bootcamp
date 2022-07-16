import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const setup = () => render(<App />);

const getEventValue = (eventType) => {
  switch (eventType) {
    case "email":
      return screen.getByRole("textbox").value;
    case "password":
      return screen.getByLabelText("Password").value;
    case "confirmPassword":
      return screen.getByLabelText(/confirm password/i).value;
    default:
      return;
  }
};

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  email && userEvent.type(emailInputElement, email);
  password && userEvent.type(passwordInputElement, password);
  confirmPassword &&
    userEvent.type(confirmPasswordInputElement, confirmPassword);

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const submitEvent = () => {
  const submitButton = screen.getByRole("button", {
    name: /submit/i,
  });
  userEvent.click(submitButton);
};

const errorEvent = (eventType) => {
  switch (eventType) {
    case "email":
      return screen.queryByText(
        /Your email address is invalid, please correct./i
      );
    case "password":
      return screen.queryByText(
        /Your password is too short, it must be at least 5 characters./i
      );
    case "confirmPassword":
      return screen.queryByText(
        /Your password does not match, please correct./i
      );
    default:
      return;
  }
};

describe("App component", () => {
  describe("Handling inputs", () => {
    test("inputs should be initially empty", () => {
      setup();

      expect(getEventValue("email")).toBe("");
      expect(getEventValue("password")).toBe("");
      expect(getEventValue("confirmPassword")).toBe("");
    });

    test("inputs can handle text input", async () => {
      setup();
      const { emailInputElement } = typeIntoForm({ email: "test@test.com" });
      expect(emailInputElement.value).toBe("test@test.com");
    });
    test("password can handle text input", async () => {
      setup();
      const { passwordInputElement } = typeIntoForm({ password: "bravissimo" });
      expect(passwordInputElement.value).toBe("bravissimo");
    });
    test("confirm password can handle text input", async () => {
      setup();
      const { confirmPasswordInputElement } = typeIntoForm({
        confirmPassword: "bravissimo",
      });
      expect(confirmPasswordInputElement.value).toBe("bravissimo");
    });
  });

  describe("Error handling", () => {
    test("should show email error message on invalid email", () => {
      setup();

      expect(errorEvent("email")).not.toBeInTheDocument();

      typeIntoForm({ email: "testtest.com" });
      submitEvent();

      expect(errorEvent("email")).toBeInTheDocument();
    });

    test("show a password error message if password is too short and email is valid", async () => {
      setup();

      expect(errorEvent("password")).not.toBeInTheDocument();
      typeIntoForm({ email: "test@test.com", password: "test" });
      submitEvent();

      expect(errorEvent("password")).toBeInTheDocument();
    });

    test("show a confirm password error message if the passwords don't match", async () => {
      setup();

      expect(errorEvent("confirmPassword")).not.toBeInTheDocument();

      typeIntoForm({
        email: "test@test.com",
        password: "password",
        confirmPassword: "differentPassword",
      });
      submitEvent();

      expect(errorEvent("confirmPassword")).toBeInTheDocument();
    });

    test("should not show any error messages when inputs are correct", async () => {
      setup();

      typeIntoForm({
        email: "test@test.com",
        password: "password",
        confirmPassword: "password",
      });
      submitEvent();

      expect(errorEvent("email")).not.toBeInTheDocument();
      expect(errorEvent("password")).not.toBeInTheDocument();
      expect(errorEvent("confirmPassword")).not.toBeInTheDocument();
    });
  });
});
