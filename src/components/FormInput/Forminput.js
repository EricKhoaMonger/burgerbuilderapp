import React from 'react';

import classes from './FormInput.css';

const formInput = props => {
  let inputElement = null;

  switch (props.inputType) {
    case 'input':
      inputElement = (
        <input
          className={props.invalid && props.touched ? classes.Invalid : ''}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={props.invalid && props.touched ? classes.Invalid : ''}
          onChange={props.changed}
          value={props.value}
          placeholder={props.placeholder}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={props.invalid && props.touched ? classes.Invalid : ''}
          onChange={props.changed}
          value={props.value}
        >
          {Object.keys(props.options).map(key => {
            const o = props.options[key];
            return (
              <option key={o.value} value={o.value}>
                {o.valueDisplay}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={props.invalid && props.touched ? classes.Invalid : ''}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.changed}
        />
      );
      break;
  }

  return inputElement;
};

export default formInput;
