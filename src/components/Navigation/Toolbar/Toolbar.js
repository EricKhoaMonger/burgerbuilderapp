import React from 'react';
import PropTypes from 'prop-types';

import classes from './Toolbar.css';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';

const toolbar = ({ clicked, isAuth }) => {
  return (
    <header className={classes.Toolbar}>
      <div
        className={classes.Menu}
        onClick={clicked}
        role="button"
        tabIndex={0}
        onKeyPress={() => {}}
      >
        <div />
      </div>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <div className={classes.NavItems}>
        <NavItems isAuthenicated={isAuth} />
      </div>
    </header>
  );
};

toolbar.propTypes = {
  clicked: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default toolbar;
