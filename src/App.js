import React, { Component } from "react";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
import { AnimatedSwitch } from 'react-router-transition'

import classes from './App.css'
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState();
  }

  mapStyles(styles) {
    return {
      opacity: styles.opacity
    }
  }

  render() {
    const fadeSwitchRoute = {
      atEnter: {
        opacity: 0
      },
      atActive: {
        opacity: 1
      },
      atLeave: {
        opacity: 0
      }
    };
    let routes = (
      <AnimatedSwitch
        atEnter={fadeSwitchRoute.atEnter}
        atActive={fadeSwitchRoute.atActive}
        atLeave={fadeSwitchRoute.atLeave}
        mapStyles={this.mapStyles}
        className={classes.SwitchWrapper}
      >
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </AnimatedSwitch>
    );

    if (this.props.isAuthenicated) {
      routes = (
        <AnimatedSwitch
          atEnter={fadeSwitchRoute.atEnter}
          atActive={fadeSwitchRoute.atActive}
          atLeave={fadeSwitchRoute.atLeave}
          mapStyles={this.mapStyles}
          className={classes.SwitchWrapper}
        >
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </AnimatedSwitch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenicated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
