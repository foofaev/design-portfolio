/* ****************************************************************************************************************** */

import axios from 'axios';
import {
  Project, ActionFunction0, ActionFunction1, AsyncActionFunction1,
} from '../types';
import routes from './routes';

/* ****************************************************************************************************************** */
const PROJECT_SHOW_REQUEST = 'PROJECT_SHOW_REQUEST';
const PROJECT_SHOW_SUCCESS = 'PROJECT_SHOW_SUCCESS';
const PROJECT_SHOW_FAILURE = 'PROJECT_SHOW_FAILURE';

const PROJECT_UPDATE_REQUEST = 'PROJECT_UPDATE_REQUEST';
const PROJECT_UPDATE_SUCCESS = 'PROJECT_UPDATE_SUCCESS';
const PROJECT_UPDATE_FAILURE = 'PROJECT_UPDATE_FAILURE';

const PROJECT_REMOVE_REQUEST = 'PROJECT_REMOVE_REQUEST';
const PROJECT_REMOVE_SUCCESS = 'PROJECT_REMOVE_SUCCESS';
const PROJECT_REMOVE_FAILURE = 'PROJECT_REMOVE_FAILURE';

/* ****************************************************************************************************************** */
const showProjectRequest: ActionFunction0 = () => ({ type: PROJECT_SHOW_REQUEST, payload: {} });
const showProjectSuccess: ActionFunction1<Project> = ({ project }) => ({
  type: PROJECT_SHOW_SUCCESS,
  payload: { project },
});
const showProjectFailure: ActionFunction0 = () => ({ type: PROJECT_SHOW_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const updateProjectRequest: ActionFunction0 = () => ({ type: PROJECT_UPDATE_REQUEST, payload: {} });
const updateProjectSuccess: ActionFunction1<Project> = ({ project }) => ({
  type: PROJECT_UPDATE_SUCCESS,
  payload: { project },
});
const updateProjectFailure: ActionFunction0 = () => ({ type: PROJECT_UPDATE_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const removeProjectsRequest: ActionFunction0 = () => ({ type: PROJECT_REMOVE_REQUEST, payload: {} });
const removeProjectsSuccess: ActionFunction1<string> = ({ id }) => ({ type: PROJECT_REMOVE_SUCCESS, payload: { id } });
const removeProjectsFailure: ActionFunction0 = () => ({ type: PROJECT_REMOVE_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const updateProject: AsyncActionFunction1<Project> = ({ project }) => async (dispatch): Promise<void> => {
  dispatch(updateProjectRequest());
  try {
    const response = await axios.patch(routes.projectUrl(project.id), { ...project });
    dispatch(updateProjectSuccess({ ...response.data }));
  } catch (error) {
    dispatch(updateProjectFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */
const showProject: AsyncActionFunction1<string> = ({ urlKey }) => async (dispatch): Promise<void> => {
  dispatch(showProjectRequest());
  try {
    const response = await axios.get(routes.projectUrl(urlKey));
    dispatch(showProjectSuccess({ ...response.data }));
  } catch (error) {
    dispatch(showProjectFailure());
    throw error;
  }
};


/* ****************************************************************************************************************** */
const removeProject: AsyncActionFunction1<Project> = ({ project }) => async (dispatch): Promise<void> => {
  dispatch(removeProjectsRequest());
  try {
    const url = routes.projectUrl(project.urlKey);
    await axios.delete(url);
    dispatch(removeProjectsSuccess({ id: project.id }));
  } catch (error) {
    dispatch(removeProjectsFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */

export {
  showProjectRequest,
  showProjectFailure,
  showProjectSuccess,

  updateProjectRequest,
  updateProjectFailure,
  updateProjectSuccess,

  removeProjectsRequest,
  removeProjectsFailure,
  removeProjectsSuccess,

  showProject,
  updateProject,
  removeProject,

  PROJECT_UPDATE_FAILURE,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_REQUEST,

  PROJECT_SHOW_FAILURE,
  PROJECT_SHOW_REQUEST,
  PROJECT_SHOW_SUCCESS,

  PROJECT_REMOVE_FAILURE,
  PROJECT_REMOVE_SUCCESS,
  PROJECT_REMOVE_REQUEST,
};

/* ****************************************************************************************************************** */
