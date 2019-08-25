import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {
  render() {
    const { type } = this.props;
    let i = null;

    switch (type) {
      case 'bread-bottom':
        i = <div className={classes.BreadBottom} />;
        break;

      case 'bread-top':
        i = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
        break;

      case 'meat':
        i = <div className={classes.Meat} />;
        break;

      case 'salad':
        i = <div className={classes.Salad} />;
        break;

      case 'bacon':
        i = <div className={classes.Bacon} />;
        break;

      case 'cheese':
        i = <div className={classes.Cheese} />;
        break;

      default:
        i = null;
    }

    return i;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
