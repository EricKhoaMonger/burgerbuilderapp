import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { AnimatedSwitch } from 'react-router-transition';
import PropTypes from 'prop-types';

import * as actions from './store/actions/index';
import classes from './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    const { onCheckAuthState } = this.props;
    onCheckAuthState();
  }

  mapStyles = styles => {
    return {
      opacity: styles.opacity,
    };
  };

  render() {
    const { isAuthenicated } = this.props;
    const fadeSwitchRoute = {
      atEnter: {
        opacity: 0,
      },
      atActive: {
        opacity: 1,
      },
      atLeave: {
        opacity: 0,
      },
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

    if (isAuthenicated) {
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

App.propTypes = {
  isAuthenicated: PropTypes.bool.isRequired,
  onCheckAuthState: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuthenicated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
