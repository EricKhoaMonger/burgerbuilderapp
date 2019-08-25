import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      showSideDrawer: false,
    };
  }

  showSideDrawerHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  hideSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    const { isAuthenicated, children } = this.props;
    const { showSideDrawer } = this.state;
    return (
      <>
        <Toolbar clicked={this.showSideDrawerHandler} isAuth={isAuthenicated} />
        <SideDrawer
          open={showSideDrawer}
          clicked={this.hideSideDrawerHandler}
          isAuth={isAuthenicated}
        />
        <main>{children}</main>
      </>
    );
  }
}

Layout.propTypes = {
  isAuthenicated: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = state => {
  return {
    isAuthenicated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
