import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      // buttonOff: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    // console.log(this.state);
    this.verifyPassword();
    this.verifyEmail();
  };

  handleClick = () => {
    const { history, globalMail } = this.props;
    const { email } = this.state;
    globalMail(email);
    history.push('/carteira');
  };

  verifyPassword = () => {
    const { password } = this.state;
    const passwordLength = 6;
    // console.log(password);
    if (password.length >= passwordLength) {
      // this.setState({
      //   buttonOff: false,
      // });
      return true;
    }
    return false;
  };

  verifyEmail = () => {
    const { email } = this.state;
    const emailRegex = /[a-zA-Z0-9]+[.]?([a-zA-Z0-9]+)?[@][a-z]{3,9}[.][a-z]{2,5}/g;
    const emailCheck = emailRegex.test(email);
    if (emailCheck === true) {
      // this.setState({
      //   buttonOff: false,
      // });
      return true;
    }
    return false;
  };

  render() {
    // const { buttonOff } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            required
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            required
          />
        </label>
        <button
          type="submit"
          onClick={ this.handleClick }
          disabled={ !(this.verifyEmail() && this.verifyPassword()) }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  globalMail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  globalMail: (email) => dispatch(actionEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
