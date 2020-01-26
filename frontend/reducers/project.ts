/* ****************************************************************************************************************** */

import { Action, ProjectAction } from '../types';

/* ****************************************************************************************************************** */
import {
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAILURE,
  PROJECT_SHOW_REQUEST,
  PROJECT_SHOW_SUCCESS,
  PROJECT_SHOW_FAILURE,
  PROJECT_REMOVE_REQUEST,
  PROJECT_REMOVE_SUCCESS,
  PROJECT_REMOVE_FAILURE,
} from '../actions/project';

import {
  PROJECT_IMAGE_SAVE_SUCCESS,
  PROJECT_IMAGE_ORD_UPDATE_SUCCESS,
  PROJECT_IMAGE_REMOVE_SUCCESS,
} from '../actions/projectFiles';

/* ****************************************************************************************************************** */

const projectUpdatingState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQUEST:
      return 'requested';
    case PROJECT_UPDATE_SUCCESS:
      return 'finished';
    case PROJECT_UPDATE_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const projectShowingState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case PROJECT_SHOW_REQUEST:
      return 'requested';
    case PROJECT_SHOW_SUCCESS:
      return 'finished';
    case PROJECT_SHOW_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const projectRemovingState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case PROJECT_REMOVE_REQUEST:
      return 'requested';
    case PROJECT_REMOVE_SUCCESS:
      return 'finished';
    case PROJECT_REMOVE_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const project = (state = {}, action: ProjectAction) => {
  switch (action.type) {
    case PROJECT_SHOW_SUCCESS: {
      const { payload } = action;
      return payload.project;
    }
    case PROJECT_UPDATE_SUCCESS: {
      const { payload } = action;
      return payload.project;
    }
    case PROJECT_IMAGE_SAVE_SUCCESS: {
      const { payload } = action;
      return payload.project;
    }
    case PROJECT_IMAGE_ORD_UPDATE_SUCCESS: {
      const { payload } = action;
      return payload.project;
    }
    case PROJECT_IMAGE_REMOVE_SUCCESS: {
      const { payload } = action;
      return payload.project;
    }
    default: {
      return state;
    }
  }
};

/* ****************************************************************************************************************** */
export {
  projectShowingState,
  projectUpdatingState,
  projectRemovingState,

  project,
};

/* ****************************************************************************************************************** */
