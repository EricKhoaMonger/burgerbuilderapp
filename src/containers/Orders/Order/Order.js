import React from "react";

import Burger from "../../../components/Burger/Burger";
import classes from "./Order.css";
import Button from '../../../components/UI/Button/Button'

const order = props => {
  const btnStyle = {
    display: 'block',
    height: '1.4rem',
    padding: 0
  }
  return (
    <div className={classes.OrderItem}>
      <div classes={classes.Burger}>
        <Burger ingredients={props.ingredients} marginTop='0px' maxWidth='50%' height='100px'/>
      </div>
      <hr />
      <div className={classes.Ingredients}>
        <p>
          <b>Salad:</b> {props.salad}
        </p>
        <p>
          <b>Cheese:</b> {props.cheese}
        </p>
        <p>
          <b>Bacon:</b> {props.bacon}
        </p>
        <p>
          <b>Meat:</b> {props.meat}
        </p>
        <p>
          <b>Price:</b> ${props.price.toFixed(2)}
        </p>
        <p>
          <Button type="Danger" label="Cancel Order" style={btnStyle} clicked={() => props.cancelOrder(props.token, props.id)}/>
        </p>
      </div>
    </div>
  );
};

export default order;
