import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = ({
  showOrderBtn,
  totalPrice,
  ordered,
  disabled,
  ingredientAdded,
  ingredientRemoved,
}) => {
  const btnClassNameArr = [classes.OrderButton];
  const total = totalPrice ? totalPrice.toFixed(2) : null;
  if (!showOrderBtn) {
    btnClassNameArr.push(classes.Pulsate);
  }

  return (
    <div className={classes.BuildControls}>
      <div className={classes.OrderAndPrice}>
        <div className={classes.PriceBar}>{`Total Price: ${total}`}</div>
        <button
          className={btnClassNameArr.join(' ')}
          disabled={showOrderBtn}
          onClick={ordered}
          type="button"
        >
          Order Now
        </button>
      </div>
      {controls.map(c => (
        <BuildControl
          key={c.label}
          label={c.label}
          added={() => ingredientAdded(c.type)}
          removed={() => ingredientRemoved(c.type)}
          disabled={disabled[c.type]}
        />
      ))}
    </div>
  );
};

buildControls.propTypes = {
  showOrderBtn: PropTypes.bool.isRequired,
  totalPrice: PropTypes.number.isRequired,
  ordered: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
};

export default buildControls;
