import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.css';

const buildControl = props => {
  const { label, added, removed, disabled } = props;

  return (
    <div className={classes.BuildControl}>
      <div className={classes.BuildControl__Label}>{label}</div>
      <div className={classes.ButtonGroup}>
        <button
          className={[classes.BuildControl__Button, classes.BuildControl__ButtonLess].join(' ')}
          onClick={removed}
          disabled={disabled}
          type="button"
        >
          {'Less'}
        </button>
        <button
          className={[classes.BuildControl__Button, classes.BuildControl__ButtonMore].join(' ')}
          onClick={added}
          type="button"
        >
          More
        </button>
      </div>
    </div>
  );
};

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.bool.isRequired,
  removed: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default buildControl;
