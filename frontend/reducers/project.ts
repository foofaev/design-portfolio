/* ****************************************************************************************************************** */

import { Action, ProjectAction, Project } from '../types';

/* ****************************************************************************************************************** */

const projectUpdatingState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case 'PROJECT_UPDATE_REQUEST':
      return 'requested';
    case 'PROJECT_UPDATE_SUCCESS':
      return 'finished';
    case 'PROJECT_UPDATE_FAILURE':
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const projectShowingState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case 'PROJECTS_SHOW_REQUEST':
      return 'requested';
    case 'PROJECTS_SHOW_SUCCESS':
      return 'finished';
    case 'PROJECTS_SHOW_FAILURE':
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const saveProjectImageState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case 'PROJECT_IMAGE_SAVE_REQUEST':
      return 'requested';
    case 'PROJECT_IMAGE_SAVE_SUCCESS':
      return 'finished';
    case 'PROJECT_IMAGE_SAVE_FAILURE':
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const updateProjectImageOrdState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case 'PROJECT_IMAGE_ORD_UPDATE_REQUEST':
      return 'requested';
    case 'PROJECT_IMAGE_ORD_UPDATE_SUCCESS':
      return 'finished';
    case 'PROJECT_IMAGE_ORD_UPDATE_FAILURE':
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const removeProjectImageState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case 'PROJECT_IMAGE_REMOVE_REQUEST':
      return 'requested';
    case 'PROJECT_IMAGE_REMOVE_SUCCESS':
      return 'finished';
    case 'PROJECT_IMAGE_REMOVE_FAILURE':
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const project = (state: Project, action: ProjectAction) => {
  switch (action.type) {
    case 'PROJECT_SHOW_SUCCESS': {
      const { payload } = action;
      return payload.project;
    }
    case 'PROJECT_UPDATE_SUCCESS': {
      const { payload } = action;
      return payload.project;
    }
    case 'PROJECT_IMAGE_SAVE_SUCCESS': {
      const { payload } = action;
      return payload.project;
    }
    case 'PROJECT_IMAGE_ORD_UPDATE_SUCCESS': {
      const { payload } = action;
      return payload.project;
    }
    case 'PROJECT_IMAGE_REMOVE_SUCCESS': {
      const { payload } = action;
      return payload.project;
    }
    default: {
      return {};
    }
  }
};

/* ****************************************************************************************************************** */
export {
  projectShowingState,
  projectUpdatingState,

  saveProjectImageState,
  updateProjectImageOrdState,
  removeProjectImageState,

  project,
};

/* ****************************************************************************************************************** */
