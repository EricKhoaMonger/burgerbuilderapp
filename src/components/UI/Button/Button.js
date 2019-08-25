import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.css';

const button = ({ type, style, clicked, disabled, label }) => (
  <button
    className={[classes.Button, classes[type]].join(' ')}
    style={style}
    onClick={clicked}
    disabled={disabled}
    type="submit"
  >
    {label}
  </button>
);

button.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.shape.isRequired,
  clicked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default button;
