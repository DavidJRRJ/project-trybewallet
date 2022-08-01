import {
  WALLET_CURRENCIES,
  WALLET_EXCHANGE,
  WALLET_DATA,
  DELETE_DATA,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case WALLET_EXCHANGE:
    return {
      ...state,
      exchangeRates: action.exchanges,
    };
  case WALLET_DATA:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.data }],
    };
  case DELETE_DATA:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.id),
    };
  default:
    return state;
  }
};

export default wallet;
