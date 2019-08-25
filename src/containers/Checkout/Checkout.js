import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from '../../components/Order/ContactForm/ContactForm';

class Checkout extends Component {
  continueHandler = () => {
    const { history, match } = this.props;
    history.push(`${match.path}/contact`);
  };

  cancelHandler = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ings, purchased, match } = this.props;
    let summary = <Redirect to="/" />;
    if (ings) {
      const purchaseRedirect = purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingredients={ings}
            canceled={this.cancelHandler}
            continue={this.continueHandler}
          />
          <Route path={`${match.path}/contact`} component={ContactForm} />
        </div>
      );
    }
    return summary;
  }
}

Checkout.propTypes = {
  history: PropTypes.shape.isRequired,
  purchased: PropTypes.bool.isRequired,
  match: PropTypes.shape.isRequired,
  ings: PropTypes.shape.isRequired,
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
