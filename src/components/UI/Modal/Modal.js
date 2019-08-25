import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    const { show, children } = this.props;
    const { show: nextShow, children: nextChildren } = nextProps;
    return nextShow !== show || nextChildren !== children;
  }

  render() {
    const { show, modalClosed, children } = this.props;
    return (
      <>
        {show && <Backdrop clicked={modalClosed} show />}
        <CSSTransition
          in={show}
          timeout={500}
          mountOnEnter
          unmountOnExit
          classNames={{
            enterActive: classes.ModalSlideIn,
            exitActive: classes.ModalSlideOut,
          }}
        >
          <div className={classes.Modal}>{children}</div>
        </CSSTransition>
      </>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
