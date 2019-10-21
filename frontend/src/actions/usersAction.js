import axios from 'axios';
import { userLogin, getUser } from '../utils/constants/api';

export const getUserLogin = () => {
  return axios.get(userLogin).then(res => res.data);
};

export const validateInfo = email => {
  return axios
    .get(`${getUser}${email}`)
    .then(res => res.data)
    .catch(err => {
      return err.response.data.Message;
    });
};
