import { USER_EMAIL, WALLET_CURRENCIES } from './actionTypes';

export const actionEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const actionCurrencies = (currencies) => ({
  type: WALLET_CURRENCIES,
  currencies,
});

export const requestAction = () => ({
  type: 'REQUEST_INFO',
});

export const errorAction = (error) => ({
  type: 'ERROR_INFO',
  error,
});

export function fetchCurrencies() {
  return (dispatch) => {
    // thunk declarado
    dispatch(requestAction());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(
        actionCurrencies(
          Object.keys(currencies).filter((current) => current !== 'USDT'),
        ),
      ))
      .catch((error) => dispatch(errorAction(error)));
  };
}
