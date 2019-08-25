import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.css';

const backdrop = ({ show, clicked }) =>
  show ? (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <div
      className={classes.Backdrop}
      onClick={clicked}
      role="button"
      tabIndex={0}
      onKeyPress={() => {}}
    />
  ) : null;

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default backdrop;
