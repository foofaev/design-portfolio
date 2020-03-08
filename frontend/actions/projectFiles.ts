/* ****************************************************************************************************************** */

import axios from 'axios';

import {
  Project,
  ActionFunction0,
  ActionFunction1,
  ActionFunction2,
  AsyncActionFunction1,
  AsyncActionFunction2,
  AsyncActionFunction3,
} from '../types';

import routes from './routes';

/* ****************************************************************************************************************** */
const PROJECT_IMAGE_SAVE_REQUEST = 'PROJECT_IMAGE_SAVE_REQUEST';
const PROJECT_IMAGE_SAVE_SUCCESS = 'PROJECT_IMAGE_SAVE_SUCCESS';
const PROJECT_IMAGE_SAVE_FAILURE = 'PROJECT_IMAGE_SAVE_FAILURE';

const PROJECT_IMAGE_ORD_UPDATE_REQUEST = 'PROJECT_IMAGE_ORD_UPDATE_REQUEST';
const PROJECT_IMAGE_ORD_UPDATE_SUCCESS = 'PROJECT_IMAGE_ORD_UPDATE_SUCCESS';
const PROJECT_IMAGE_ORD_UPDATE_FAILURE = 'PROJECT_IMAGE_ORD_UPDATE_FAILURE';

const PROJECT_IMAGE_REMOVE_REQUEST = 'PROJECT_IMAGE_REMOVE_REQUEST';
const PROJECT_IMAGE_REMOVE_SUCCESS = 'PROJECT_IMAGE_REMOVE_SUCCESS';
const PROJECT_IMAGE_REMOVE_FAILURE = 'PROJECT_IMAGE_REMOVE_FAILURE';

/* ****************************************************************************************************************** */
const saveProjectImageRequest: ActionFunction0 = () => ({ type: PROJECT_IMAGE_SAVE_REQUEST, payload: {} });
const saveProjectImageSuccess: ActionFunction2<number, Buffer> = ({ ord, data }) => ({
  type: PROJECT_IMAGE_SAVE_SUCCESS,
  payload: { ord, data },
});
const saveProjectImageFailure: ActionFunction0 = () => ({ type: PROJECT_IMAGE_SAVE_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const updateProjectImageOrdRequest: ActionFunction0 = () => ({
  type: PROJECT_IMAGE_ORD_UPDATE_REQUEST,
  payload: {},
});
const updateProjectImageOrdSuccess: ActionFunction1<number> = ({ ord }) => ({
  type: PROJECT_IMAGE_ORD_UPDATE_SUCCESS,
  payload: { ord },
});
const updateProjectImageOrdFailure: ActionFunction0 = () => ({ type: PROJECT_IMAGE_ORD_UPDATE_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const removeProjectImageRequest: ActionFunction0 = () => ({ type: PROJECT_IMAGE_REMOVE_REQUEST, payload: {} });
const removeProjectImageSuccess: ActionFunction1<Project> = ({ project }) => ({
  type: PROJECT_IMAGE_REMOVE_SUCCESS,
  payload: { project },
});
const removeProjectImageFailure: ActionFunction0 = () => ({ type: PROJECT_IMAGE_REMOVE_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const saveProjectImage: AsyncActionFunction3<Buffer, number, string> = (
  { file, ord, projectId },
) => async (dispatch) => {
  dispatch(saveProjectImageRequest());
  try {
    const response = await axios.patch(routes.projectImageUrl({ id: projectId as string }), { file, ord });
    dispatch(saveProjectImageSuccess({ project: response.data }));
  } catch (error) {
    dispatch(saveProjectImageFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */
const updateProjectImageOrd: AsyncActionFunction2<number, string> = (
  { fileId, ord, projectId },
) => async (dispatch) => {
  dispatch(updateProjectImageOrdRequest());
  try {
    const route = routes.projectImageUrl({ id: projectId as string, fileId: fileId as string });
    const response = await axios.patch(route, { ord });
    dispatch(updateProjectImageOrdSuccess({ project: response.data }));
  } catch (error) {
    dispatch(updateProjectImageOrdFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */
const removeProjectImage: AsyncActionFunction1<string> = ({ fileId, projectId }) => async (dispatch) => {
  dispatch(removeProjectImageRequest());
  try {
    const route = routes.projectImageUrl({ id: projectId, fileId });
    const response = await axios.delete(route);
    dispatch(updateProjectImageOrdSuccess({ project: response.data }));
  } catch (error) {
    dispatch(updateProjectImageOrdFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */

export {
  saveProjectImageRequest,
  saveProjectImageSuccess,
  saveProjectImageFailure,

  updateProjectImageOrdRequest,
  updateProjectImageOrdFailure,
  updateProjectImageOrdSuccess,

  removeProjectImageRequest,
  removeProjectImageSuccess,
  removeProjectImageFailure,

  saveProjectImage,
  updateProjectImageOrd,
  removeProjectImage,


  PROJECT_IMAGE_SAVE_REQUEST,
  PROJECT_IMAGE_SAVE_SUCCESS,
  PROJECT_IMAGE_SAVE_FAILURE,

  PROJECT_IMAGE_ORD_UPDATE_REQUEST,
  PROJECT_IMAGE_ORD_UPDATE_SUCCESS,
  PROJECT_IMAGE_ORD_UPDATE_FAILURE,

  PROJECT_IMAGE_REMOVE_REQUEST,
  PROJECT_IMAGE_REMOVE_SUCCESS,
  PROJECT_IMAGE_REMOVE_FAILURE,
};
