import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionWalletData, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: -1,
      value: '',
      description: '',
      tag: 'Alimentação',
      currency: 'USD',
      method: 'Dinheiro',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    // console.log({ [name]: value });
  };

  handleclick = async () => {
    // e.preventDefault();
    const { walletData } = this.props;
    const { id } = this.state;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    // console.log(exchangeRates);
    this.setState({
      id: id + 1,
      exchangeRates,
    });

    walletData(this.state);
    // getExchanges();
    this.setState({
      value: '',
      description: '',
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    // console.log(currencies);
    return (
      <form className="wallet-form">
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            type="number"
            placeholder="0"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
            {currencies.map((element) => (
              <option key={ element } value={ element }>
                {element}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleclick }>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  // getExchanges: () => dispatch(fetchExchanges()),
  walletData: (data) => dispatch(actionWalletData(data)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCurrencies: PropTypes.func.isRequired,
  // getExchanges: PropTypes.func.isRequired,
  walletData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
