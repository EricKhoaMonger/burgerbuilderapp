import React from 'react';
import PropTypes from 'prop-types';

import classes from './SideDrawer.css';
import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = ({ open, clicked, isAuth }) => {
  const classAdded = open ? classes.Open : classes.Close;

  return (
    <>
      <BackDrop show={open} clicked={clicked} />
      <div
        className={[classes.SideDrawer, classAdded].join(' ')}
        onClick={clicked}
        role="button"
        tabIndex={0}
        onKeyPress={() => {}}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav className={classes.Nav}>
          <NavItems isAuthenicated={isAuth} />
        </nav>
      </div>
    </>
  );
};

sideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default sideDrawer;
