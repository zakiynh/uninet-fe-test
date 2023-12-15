import React from "react";
import { render, fireEvent, waitFor, getByRole } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../RegisterForm";
import rootReducer from "../../stores/reducers/rootReducer";
import { register } from "../../stores/actions/authActions";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../stores/actions/authActions", () => ({
  register: jest.fn(),
}));

const store = createStore(rootReducer);

describe("RegisterForm", () => {
  beforeEach(() => {
    useNavigate.mockReturnValue(jest.fn());
    register.mockReturnValue(jest.fn());
  });

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it("allows the user to fill the form", async () => {
    const store = mockStore({}); // Pass the initial state here

    const { getByLabelText, findByRole } = render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );

    const emailInput = getByLabelText("Email:");
    fireEvent.change(emailInput, { target: { value: "eve.holt@reqres.in" } });

    const passwordInput = getByLabelText("Password:");
    fireEvent.change(passwordInput, { target: { value: "pistol" } });

    const registerButton = await findByRole("button", { name: /register/i });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(getByLabelText("Email:")).toHaveValue("eve.holt@reqres.in");
      expect(getByLabelText("Password:")).toHaveValue("pistol");
    });
  });
});
