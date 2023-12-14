import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS } from './actionType';
import showError from '../../helpers/swal';

export const login = (credentials) => async (dispatch) => {
  try {
    // Make API call with Axios
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
  // Dispatch the logout action
  dispatch({ type: LOGOUT });
  // Remove session from localStorage
  localStorage.removeItem('user');
  showError('success', 'Logout successful')
};

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const register = (userData) => async (dispatch) => {
  try {
    // Make API call with Axios
    const response = await axios.post('https://reqres.in/api/register', userData);
    // Dispatch the register success action if successful
    dispatch(registerSuccess());
    showError('success', 'Register successful')
  } catch (error) {
    // Dispatch the register failure action if unsuccessful
    dispatch(registerFailure(error.response.data));
    showError('error', error.response.data.error)
  }
}