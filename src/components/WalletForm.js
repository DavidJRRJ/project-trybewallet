import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input data-testid="value-input" name="value" type="number" />
        </label>
        <label htmlFor="description">
          Descrição:
          <input data-testid="description-input" name="description" type="text" />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select data-testid="currency-input">
            {currencies.map((element) => (
              <option key={ element } value={ element }>{element}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria:
          <select data-testid="tag-input">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
