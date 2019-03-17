import React, { Component } from "react";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import Order from "./Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Orders.css";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchingOrders(this.props.token, this.props.userId)
  }

  render() {
    let orders = [];
    if (this.props.loading) {
      orders = <Spinner />;
    } else {
      orders = this.props.orders.length ? (
        this.props.orders.map(o => {
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
              token={this.props.token}
              cancelOrder={this.props.onCancelingOrder}
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

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchingOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    onCancelingOrder: (token, orderId) => dispatch(actions.cancelOrder(token, orderId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));
