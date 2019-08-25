import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';
import Order from './Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css';

class Orders extends Component {
  componentDidMount() {
    const { onFetchingOrders, token, userId } = this.props;
    onFetchingOrders(token, userId);
  }

  render() {
    const { loading, orders: fetchedOrders, token, onCancelingOrder } = this.props;
    let orders = [];
    if (loading) {
      orders = <Spinner />;
    } else {
      orders = fetchedOrders.length ? (
        fetchedOrders.map(o => {
          return (
            <Order
              key={o.id}
              ingredients={o.ingredients}
              salad={o.ingredients.salad}
              bacon={o.ingredients.bacon}
              cheese={o.ingredients.cheese}
              meat={o.ingredients.meat}
              price={o.price}
              id={o.id}
              token={token}
              cancelOrder={onCancelingOrder}
            />
          );
        })
      ) : (
        <p>No orders at the moment...</p>
      );
    }
    return <div className={classes.GroupedOrders}>{orders}</div>;
  }
}

Orders.propTypes = {
  onCancelingOrder: PropTypes.func.isRequired,
  onFetchingOrders: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  orders: PropTypes.arrayOf({}).isRequired,
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchingOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    onCancelingOrder: (token, orderId) => dispatch(actions.cancelOrder(token, orderId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
