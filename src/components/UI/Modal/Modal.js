import React, { Component } from "react";
import { CSSTransition } from 'react-transition-group'

import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.props.show && <Backdrop clicked={this.props.modalClosed} show />}
        <CSSTransition
          in={this.props.show}
          timeout={500}
          mountOnEnter
          unmountOnExit
          classNames={{
            enterActive: classes.ModalSlideIn,
            exitActive:  classes.ModalSlideOut
          }}
        >
          <div className={classes.Modal}>
            {this.props.children}
          </div>
        </CSSTransition>
      </React.Fragment>
    );
  }
}

export default Modal;
