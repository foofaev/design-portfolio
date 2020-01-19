/* ****************************************************************************************************************** */

import axios from 'axios';
import { Project, ActionFunction0, ActionFunction1, AsyncActionFunction1 } from '../types';
import routes from '../api';

/* ****************************************************************************************************************** */
const showProjectRequest: ActionFunction0 = () => ({ type: 'PROJECT_SHOW_REQUEST', payload: {} });
const showProjectSuccess: ActionFunction1<Project> = ({ project }) => ({ type: 'PROJECT_SHOW_SUCCESS', payload: { project } });
const showProjectFailure: ActionFunction0 = () => ({ type: 'PROJECT_SHOW_FAILURE', payload: {} });

/* ****************************************************************************************************************** */
const updateProjectRequest: ActionFunction0 = () => ({ type: 'PROJECT_UPDATE_REQUEST', payload: {} });
const updateProjectSuccess: ActionFunction1<Project> = ({ project }) => ({ type: 'PROJECT_UPDATE_SUCCESS', payload: { project } });
const updateProjectFailure: ActionFunction0 = () => ({ type: 'PROJECT_UPDATE_FAILURE', payload: {} });

/* ****************************************************************************************************************** */
const updateProject: AsyncActionFunction1<Project> = ({ project }) => async (dispatch) => {
  dispatch(updateProjectRequest());
  try {
    const response = await axios.patch(routes.projectUrl(project.id), { ...project });
    dispatch(updateProjectSuccess({ project: response.data }));
  } catch (error) {
    dispatch(updateProjectFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */
const showProject: AsyncActionFunction1<string> = ({ id }) => async (dispatch) => {
  dispatch(showProjectRequest());
  try {
    const response = await axios.get(routes.projectUrl(id));
    dispatch(showProjectSuccess({ project: response.data }));
  } catch (error) {
    dispatch(showProjectFailure());
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

  showProject,
  updateProject,
};

/* ****************************************************************************************************************** */
