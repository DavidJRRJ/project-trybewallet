import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouterAndRedux } from "./renderWith";
import App from "../../App";
import userEvent from "@testing-library/user-event";
import user from "../../redux/reducers/user";
import Wallet from "../../pages/Wallet";

describe("Teste dos componentes da page wallet", () => {
  test("Testa se o email é renderizado no componente Header", () => {
    renderWithRouterAndRedux(<Wallet />, {
      initialPath: "/carteira",
      initialState: { user: { email: "david@bol.com.br" } },
    });
    screen.getByText(/david@bol\.com\.br/i);
  });
  test("Testa os componentes do WalletForm", () => {
    renderWithRouterAndRedux(<Wallet />, { initialPath: "/carteira" });
    screen.getByTestId('value-input');
    screen.getByTestId('description-input');
    screen.getByTestId('currency-input');
    screen.getByTestId('method-input');
    screen.getByTestId('tag-input');
    screen.getByRole('button', {  name: /adicionar despesa/i});
  });
});
