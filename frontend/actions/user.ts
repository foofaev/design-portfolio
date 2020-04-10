/* ****************************************************************************************************************** */

import axios from 'axios';
import { SubmissionError, FormSubmitHandler } from 'redux-form';
import { ActionFunction, ActionFunction0, ActionFunction1, AsyncActionFunction0, UserInput, UserOutput } from '../types';
import routes from './routes';

/* ****************************************************************************************************************** */
const USER_SHOW_REQUEST = 'USER_SHOW_REQUEST';
const USER_SHOW_SUCCESS = 'USER_SHOW_SUCCESS';
const USER_SHOW_FAILURE = 'USER_SHOW_FAILURE';

const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';

/* ****************************************************************************************************************** */
const showUserRequest: ActionFunction = () => ({ type: USER_SHOW_REQUEST, payload: {} });
const showUserSuccess: ActionFunction1<UserOutput> = ({ user }) => ({
  type: USER_SHOW_SUCCESS,
  payload: { user },
});
const showUserFailure: ActionFunction0 = () => ({ type: USER_SHOW_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const updateUserRequest: ActionFunction0 = () => ({ type: USER_UPDATE_REQUEST, payload: {} });
const updateUserSuccess: ActionFunction1<UserOutput> = ({ user }) => ({
  type: USER_UPDATE_SUCCESS,
  payload: { user },
});
const updateUserFailure: ActionFunction0 = () => ({ type: USER_UPDATE_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const updateUser: FormSubmitHandler<{ user: UserInput }> = async ({ user }, dispatch) => {
  dispatch(updateUserRequest());
  try {
    const response = await axios.patch(routes.userUrl(), { ...user });
    dispatch(updateUserSuccess({ ...response.data }));
  } catch (error) {
    dispatch(updateUserFailure());
    throw new SubmissionError({ _error: error });
  }
};

/* ****************************************************************************************************************** */
const showUser: AsyncActionFunction0<UserOutput> = () => async (dispatch): Promise<void> => {
  dispatch(showUserRequest());
  try {
    const response = await axios.get(routes.userUrl());
    dispatch(showUserSuccess({ ...response.data }));
  } catch (error) {
    dispatch(showUserFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */

export {
  showUserRequest,
  showUserFailure,
  showUserSuccess,

  updateUserRequest,
  updateUserFailure,
  updateUserSuccess,

  showUser,
  updateUser,

  USER_SHOW_REQUEST,
  USER_SHOW_SUCCESS,
  USER_SHOW_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
};

/* ****************************************************************************************************************** */
