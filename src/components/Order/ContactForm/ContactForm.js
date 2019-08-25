import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity, updateObj } from '../../../sharedFn/utilities';

import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import FormInput from '../../FormInput/Forminput';
import classes from './ContactForm.css';

class ContactForm extends Component {
  constructor() {
    super();
    this.state = {
      contactForm: {
        name: {
          name: 'name',
          value: '',
          placeholder: 'Enter Your Name',
          type: 'text',
          inputType: 'input',
          valid: false,
          validation: {
            required: true,
            length: {
              minLength: 5,
              maxLength: 10,
            },
            pattern: /^[a-zA-Z]+$/,
          },
          touched: false,
        },
        email: {
          name: 'email',
          value: '',
          placeholder: 'Enter Your Email',
          type: 'email',
          inputType: 'input',
          valid: false,
          validation: {
            required: true,
            pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          },
          touched: false,
        },
        phone: {
          name: 'phone',
          value: '',
          placeholder: 'Enter Your phone',
          type: 'number',
          inputType: 'input',
          valid: false,
          validation: {
            required: true,
            length: {
              minLength: 5,
              maxLength: 10,
            },
            pattern: /^\d+$/,
          },
          touched: false,
        },
        address: {
          name: 'address',
          value: '',
          placeholder: 'Enter Your Adress',
          inputType: 'textarea',
          valid: false,
          validation: {
            required: true,
            length: {
              minLength: 5,
              maxLength: 20,
            },
          },
          touched: false,
        },
        deliveryType: {
          name: 'deliveryType',
          inputType: 'select',
          options: {
            fastest: {
              value: 'fastest',
              valueDisplay: 'Fastest',
            },
            cheapest: {
              value: 'cheapest',
              valueDisplay: 'Cheapest',
            },
          },
          value: 'cheapest',
          valid: true,
          validation: {},
        },
      },
      // formIsValid: false,
    };
  }

  orderHandler = () => {
    const { ings, price, userId, onPurchasingBurger, token } = this.props;
    const { contactForm } = this.state;
    const orderContactData = {};
    Object.keys(contactForm).forEach(key => {
      const field = contactForm[key];
      orderContactData[key] = field.value;
    });

    const order = {
      ingredients: ings,
      price,
      customer: orderContactData,
      userId,
    };

    onPurchasingBurger(order, token);
  };

  inputChangedHandler = (e, inputName) => {
    const { contactForm } = this.state;
    Object.keys(contactForm).forEach(key => {
      const targetInputField = contactForm[key];
      if (targetInputField.name === contactForm[inputName].name) {
        const updatedInput = updateObj(contactForm[inputName], {
          value: e.target.value,
          touched: true,
          valid: checkValidity(contactForm[inputName].value, contactForm[inputName].validation),
        });

        const updatedContactForm = updateObj(contactForm, {
          [inputName]: updatedInput,
        });

        // let formIsValid = true;
        // for (const inputName in updatedContactForm) {
        //   formIsValid = updatedContactForm[inputName].valid && formIsValid;
        // }

        this.setState({ contactForm: updatedContactForm });
      }
    });
  };

  render() {
    const { contactForm } = this.state;
    const { loading } = this.props;
    const formArr = Object.keys(contactForm).map(key => contactForm[key]);

    let form = null;
    form = formArr.map(i => {
      return (
        <FormInput
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...i}
          key={i.name}
          changed={e => this.inputChangedHandler(e, i.name)}
          touched={i.touched}
          invalid={!i.valid}
        />
      );
    });

    if (loading) {
      form = <Spinner />;
    }

    const style = {
      display: 'block',
      width: '100%',
      marginTop: '1rem',
      padding: '0.5rem',
      color: 'white',
      background: '#e48f34',
      borderRadius: '4px',
    };

    return (
      <div className={classes.ContactForm}>
        {form}
        <Button label="Order" type="Success" style={style} clicked={this.orderHandler} />
      </div>
    );
  }
}

ContactForm.propTypes = {
  ings: PropTypes.shape.isRequired,
  price: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  onPurchasingBurger: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchasingBurger: (order, token) => dispatch(actions.purchaseBurger(order, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactForm, axios));
