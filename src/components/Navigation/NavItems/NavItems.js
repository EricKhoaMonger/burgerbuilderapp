import React from "react";

import classes from "./NavItems.css";
import NavItem from "./NavItem/NavItem";

const navItems = props => (
  <ul className={classes.NavItems}>
    <NavItem link="/" exact>Burger Builder</NavItem>
    {props.isAuthenicated ? (
      <React.Fragment>
        <NavItem link="/orders">Orders</NavItem>
        <NavItem link="/logout">Logout</NavItem>
      </React.Fragment>
    ) : (
      <NavItem link="/auth">Authenication</NavItem>
    )}
  </ul>
);

export default navItems;
