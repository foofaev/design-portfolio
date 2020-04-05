/* ****************************************************************************************************************** */

import axios from 'axios';
import { SubmissionError, FormSubmitHandler } from 'redux-form';
import {
  Project, ActionFunction0, ActionFunction1, ActionFunction2,
  AsyncActionFunctionWithPaging, ProjectInput,
} from '../types';
import routes from './routes';

/* ****************************************************************************************************************** */
const PROJECTS_FETCH_REQUEST = 'PROJECTS_FETCH_REQUEST';
const PROJECTS_FETCH_SUCCESS = 'PROJECTS_FETCH_SUCCESS';
const PROJECTS_FETCH_FAILURE = 'PROJECTS_FETCH_FAILURE';

const PROJECT_ADD_REQUEST = 'PROJECT_ADD_REQUEST';
const PROJECT_ADD_SUCCESS = 'PROJECT_ADD_SUCCESS';
const PROJECT_ADD_FAILURE = 'PROJECT_ADD_FAILURE';

/* ****************************************************************************************************************** */

const fetchProjectsRequest: ActionFunction0 = () => ({ type: PROJECTS_FETCH_REQUEST, payload: {} });
const fetchProjectsSuccess: ActionFunction2<Project[], number> = ({ projects, count }) => ({
  type: PROJECTS_FETCH_SUCCESS,
  payload: { projects, count },
});

const fetchProjectsFailure: ActionFunction0 = () => ({ type: PROJECTS_FETCH_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const addProjectRequest: ActionFunction0 = () => ({ type: PROJECT_ADD_REQUEST, payload: {} });
const addProjectSuccess: ActionFunction1<Project> = ({ project }) => ({
  type: PROJECT_ADD_SUCCESS,
  payload: { project },
});
const addProjectFailure: ActionFunction0 = () => ({ type: PROJECT_ADD_FAILURE, payload: {} });

/* ****************************************************************************************************************** */
const addProject: FormSubmitHandler<{ project: ProjectInput }> = async ({ project }, dispatch) => {
  dispatch(addProjectRequest());
  try {
    const response = await axios.put(routes.projectUrl(), { ...project });
    dispatch(addProjectSuccess({ project: response.data }));
  } catch (error) {
    dispatch(addProjectFailure());
    throw new SubmissionError({ _error: error.message });
  }
};

/* ****************************************************************************************************************** */
const fetchProjects: AsyncActionFunctionWithPaging<Project[]> = (paging) => async (dispatch) => {
  dispatch(fetchProjectsRequest());
  try {
    const url = routes.projectsUrl(paging);
    const response = await axios.get(url);
    const { projects, count }: { projects: Project[]; count: number } = response.data;
    dispatch(fetchProjectsSuccess({ projects, count }));
  } catch (error) {
    console.error(error);
    dispatch(fetchProjectsFailure());
  }
};

/* ****************************************************************************************************************** */

export {
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsFailure,


  addProjectRequest,
  addProjectSuccess,
  addProjectFailure,

  addProject,
  fetchProjects,

  PROJECT_ADD_FAILURE,
  PROJECT_ADD_SUCCESS,
  PROJECT_ADD_REQUEST,

  PROJECTS_FETCH_FAILURE,
  PROJECTS_FETCH_SUCCESS,
  PROJECTS_FETCH_REQUEST,
};
