/* ****************************************************************************************************************** */

import axios, { AxiosResponse } from 'axios';
import { SubmissionError, FormSubmitHandler } from 'redux-form';
import {
  ActionFunction,
  ActionFunction0,
  ActionFunction1,
  AsyncActionFunction0,
  AsyncActionFunction,
  UserInput,
  UserOutput,
} from '../types';
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

const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST';
const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

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
const updatePasswordRequest: ActionFunction = () => ({ type: UPDATE_PASSWORD_REQUEST, payload: {} });
const updatePasswordSuccess: ActionFunction = () => ({ type: UPDATE_PASSWORD_SUCCESS, payload: {} });
const updatePasswordFailure: ActionFunction = () => ({ type: UPDATE_PASSWORD_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const updateUser: FormSubmitHandler<UserInput> = async ({ ...user }, dispatch) => {
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
const changePassword: FormSubmitHandler<{
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}> = async ({ oldPassword, newPassword }, dispatch) => {
  dispatch(updatePasswordRequest());
  try {
    await axios.patch(routes.changePassword(), { oldPassword, newPassword });
    dispatch(updatePasswordSuccess());
  } catch (error) {
    dispatch(updatePasswordFailure());
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
const saveUserImage: FormSubmitHandler<{ avatar: File }> = async ({ avatar }, dispatch) => {
  dispatch(saveUserImageRequest());
  try {
    const body = new FormData();
    body.append('file', avatar);
    const response: AxiosResponse<{ user: UserOutput }> = await axios({
      method: 'PATCH',
      url: routes.userImageUrl(),
      data: body,
    });
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
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailure,
  showUser,
  updateUser,
  saveUserImage,
  removeUserImage,
  changePassword,
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
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
};

/* ****************************************************************************************************************** */
