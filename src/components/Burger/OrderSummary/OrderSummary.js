import React from "react";

import classes from "./OrderSummary.css";
import Button from "../../UI/Button/Button";

const mapIngsToLis = ings => {
  return Object.keys(ings).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {ings[igKey]}
      </li>
    );
  })
}

const orderSummary = props => {
  const ingredientSummary = mapIngsToLis(props.ingredients);

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>Ingredients Added: </p>
      <ul>{ingredientSummary}</ul>
      <p>
        <b>Total Cost: </b>
        {props.totalPrice ? props.totalPrice.toFixed(2) : null }
      </p>
      <div className={classes.BtnGroup}>
        <Button label="Cancel" type="Danger" clicked={props.cancel} />
        <Button label="Checkout" type="Success" clicked={props.checkout} />
      </div>
    </React.Fragment>
  );
};

export default orderSummary;
