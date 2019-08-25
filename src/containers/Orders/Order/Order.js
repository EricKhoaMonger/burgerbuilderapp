import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../../components/Burger/Burger';
import classes from './Order.css';
import Button from '../../../components/UI/Button/Button';

const order = ({ ingredients, salad, cheese, bacon, meat, price, token, id, cancelOrder }) => {
  const btnStyle = {
    display: 'block',
    height: '1.4rem',
    padding: 0,
  };
  return (
    <div className={classes.OrderItem}>
      <div classes={classes.Burger}>
        <Burger ingredients={ingredients} marginTop="0px" maxWidth="50%" height="100px" />
      </div>
      <hr />
      <div className={classes.Ingredients}>
        <p>
          <b>Salad:</b> {salad}
        </p>
        <p>
          <b>Cheese:</b> {cheese}
        </p>
        <p>
          <b>Bacon:</b> {bacon}
        </p>
        <p>
          <b>Meat:</b> {meat}
        </p>
        <p>
          <b>Price:</b> ${price.toFixed(2)}
        </p>
        <p>
          <Button
            type="Danger"
            label="Cancel Order"
            style={btnStyle}
            clicked={() => cancelOrder(token, id)}
          />
        </p>
      </div>
    </div>
  );
};

order.propTypes = {
  ingredients: PropTypes.shape.isRequired,
  salad: PropTypes.string.isRequired,
  cheese: PropTypes.string.isRequired,
  bacon: PropTypes.string.isRequired,
  meat: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  cancelOrder: PropTypes.func.isRequired,
};

export default order;
