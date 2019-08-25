import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './NavItem.css';

const navItem = ({ link, exact, children }) => (
  <li className={classes.NavItem}>
    <NavLink to={link} activeClassName={classes.active} exact={exact}>
      {children}
    </NavLink>
  </li>
);

navItem.propTypes = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
};

export default navItem;
