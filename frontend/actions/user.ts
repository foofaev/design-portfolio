/* ****************************************************************************************************************** */

import axios, { AxiosResponse } from 'axios';
import { SubmissionError, FormSubmitHandler } from 'redux-form';
import { ActionFunction, ActionFunction0, ActionFunction1, AsyncActionFunction0, AsyncActionFunction, UserInput, UserOutput } from '../types';
import routes from './routes';

/* ****************************************************************************************************************** */
const USER_SHOW_REQUEST = 'USER_SHOW_REQUEST';
const USER_SHOW_SUCCESS = 'USER_SHOW_SUCCESS';
const USER_SHOW_FAILURE = 'USER_SHOW_FAILURE';

const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
const USER_UPDATE_FAILURE = 'USER_UPDATE_FAILURE';

const USER_IMAGE_SAVE_REQUEST = 'USER_IMAGE_SAVE_REQUEST';
const USER_IMAGE_SAVE_SUCCESS = 'USER_IMAGE_SAVE_SUCCESS';
const USER_IMAGE_SAVE_FAILURE = 'USER_IMAGE_SAVE_FAILURE';


const USER_IMAGE_REMOVE_REQUEST = 'USER_IMAGE_REMOVE_REQUEST';
const USER_IMAGE_REMOVE_SUCCESS = 'USER_IMAGE_REMOVE_SUCCESS';
const USER_IMAGE_REMOVE_FAILURE = 'USER_IMAGE_REMOVE_FAILURE';

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
const saveUserImageRequest: ActionFunction = () => ({ type: USER_IMAGE_SAVE_REQUEST, payload: {} });
const saveUserImageSuccess: ActionFunction1<UserOutput> = ({ user }) => ({
  type: USER_IMAGE_SAVE_SUCCESS,
  payload: { user },
});
const saveUserImageFailure: ActionFunction0 = () => ({ type: USER_IMAGE_SAVE_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const removeUserImageRequest: ActionFunction = () => ({ type: USER_IMAGE_REMOVE_REQUEST, payload: {} });
const removeUserImageSuccess: ActionFunction1<UserOutput> = ({ user }) => ({
  type: USER_IMAGE_REMOVE_SUCCESS,
  payload: { user },
});
const removeUserImageFailure: ActionFunction = () => ({ type: USER_IMAGE_REMOVE_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const updateUser: FormSubmitHandler<{ user: UserInput }> = async ({ user }, dispatch) => {
  dispatch(updateUserRequest());
  try {
    const response: AxiosResponse<{ user: UserOutput }> = await axios.patch(routes.userUrl(), { ...user });
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
    const response: AxiosResponse<{ user: UserOutput }> = await axios.get(routes.userUrl());
    dispatch(showUserSuccess({ ...response.data }));
  } catch (error) {
    dispatch(showUserFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */
const saveUserImage: AsyncActionFunction<{ file: Blob }, { user: UserOutput }> = ({ file }) => async (dispatch) => {
  dispatch(saveUserImageRequest());
  try {
    const response: AxiosResponse<{ user: UserOutput }> = await axios.patch(routes.userImageUrl(), { file });
    dispatch(saveUserImageSuccess({ ...response.data }));
  } catch (error) {
    dispatch(saveUserImageFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */
const removeUserImage: AsyncActionFunction<void, { user: UserOutput }> = () => async (dispatch) => {
  dispatch(removeUserImageRequest());
  try {
    const response: AxiosResponse<{ user: UserOutput }> = await axios.delete(routes.userImageUrl());
    dispatch(removeUserImageSuccess({ ...response.data }));
  } catch (error) {
    dispatch(removeUserImageFailure());
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
  saveUserImage,
  removeUserImage,

  USER_SHOW_REQUEST,
  USER_SHOW_SUCCESS,
  USER_SHOW_FAILURE,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,

  USER_IMAGE_REMOVE_REQUEST,
  USER_IMAGE_REMOVE_SUCCESS,
  USER_IMAGE_REMOVE_FAILURE,

  USER_IMAGE_SAVE_REQUEST,
  USER_IMAGE_SAVE_SUCCESS,
  USER_IMAGE_SAVE_FAILURE,
};

/* ****************************************************************************************************************** */
