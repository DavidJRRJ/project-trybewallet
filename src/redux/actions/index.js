import {
  DELETE_DATA,
  USER_EMAIL,
  WALLET_CURRENCIES,
  // WALLET_EXCHANGE,
  WALLET_DATA,
} from './actionTypes';

export const actionEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const actionCurrencies = (currencies) => ({
  type: WALLET_CURRENCIES,
  currencies,
});

// export const actionExchanges = (exchangeRates) => ({
//   type: WALLET_EXCHANGE,
//   exchangeRates,
// });

export const actionWalletData = (data) => ({
  type: WALLET_DATA,
  data,
});

export const requestAction = () => ({
  type: 'REQUEST_INFO',
});

export const deleteAction = (id) => ({
  type: DELETE_DATA,
  id,
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

// export function fetchExchanges() {
//   return (dispatch) => {
//     dispatch(requestAction());
//     return fetch('https://economia.awesomeapi.com.br/json/all')
//       .then((response) => response.json())
//       .then((exchanges) => dispatch(actionExchanges(exchanges)))
//       .catch((error) => dispatch(errorAction(error)));
//   };
// }
