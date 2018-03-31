import React from 'react';
import SignUp from './index';

describe("Sign up Screen", () => {
  const signUpScreen = (props) => shallow(<SignUp {...props}/>)
  test('Render', () => {
    const normalSignUpScreen = signUpScreen({
      inProgress: false,
      errors: null,
      clean: () => {}
    });
    // const normalSignUpScreenJson = toJson(normalSignUpScreen);
    // expect(normalSignUpScreenJson).toMatchSnapshot();

    expect(normalSignUpScreen.find('.btn-login')).toHaveLength(1);
  });
  test('Show error', () => {
    const errorSignupScreen = signUpScreen({
      inProgress: false,
      errors: "Sign up failed",
      clean: () => {}
    });
    expect(errorSignupScreen.find('.alert-error-login')).toHaveLength(1);
  })
});