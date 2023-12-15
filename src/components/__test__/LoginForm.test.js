import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import LoginForm from "../LoginForm";
import rootReducer from "../../stores/reducers/rootReducer";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

test("calls handleLogin and handleRegisterRedirect on button click", async () => {
  const store = createStore(rootReducer);

  const { getByRole, getByLabelText } = render(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );

  const emailInput = getByLabelText("Email:");
  fireEvent.change(emailInput, { target: { value: "eve.holt@reqres.in" } });

  const passwordInput = getByLabelText("Password:");
  fireEvent.change(passwordInput, { target: { value: "cityslicka" } });

  const loginButton = getByRole("button", { name: /login/i });
  fireEvent.click(loginButton);

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  const registerButton = getByRole("link", { name: /register/i });
  fireEvent.click(registerButton);
  expect(mockNavigate).toHaveBeenCalledWith("/register");
});
