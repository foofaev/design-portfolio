/* ****************************************************************************************************************** */

import { Action } from '../types';

import {
  PROJECT_IMAGE_SAVE_REQUEST,
  PROJECT_IMAGE_SAVE_FAILURE,
  PROJECT_IMAGE_SAVE_SUCCESS,

  PROJECT_IMAGE_ORD_UPDATE_REQUEST,
  PROJECT_IMAGE_ORD_UPDATE_FAILURE,
  PROJECT_IMAGE_ORD_UPDATE_SUCCESS,

  PROJECT_IMAGE_REMOVE_REQUEST,
  PROJECT_IMAGE_REMOVE_FAILURE,
  PROJECT_IMAGE_REMOVE_SUCCESS,
} from '../actions/projectFiles';

/* ****************************************************************************************************************** */

const saveProjectImageState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case PROJECT_IMAGE_SAVE_REQUEST:
      return 'requested';
    case PROJECT_IMAGE_SAVE_SUCCESS:
      return 'finished';
    case PROJECT_IMAGE_SAVE_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const updateProjectImageOrdState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case PROJECT_IMAGE_ORD_UPDATE_REQUEST:
      return 'requested';
    case PROJECT_IMAGE_ORD_UPDATE_SUCCESS:
      return 'finished';
    case PROJECT_IMAGE_ORD_UPDATE_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const removeProjectImageState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case PROJECT_IMAGE_REMOVE_REQUEST:
      return 'requested';
    case PROJECT_IMAGE_REMOVE_SUCCESS:
      return 'finished';
    case PROJECT_IMAGE_REMOVE_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
export {
  saveProjectImageState,
  updateProjectImageOrdState,
  removeProjectImageState,
};

/* ****************************************************************************************************************** */
