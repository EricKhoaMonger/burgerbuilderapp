import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = ({ isAuthenicated }) => (
  <ul className={classes.NavItems}>
    <NavItem link="/" exact>
      Burger Builder
    </NavItem>
    {isAuthenicated ? (
      <>
        <NavItem link="/orders">Orders</NavItem>
        <NavItem link="/logout">Logout</NavItem>
      </>
    ) : (
      <NavItem link="/auth">Authenication</NavItem>
    )}
  </ul>
);

navItems.propTypes = {
  isAuthenicated: PropTypes.bool.isRequired,
};

export default navItems;
