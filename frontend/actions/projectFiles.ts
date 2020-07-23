/* ****************************************************************************************************************** */

import axios, { AxiosResponse } from 'axios';

import { Project, ActionFunction0, ActionFunction1, ActionFunction2, AsyncActionFunction } from '../types';

import routes from './routes';

/* ****************************************************************************************************************** */
type ProjectOutput = { project?: Project };

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
const saveProjectImageSuccess: ActionFunction1<Project> = ({ project }) => ({
  type: PROJECT_IMAGE_SAVE_SUCCESS,
  payload: { project },
});
const saveProjectImageFailure: ActionFunction0 = () => ({ type: PROJECT_IMAGE_SAVE_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const updateProjectImageOrdRequest: ActionFunction0 = () => ({
  type: PROJECT_IMAGE_ORD_UPDATE_REQUEST,
  payload: {},
});
const updateProjectImageOrdSuccess: ActionFunction1<Project> = ({ project }) => ({
  type: PROJECT_IMAGE_ORD_UPDATE_SUCCESS,
  payload: { project },
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
type SaveProjectImageInput = {
  file: Blob;
  ord: number;
  projectId: string;
};

const saveProjectImage: AsyncActionFunction<SaveProjectImageInput, ProjectOutput> = ({
  file,
  ord,
  projectId,
}) => async (dispatch) => {
  dispatch(saveProjectImageRequest());
  try {
    const response: AxiosResponse<{ project: Project }> = await axios.patch(
      routes.projectImageUrl({ id: projectId }),
      { file, ord },
    );
    dispatch(saveProjectImageSuccess({ ...response.data }));
  } catch (error) {
    dispatch(saveProjectImageFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */
type UpdateProjectImageOrdInput = {
  fileId: string;
  ord: number;
  projectId: string;
};

const updateProjectImageOrd: AsyncActionFunction<UpdateProjectImageOrdInput, ProjectOutput> = ({
  fileId,
  ord,
  projectId,
}) => async (dispatch) => {
  dispatch(updateProjectImageOrdRequest());
  try {
    const route = routes.projectImageUrl({ id: projectId, fileId });
    const response: AxiosResponse<{ project: Project }> = await axios.patch(route, { ord });
    dispatch(updateProjectImageOrdSuccess({ ...response.data }));
  } catch (error) {
    dispatch(updateProjectImageOrdFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */
type RemoveProjectImageInput = {
  fileId: string;
  projectId: string;
};

const removeProjectImage: AsyncActionFunction<RemoveProjectImageInput, ProjectOutput> = ({
  fileId,
  projectId,
}) => async (dispatch) => {
  dispatch(removeProjectImageRequest());
  try {
    const route = routes.projectImageUrl({ id: projectId, fileId });
    const response: AxiosResponse<{ project: Project }> = await axios.delete(route);
    dispatch(removeProjectImageSuccess({ ...response.data }));
  } catch (error) {
    dispatch(removeProjectImageFailure());
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
