import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS } from './actionType';
import showError from '../../helpers/swal';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('https://reqres.in/api/login', credentials);
    // Save session in localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
    // Dispatch the login success action if successful
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    showError('success', 'Login successful')
  } catch (error) {
    // Dispatch the login failure action if unsuccessful
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
    showError('error', error.response.data.error)
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem('user');
  showError('success', 'Logout successful')
};

export const register = (userData) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post('https://reqres.in/api/register', userData);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      showError('success', 'Register successful');
      resolve();
    } catch (error) {
      dispatch(registerFailure(error.response.data));
      showError('error', error.response.data.error);
      reject(error);
    }
  });
}