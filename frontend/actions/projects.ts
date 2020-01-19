/* ****************************************************************************************************************** */

import axios from 'axios';
import {
  Project, ActionFunction0, ActionFunction1, ActionFunction2, AsyncActionFunction1, AsyncActionFunctionWithPaging,
} from '../types';
import routes from '../api';

/* ****************************************************************************************************************** */

const fetchProjectsRequest: ActionFunction0 = () => ({ type: 'PROJECTS_FETCH_REQUEST', payload: {} });
const fetchProjectsSuccess: ActionFunction2<Project[], number> = ({ projects, count }) => ({
  type: 'PROJECTS_FETCH_SUCCESS',
  payload: { projects, count },
});

const fetchProjectsFailure: ActionFunction0 = () => ({ type: 'PROJECTS_FETCH_FAILURE', payload: {} });

/* ****************************************************************************************************************** */
const showProjectRequest: ActionFunction0 = () => ({ type: 'PROJECT_SHOW_REQUEST', payload: {} });
const showProjectSuccess: ActionFunction1<Project> = ({ project }) => ({ type: 'PROJECT_SHOW_SUCCESS', payload: { project } });
const showProjectFailure: ActionFunction0 = () => ({ type: 'PROJECT_SHOW_FAILURE', payload: {} });

/* ****************************************************************************************************************** */
const removeProjectsRequest: ActionFunction0 = () => ({ type: 'PROJECT_REMOVE_REQUEST', payload: {} });
const removeProjectsSuccess: ActionFunction1<string> = ({ id }) => ({ type: 'PROJECT_REMOVE_SUCCESS', payload: { id } });
const removeProjectsFailure: ActionFunction0 = () => ({ type: 'PROJECT_FETCH_FAILURE', payload: {} });

/* ****************************************************************************************************************** */
const addProjectRequest: ActionFunction0 = () => ({ type: 'PROJECT_ADD_REQUEST', payload: {} });
const addProjectSuccess: ActionFunction1<Project> = ({ project }) => ({ type: 'PROJECT_ADD_SUCCESS', payload: { project } });
const addProjectFailure: ActionFunction0 = () => ({ type: 'PROJECT_ADD_FAILURE', payload: {} });

/* ****************************************************************************************************************** */
const updateProjectRequest: ActionFunction0 = () => ({ type: 'PROJECT_UPDATE_REQUEST', payload: {} });
const updateProjectSuccess: ActionFunction1<Project> = ({ project }) => ({ type: 'PROJECT_UPDATE_SUCCESS', payload: { project } });
const updateProjectFailure: ActionFunction0 = () => ({ type: 'PROJECT_UPDATE_FAILURE', payload: {} });

/* ****************************************************************************************************************** */
const addProject: AsyncActionFunction1<Project> = ({ project }) => async (dispatch) => {
  dispatch(addProjectRequest());
  try {
    const response = await axios.put(routes.projectUrl(), { ...project });
    dispatch(addProjectSuccess({ project: response.data }));
  } catch (error) {
    dispatch(addProjectFailure());
    throw error;
  }
};

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
const removeProject: AsyncActionFunction1<Project> = ({ project }) => async (dispatch) => {
  dispatch(removeProjectsRequest());
  try {
    const url = routes.projectUrl(project.id);
    await axios.delete(url);
    dispatch(removeProjectsSuccess({ id: project.id }));
  } catch (error) {
    dispatch(removeProjectsFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */
const fetchProjects: AsyncActionFunctionWithPaging<Project[]> = (paging) => async (dispatch) => {
  dispatch(fetchProjectsRequest());
  try {
    const url = routes.projectsUrl(paging);
    const response = await axios.get(url);
    const { projects, count }: { projects: Project[], count: number } = response.data;
    dispatch(fetchProjectsSuccess({ projects, count }));
  } catch (error) {
    dispatch(fetchProjectsFailure());
    throw error;
  }
};

/* ****************************************************************************************************************** */

export {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsFailure,

  removeProjectsRequest,
  removeProjectsFailure,
  removeProjectsSuccess,

  addProjectRequest,
  addProjectSuccess,
  addProjectFailure,

  showProjectFailure,
  showProjectRequest,
  showProjectSuccess,

  addProject,
  removeProject,
  fetchProjects,
  showProject,
  updateProject,
};
