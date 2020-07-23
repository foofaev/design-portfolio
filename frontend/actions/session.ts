/* ****************************************************************************************************************** */

import axios from 'axios';
import { SubmissionError, FormSubmitHandler } from 'redux-form';
import { ActionFunction0, ActionFunction1, AsyncActionFunction } from '../types';
import routes from './routes';

/* ****************************************************************************************************************** */
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const CHECK_SESSION_SUCCESS = 'CHECK_SESSION_SUCCESS';
const CHECK_SESSION_FAILURE = 'CHECK_SESSION_FAILURE';

/* ****************************************************************************************************************** */

const loginRequest: ActionFunction0 = () => ({ type: LOGIN_REQUEST, payload: {} });
const loginSuccess: ActionFunction0 = () => ({ type: LOGIN_SUCCESS, payload: {} });
const checkSessionSuccess: ActionFunction0 = () => ({ type: CHECK_SESSION_SUCCESS, payload: {} });
const checkSessionFailure: ActionFunction0 = () => ({ type: CHECK_SESSION_FAILURE, payload: {} });
const loginFailure: ActionFunction1<string> = ({ error }) => ({ type: LOGIN_FAILURE, payload: { error } });

/* ****************************************************************************************************************** */
type LoginProps = { email: string; password: string };

const login: FormSubmitHandler<LoginProps> = async ({ email, password }, dispatch) => {
  dispatch(loginRequest());
  try {
    const url = routes.login();
    await axios.put(url, { email, password });
    dispatch(loginSuccess());
  } catch (error) {
    const message = (error as Error).toString();
    dispatch(loginFailure({ error: message }));
    throw new SubmissionError({ _error: message, email: message, password: message });
  }
};

/* ****************************************************************************************************************** */
const checkSession: AsyncActionFunction = () => async (dispatch): Promise<void> => {
  try {
    await axios.get(routes.checkSessionUrl());
    dispatch(checkSessionSuccess());
  } catch (error) {
    dispatch(checkSessionFailure());
  }
};

/* ****************************************************************************************************************** */
export {
  loginFailure,
  loginSuccess,
  loginRequest,
  checkSessionSuccess,
  checkSessionFailure,

  login,
  checkSession,

  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  CHECK_SESSION_SUCCESS,
  CHECK_SESSION_FAILURE,
};

/* ****************************************************************************************************************** */
