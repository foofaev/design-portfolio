/* ****************************************************************************************************************** */

import axios from 'axios';
import { ActionFunction0, AsyncActionFunction0 } from '../types';
import routes from '../api';

/* ****************************************************************************************************************** */
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

/* ****************************************************************************************************************** */

const loginRequest: ActionFunction0 = () => ({ type: LOGIN_REQUEST, payload: {} });
const loginSuccess: ActionFunction0 = () => ({ type: LOGIN_SUCCESS, payload: {} });
const loginFailure: ActionFunction0 = () => ({ type: LOGIN_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const login: AsyncActionFunction0<void> = () => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const url = routes.login();
    await axios.put(url);
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(loginFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */
export {
  loginFailure,
  loginSuccess,
  loginRequest,

  login,

  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
};

/* ****************************************************************************************************************** */
