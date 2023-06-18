import { fireEvent } from "@testing-library/react";
import Login from "./Login";

import render from "../../reduxConfigTests";

const login = {
  email: "bruna@teste.com",
  password: "senhadeteste",
};

const mockHandleLoginFn = jest.fn();
const mockDispatchFn = jest.fn();

beforeAll(() => {
  jest.mock("../slices/user", () => ({
    handleLogin: mockHandleLoginFn,
  }));
});

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatchFn,
}));

test("should reflect email and password values changing when triggering events on input", () => {
  const { getByLabelText } = render(<Login />);

  const emailInput = getByLabelText("E-mail");
  const passwordInput = getByLabelText("Senha");

  fireEvent.change(emailInput, { target: { value: login.email } });
  fireEvent.change(passwordInput, { target: { value: login.password } });

  expect(emailInput.value).toBe(login.email);
  expect(passwordInput.value).toBe(login.password);
});

test("should submit the form values and navigate when is successfull", async () => {
  const { getByText, getByLabelText } = render(<Login />);

  const emailInput = getByLabelText("E-mail");
  const passwordInput = getByLabelText("Senha");
  const submitButton = getByText("Entrar");

  fireEvent.change(emailInput, { target: { value: login.email } });
  fireEvent.change(passwordInput, { target: { value: login.password } });

  fireEvent.click(submitButton);

  await expect(mockDispatchFn).toHaveBeenCalledTimes(1);
});

test("should simulate an error in login", async () => {
  const error = new Error("Login falhoooou");

  const mockHandleLoginWithErrorFn = jest.fn(() => Promise.reject(error));

  jest.mock("../slices/user", () => ({
    handleLogin: mockHandleLoginWithErrorFn,
  }));

  const { getByText, getByLabelText } = render(<Login />);

  const emailInput = getByLabelText("E-mail");
  const passwordInput = getByLabelText("Senha");
  const submitButton = getByText("Entrar");

  fireEvent.change(emailInput, { target: { value: login.email } });
  fireEvent.change(passwordInput, { target: { value: login.password } });

  fireEvent.click(submitButton);

  await expect(mockDispatchFn).toHaveBeenCalledTimes(1);
});
