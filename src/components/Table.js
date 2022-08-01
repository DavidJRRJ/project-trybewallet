import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>

        {expenses.lenght === 0 ? <p>Vazio</p>
          : expenses.map((curr) => (
            <tr key={ curr.id }>
              <td>{curr.description}</td>
              <td>{curr.tag}</td>
              <td>{curr.method}</td>
              <td>{Number(curr.value)}</td>
              <td>{curr.currency}</td>
              <td>{Number(curr.exchangeRates[curr.currency].ask).toFixed(2)}</td>
              {Number(curr.exchangeRates[curr.currency].ask * curr.value).toFixed(2)}
              <td>{ curr.exchangeRates[curr.currency].name }</td>
              <td><button type="button">Delete</button></td>
            </tr>
          ))}

      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
