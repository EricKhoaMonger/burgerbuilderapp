import React from 'react';
import PropTypes from 'prop-types';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = ({ ingredients, canceled, continue: continueFn }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>The burger you&apos;re ordering</h1>
      <Burger ingredients={ingredients} marginTop="0px" />
      <Button label="Cancel" type="Danger" clicked={canceled} />
      <Button label="Continue" type="Success" clicked={continueFn} />
    </div>
  );
};

checkoutSummary.propTypes = {
  ingredients: PropTypes.shape.isRequired,
  canceled: PropTypes.func.isRequired,
  continue: PropTypes.func.isRequired,
};

export default checkoutSummary;
