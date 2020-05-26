
/* ****************************************************************************************************************** */

import get from 'lodash/get';
import { Action, UserOutput } from '../types';

/* ****************************************************************************************************************** */
import {
  USER_SHOW_REQUEST,
  USER_SHOW_SUCCESS,
  USER_SHOW_FAILURE,

  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,

  USER_IMAGE_REMOVE_REQUEST,
  USER_IMAGE_REMOVE_SUCCESS,
  USER_IMAGE_REMOVE_FAILURE,

  USER_IMAGE_SAVE_REQUEST,
  USER_IMAGE_SAVE_SUCCESS,
  USER_IMAGE_SAVE_FAILURE,

  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
} from '../actions/user';

/* ****************************************************************************************************************** */

const userUpdatingState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return 'requested';
    case USER_UPDATE_SUCCESS:
      return 'finished';
    case USER_UPDATE_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const userShowingState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case USER_SHOW_REQUEST:
      return 'requested';
    case USER_SHOW_SUCCESS:
      return 'finished';
    case USER_SHOW_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const userImageSavingState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case USER_IMAGE_SAVE_REQUEST:
      return 'requested';
    case USER_IMAGE_SAVE_SUCCESS:
      return 'finished';
    case USER_IMAGE_SAVE_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const userImageRemovingState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case USER_IMAGE_REMOVE_REQUEST:
      return 'requested';
    case USER_IMAGE_REMOVE_SUCCESS:
      return 'finished';
    case USER_IMAGE_REMOVE_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const userPasswordChangeState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return 'requested';
    case UPDATE_PASSWORD_SUCCESS:
      return 'finished';
    case UPDATE_PASSWORD_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const user = (state = { user: {} }, action: Action<{ user: UserOutput }>) => {
  switch (action.type) {
    case USER_SHOW_SUCCESS: {
      return get(action, 'payload.user');
    }
    case USER_UPDATE_SUCCESS: {
      return get(action, 'payload.user');
    }
    case USER_IMAGE_SAVE_SUCCESS: {
      return get(action, 'payload.user');
    }
    case USER_IMAGE_REMOVE_SUCCESS: {
      return get(action, 'payload.user');
    }
    default: {
      return state;
    }
  }
};

/* ****************************************************************************************************************** */
export {
  userShowingState,
  userUpdatingState,
  userImageSavingState,
  userImageRemovingState,
  userPasswordChangeState,

  user,
};

/* ****************************************************************************************************************** */
