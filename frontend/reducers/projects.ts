/* ****************************************************************************************************************** */

import keyBy from 'lodash/keyBy';
import map from 'lodash/map';
import without from 'lodash/without';
import omit from 'lodash/omit';

import { Action, ProjectsState, ProjectAction } from '../types';

/* ****************************************************************************************************************** */

/* ****************************************************************************************************************** */
const projectFetchingState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case 'PROJECTS_FETCH_REQUEST':
      return 'requested';
    case 'PROJECTS_FETCH_SUCCESS':
      return 'finished';
    case 'PROJECTS_FETCH_FAILURE':
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const projectAddingState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case 'PROJECT_ADD_REQUEST':
      return 'requested';
    case 'PROJECT_ADD_SUCCESS':
      return 'finished';
    case 'PROJECT_ADD_FAILURE':
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const projects = (state: ProjectsState, action: ProjectAction) => {
  switch (action.type) {
    case 'PROJECTS_FETCH_SUCCESS': {
      const { payload } = action;
      return {
        byId: keyBy(payload.projects, 'id'),
        allIds: map(payload.projects, 'id'),
      };
    }
    case 'PROJECT_ADD_SUCCESS': {
      const { payload: { project } } = action;
      const { byId, allIds } = state;
      return {
        byId: { ...byId, [project.id]: project },
        allIds: [project.id, ...allIds],
      };
    }
    case 'PROJECT_REMOVE_SUCCESS': {
      const { byId, allIds } = state;
      const { id: removedId } = action.payload;
      return {
        byId: omit(byId, removedId),
        allIds: without(allIds, removedId),
      };
    }
    default: {
      return { byId: {}, allIds: [] };
    }
  }
};

/* ****************************************************************************************************************** */
export {
  projectRemovingState,
  projectFetchingState,
  projectAddingState,
  projects,
};

/* ****************************************************************************************************************** */
