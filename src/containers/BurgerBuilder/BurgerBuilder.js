import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
  constructor() {
    super();
    this.state = {
      purchasing: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { onInitIngredients } = this.props;
    onInitIngredients();
  }

  purchaseHandler = () => {
    const { isAuthenticated, onSetAuthRedirectPath, onSetError, history } = this.props;
    if (isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      onSetAuthRedirectPath('/checkout');
      onSetError({ message: 'SIGN_IN_NEEDED' });
      history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  checkoutHandler = () => {
    const { onPurchaseInit, history } = this.props;
    onPurchaseInit();
    history.push('/checkout');
  };

  mapIngredients = () => {
    const { ings } = this.props;
    const disabledInfo = {
      ...ings,
    };
    Object.keys(disabledInfo).forEach(key => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });

    return {
      disabledInfo,
      shouldDisableOrderBtn: disabledInfo.cheese === true && disabledInfo.meat === true,
    };
  };

  render() {
    let orderSummary = null;
    const { error, ings, price, onIngredientsAdded, onIngredientsRemoved } = this.props;
    const { loading, purchasing } = this.state;

    let burger =
      error && !loading ? (
        <p style={{ marginTop: '200px', textAlign: 'center' }}>
          <b>Internal Server Error</b>
          <br />
          Please try going back another time....
        </p>
      ) : (
        <Spinner />
      );

    if (ings && !error) {
      burger = (
        <>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={onIngredientsAdded}
            ingredientRemoved={onIngredientsRemoved}
            totalPrice={price}
            disabled={this.mapIngredients().disabledInfo}
            showOrderBtn={this.mapIngredients().shouldDisableOrderBtn}
            ordered={this.purchaseHandler}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ings}
          totalPrice={price}
          checkout={this.checkoutHandler}
          cancel={this.purchaseCancelHandler}
        />
      );
    }
    if (loading) {
      orderSummary = <Spinner />;
    }
    return (
      <>
        {burger}
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onIngredientsAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientsRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
    onSetError: errorObj => dispatch(actions.setError(errorObj)),
  };
};

BurgerBuilder.propTypes = {
  onInitIngredients: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
  onSetError: PropTypes.func.isRequired,
  onPurchaseInit: PropTypes.func.isRequired,
  onIngredientsRemoved: PropTypes.func.isRequired,
  onIngredientsAdded: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
  error: PropTypes.shape.isRequired,
  ings: PropTypes.shape.isRequired,
  price: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
