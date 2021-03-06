import { useState } from "react";
import "./App.css";
import validator from "validator";

function App() {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleInput = (e) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!validator.isEmail(signupInput.email)) {
      setError("Your email address is invalid, please correct.");
      return;
    }
    if (signupInput.password.length < 5) {
      setError("Your password is too short, it must be at least 5 characters.");
      return;
    }
    if (signupInput.password !== signupInput.confirmPassword) {
      setError("Your password does not match, please correct.");
      return;
    }
    setError(null);
  };

  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={signupInput.email}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={signupInput.password}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-control"
            value={signupInput.confirmPassword}
            onChange={(e) => handleInput(e)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
