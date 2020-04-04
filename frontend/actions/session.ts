/* ****************************************************************************************************************** */

import axios from 'axios';
import { SubmissionError, FormSubmitHandler } from 'redux-form';
import { ActionFunction0, ActionFunction1, AsyncActionFunction2 } from '../types';
import routes from './routes';

/* ****************************************************************************************************************** */
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

/* ****************************************************************************************************************** */

const loginRequest: ActionFunction0 = () => ({ type: LOGIN_REQUEST, payload: {} });
const loginSuccess: ActionFunction0 = () => ({ type: LOGIN_SUCCESS, payload: {} });
const loginFailure: ActionFunction1<string> = ({ error }) => ({ type: LOGIN_FAILURE, payload: { error } });

/* ****************************************************************************************************************** */
const login: FormSubmitHandler<{email?: string; password?: string }> = async ({ email, password }, dispatch) => {
  dispatch(loginRequest());
  try {
    const url = routes.login();
    await axios.put(url, { email, password });
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(loginFailure({ error: error.message }));
    throw new SubmissionError({ _error: error.message, email: error.message, password: error.message });
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
