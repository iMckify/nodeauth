import { errorMessages } from '../constants';

export const emailValidation = email => {
  if (email.length !== 0) {
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.length > 128) {
      return errorMessages.emailError;
    }
  } else {
    return errorMessages.isEmptyEmail;
  }
  return '';
};

export const passwordValidation = password => {
  if (password.length !== 0) {
    if (password.length < 8 || password.length > 255) {
      return errorMessages.password;
    }
  } else {
    return errorMessages.isEmptyPassword;
  }
  return '';
};

export const confirmPasswordValidation = (password, confirmPassword) => {
  if (confirmPassword.length !== 0) {
    if (confirmPassword !== password) {
      return errorMessages.confirmPasswordError;
    }
  } else {
    return errorMessages.isEmptyConfirmPassword;
  }
  return '';
};
