import React from 'react';
import PropTypes from 'prop-types';

import classes from './OrderSummary.css';
import Button from '../../UI/Button/Button';

const mapIngsToLis = ings => {
  return Object.keys(ings).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ings[igKey]}
      </li>
    );
  });
};

const orderSummary = ({ ingredients, totalPrice, cancel, checkout }) => {
  const ingredientSummary = mapIngsToLis(ingredients);

  return (
    <>
      <h3>Your Order</h3>
      <p>Ingredients Added: </p>
      <ul>{ingredientSummary}</ul>
      <p>
        <b>Total Cost: </b>
        {totalPrice ? totalPrice.toFixed(2) : null}
      </p>
      <div className={classes.BtnGroup}>
        <Button label="Cancel" type="Danger" clicked={cancel} />
        <Button label="Checkout" type="Success" clicked={checkout} />
      </div>
    </>
  );
};
orderSummary.propTypes = {
  ingredients: PropTypes.shape.isRequired,
  totalPrice: PropTypes.number.isRequired,
  cancel: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
};

export default orderSummary;
