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
      <div className="table">
        <thead className="table-header">
          <tr>
            <th className="table-text">Descrição</th>
            <th className="table-text">Tag</th>
            <th className="table-text">Método de pagamento</th>
            <th className="table-text">Valor</th>
            <th className="table-text">Moeda</th>
            <th className="table-text">Câmbio utilizado</th>
            <th className="table-text">Valor convertido</th>
            <th className="table-text">Moeda de conversão</th>
            <th className="table-text">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.lenght === 0 ? (
            <p>Vazio</p>
          ) : (
            expenses.map((curr) => (
              <tr key={ curr.id }>
                <td className="table-body">{curr.description}</td>
                <td className="table-body">{curr.tag}</td>
                <td className="table-body">{curr.method}</td>
                <td className="table-body">{Number(curr.value).toFixed(2)}</td>
                <td className="table-body">{curr.currency}</td>
                <td className="table-body">
                  {Number(curr.exchangeRates[curr.currency].ask).toFixed(2)}
                </td>
                <td className="table-body">
                  {Number(
                    curr.exchangeRates[curr.currency].ask * curr.value,
                  ).toFixed(2)}
                </td>
                <td className="table-body">{curr.exchangeRates[curr.currency].name}</td>
                <td className="table-body">
                  <button
                    type="button"
                    className="table-button"
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
