import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions/auth';
import { checkValidity, updateObj } from '../../sharedFn/utilities';

import classes from './Auth.css';
import FormInput from '../../components/FormInput/Forminput';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Logo from '../../components/UI/Logo/Logo';

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      controls: {
        email: {
          name: 'email',
          value: '',
          placeholder: 'Enter Your Email',
          type: 'text',
          inputType: 'input',
          valid: false,
          validation: {
            required: true,
            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          },
          touched: false,
        },
        password: {
          name: 'password',
          value: '',
          placeholder: 'Password',
          type: 'password',
          inputType: 'input',
          valid: false,
          validation: {
            required: true,
            length: {
              minLength: 6,
              maxLength: 50,
            },
          },
          touched: false,
        },
      },
      isSignUp: false,
    };
  }

  componentDidMount() {
    const { building, authRedirectPath, onSetAuthRedirectPath } = this.props;
    if (!building && !authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }

  componentWillUnmount() {
    const { onClearError } = this.props;
    onClearError();
  }

  inputChangedHandler = (e, controlName) => {
    const { controls } = this.state;
    const updatedControl = updateObj(controls[controlName], {
      value: e.target.value,
      valid: checkValidity(e.target.value, controls[controlName].validation),
      touched: true,
    });

    const updatedControls = updateObj(controls, {
      [controlName]: updatedControl,
    });

    this.setState({ controls: updatedControls });
  };

  onSubmitHanlder = e => {
    e.preventDefault();
    const { onAuth } = this.props;
    const { controls, isSignUp } = this.state;

    onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  onSwithAuthHanlder = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  render() {
    const { controls, isSignUp } = this.state;
    const { error, loading, isAuthenticated, authRedirectPath } = this.props;
    const formArr = Object.keys(controls).map(key => controls[key]);

    let form = null;
    form = formArr.map(i => {
      return (
        <FormInput
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...i}
          key={i.name}
          changed={e => this.inputChangedHandler(e, i.name)}
          touched={i.touched}
          invalid={!i.valid}
        />
      );
    });

    if (loading) {
      form = <Spinner />;
    }

    let errorMsg = null;
    const classNameArr = [classes.AuthForm];

    if (error) {
      switch (error.message) {
        case 'INVALID_EMAIL':
          errorMsg = <p className="error-msg">Email is invalid</p>;
          break;

        case 'INVALID_PASSWORD':
          errorMsg = <p className="error-msg">Password is not correct</p>;
          break;

        case 'EMAIL_NOT_FOUND':
          errorMsg = <p className="error-msg">Email is not register</p>;
          break;

        case 'EMAIL_EXISTS':
          errorMsg = <p className="error-msg">Email exists. Please choose another email</p>;
          break;

        case 'SIGN_IN_NEEDED':
          errorMsg = <p className="error-msg">Please sign in to purchase burgers</p>;
          classNameArr.push(classes.AuthRedirect);
          break;

        default:
          break;
      }
    }

    const btnStyle = {
      display: 'flex',
      marginLeft: 'auto',
      height: '1.6rem',
    };

    const btnLabel = isSignUp ? 'Swith to Sign In' : 'Swith to Sign Up';

    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath} />;
    }

    return (
      <div className={classNameArr.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        {authRedirect}
        {errorMsg}
        <form onSubmit={e => this.onSubmitHanlder(e)}>
          {form}
          <Button label="Submit" type="Success" style={btnStyle} />
        </form>

        <Button label={btnLabel} type="Danger" style={btnStyle} clicked={this.onSwithAuthHanlder} />
      </div>
    );
  }
}

Auth.propTypes = {
  building: PropTypes.bool.isRequired,
  authRedirectPath: PropTypes.string.isRequired,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
  onClearError: PropTypes.func.isRequired,
  onAuth: PropTypes.func.isRequired,
  error: PropTypes.shape.isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    onClearError: () => dispatch(actions.clearError()),
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
