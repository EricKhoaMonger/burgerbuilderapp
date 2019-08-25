import React from 'react';
import PropTypes from 'prop-types';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const transformIngredients = ings => {
  return Object.keys(ings)
    .map(igKey => {
      return [...Array(ings[igKey])].map(() => {
        const randKey = igKey + new Date().getMilliseconds() + Math.random() * 100;
        return <BurgerIngredient key={randKey} type={igKey} />;
      });
    })
    .reduce((arr, cur) => arr.concat(cur), []);
};

const burger = ({ ingredients, marginTop, maxWidth, height }) => {
  let transformedIngredients = transformIngredients(ingredients);

  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }
  const style = {
    marginTop,
    maxWidth,
    height,
  };
  return (
    <div className={classes.Burger} style={style}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  ingredients: PropTypes.shape.isRequired,
  marginTop: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default burger;
