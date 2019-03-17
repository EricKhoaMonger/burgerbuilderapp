import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const transformIngredients = ings => {
  return Object.keys(ings)
            .map(igKey => {
              return [...Array(ings[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
              });
            })
            .reduce((arr, cur) => arr.concat(cur), []);
}

const burger = props => {
  let transformedIngredients = transformIngredients(props.ingredients)

  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }
  let style = {
    marginTop: props.marginTop,
    maxWidth: props.maxWidth,
    height: props.height
  };
  return (
    <div className={classes.Burger} style={style}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
