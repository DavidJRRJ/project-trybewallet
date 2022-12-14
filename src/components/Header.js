import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header className="header">
        <div className="header-email">
          <p data-testid="email-field">{email}</p>
        </div>
        <div className="header-total">
          <span>
            <p data-testid="total-field">
              {expenses.reduce((acc, curr) => (
                acc + (curr.value * curr.exchangeRates[curr.currency].ask)
              ), 0).toFixed(2)}

            </p>
          </span>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
