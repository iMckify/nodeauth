import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { userLogin, snackbarMessages } from '../utils/constants';
import { SET_CURRENT_USER, LOGOUT } from './types';
import setAuthToken from './setAuthToken';
import { validateInfo } from './usersAction';

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const loginUser = (user, openSnackbar, setError) => dispatch => {
  axios
    .post(userLogin, user)
    .then(res => {
      localStorage.setItem('jwtToken', res.data);
      setAuthToken(res.data);
      validateInfo(jwtDecode(res.data).email).then(userData => {
        dispatch(setCurrentUser(userData));
      });
      openSnackbar({
        message: snackbarMessages.loginSuccess,
        variant: 'success'
      });
    })
    .catch(err => {
      setError(err);
    });
};

export const logoutUser = dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch({ type: LOGOUT });
};
