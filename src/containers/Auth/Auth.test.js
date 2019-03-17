import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Auth } from './Auth'

configure({ adapter: new Adapter() })

describe('<Auth>', () => {
  let auth;

  beforeEach(() => {
    auth = shallow(<Auth onSetAuthRedirectPath={() => { }} />)
  })

  describe('when sign in', () => {
    it('should show error msg when invalid email', () => {
      auth.setProps({ error: { message: "INVALID_EMAIL" } })
  
      expect(auth.find('.error-msg').text()).toEqual('Email is invalid')
    })
  
    it('should show error msg when incorrect password', () => {
      auth.setProps({ error: { message: "INVALID_PASSWORD" } })
  
      expect(auth.find('.error-msg').text()).toEqual('Password is not correct')
    })
  
    it('should show error msg  when email does not exist', () => {
      auth.setProps({ error: { message: "EMAIL_NOT_FOUND" } })
  
      expect(auth.find('.error-msg').text()).toEqual('Email is not register')
    })
  })

  describe('when sign up', () => {
    it('should show error msg when email is already taked', () => {
      auth.setProps({ error: { message: "EMAIL_EXISTS" } })
  
      expect(auth.find('.error-msg').text()).toEqual('Email exists. Please choose another email')
    })
  })

  describe('when getting redirected from homepage', () => {
    it('should show alert msg telling user to sign in', () => {
      auth.setProps({ error: { message: "SIGN_IN_NEEDED" } })
  
      expect(auth.find('.error-msg').text()).toEqual('Please sign in to purchase burgers')
    })
  })
})