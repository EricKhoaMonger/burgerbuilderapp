import React, { Component } from "react";
import * as actions from "../../store/actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { checkValidity, updateObj } from "../../sharedFn/utilities";

import classes from "./Auth.css";
import FormInput from "../../components/FormInput/Forminput";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Logo from "../../components/UI/Logo/Logo";

export class Auth extends Component {
  state = {
    controls: {
      email: {
        name: "email",
        value: "",
        placeholder: "Enter Your Email",
        type: "text",
        inputType: "input",
        valid: false,
        validation: {
          required: true,
          pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        },
        touched: false
      },
      password: {
        name: "password",
        value: "",
        placeholder: "Password",
        type: "password",
        inputType: "input",
        valid: false,
        validation: {
          required: true,
          length: {
            minLength: 6,
            maxLength: 50
          }
        },
        touched: false
      }
    },
    isSignUp: false
  };

  inputChangedHandler = (e, controlName) => {
    const updatedControl = updateObj(this.state.controls[controlName], {
      value: e.target.value,
      valid: checkValidity(
        e.target.value,
        this.state.controls[controlName].validation
      ),
      touched: true
    });

    const updatedControls = updateObj(this.state.controls, {
      [controlName]: updatedControl
    });

    this.setState({ controls: updatedControls });
  };

  onSubmitHanlder = e => {
    e.preventDefault();

    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  onSwithAuthHanlder = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      };
    });
  };

  componentDidMount() {
    if (!this.props.building && !this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  componentWillUnmount() {
    this.props.onClearError();
  }

  render() {
    let formArr = [];
    for (const key in this.state.controls) {
      const formEl = this.state.controls[key];
      formArr.push(formEl);
    }

    let form = null;
    form = formArr.map(i => {
      return (
        <FormInput
          {...i}
          key={i.name}
          changed={e => this.inputChangedHandler(e, i.name)}
          touched={i.touched}
          invalid={!i.valid}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMsg = null;
    let classNameArr = [classes.AuthForm];

    if (this.props.error) {
      switch (this.props.error.message) {
        case "INVALID_EMAIL":
          errorMsg = <p className="error-msg">Email is invalid</p>
          break;

        case "INVALID_PASSWORD":
          errorMsg = <p className="error-msg">Password is not correct</p>
          break;

        case "EMAIL_NOT_FOUND":
          errorMsg = <p className="error-msg">Email is not register</p>
          break;

        case "EMAIL_EXISTS":
          errorMsg = <p className="error-msg">Email exists. Please choose another email</p>
          break;

        case "SIGN_IN_NEEDED":
          errorMsg = <p className="error-msg">Please sign in to purchase burgers</p>
          classNameArr.push(classes.AuthRedirect)
          break;

        default:
          break;
      }
    }

    const btnStyle = {
      display: "flex",
      marginLeft: "auto",
      height: "1.6rem"
    };

    const btnLabel = this.state.isSignUp
      ? "Swith to Sign In"
      : "Swith to Sign Up";

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
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

        <Button
          label={btnLabel}
          type="Danger"
          style={btnStyle}
          clicked={this.onSwithAuthHanlder}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    onClearError: () => dispatch(actions.clearError())
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
