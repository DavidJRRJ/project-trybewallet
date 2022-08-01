import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAction } from '../redux/actions';

class Table extends Component {
  btnDelete = (id) => {
    const { deleteData } = this.props;
    deleteData(id);
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <thead>
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
        </thead>
        <tbody>
          {expenses.lenght === 0 ? (
            <p>Vazio</p>
          ) : (
            expenses.map((curr) => (
              <tr key={ curr.id }>
                <td>{curr.description}</td>
                <td>{curr.tag}</td>
                <td>{curr.method}</td>
                <td>{Number(curr.value).toFixed(2)}</td>
                <td>{curr.currency}</td>
                <td>
                  {Number(curr.exchangeRates[curr.currency].ask).toFixed(2)}
                </td>
                <td>
                  {Number(
                    curr.exchangeRates[curr.currency].ask * curr.value,
                  ).toFixed(2)}
                </td>
                <td>{curr.exchangeRates[curr.currency].name}</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.btnDelete(curr.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  deleteData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteData: (id) => dispatch(deleteAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
