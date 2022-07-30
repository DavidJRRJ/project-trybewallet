import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouterAndRedux } from "./renderWith";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import user from "../../redux/reducers/user";

describe("Testes para a página de Login", () => {
  test("Verifica os elementos da página de Login", () => {
    renderWithRouterAndRedux(<App />);
    screen.getByRole("button", { name: /entrar/i });
    screen.getByTestId("password-input");
    screen.getByTestId("email-input");
  });
  test("Verifica se o botão fica desativado como estado inicial", () => {
    renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole("button", { name: /entrar/i });
    expect(btnEntrar).toBeDisabled();
  });
  test("Verifica se ao clickar em entar é redirecionado para /carteira", () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnEntrar = screen.getByRole("button", { name: /entrar/i });
    const emailInput = screen.getByTestId("email-input");
    const passInput = screen.getByTestId("password-input");
    userEvent.type(emailInput, "david@bol.com.br");
    userEvent.type(passInput, "12345678");
    userEvent.click(btnEntrar);
    expect(history.location.pathname).toBe("/carteira");
  });
});
