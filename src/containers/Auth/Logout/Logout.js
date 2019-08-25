import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as actions from '../../../store/actions/index';

class Logout extends Component {
  componentDidMount() {
    const { onLogout } = this.props;
    onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

Logout.propTypes = { onLogout: PropTypes.func.isRequired };

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
