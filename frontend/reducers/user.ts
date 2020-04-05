
/* ****************************************************************************************************************** */

import { Action, UserOutput } from '../types';

/* ****************************************************************************************************************** */
import {
  USER_SHOW_REQUEST,
  USER_SHOW_SUCCESS,
  USER_SHOW_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
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
const user = (state = { user: {} }, action: Action<{ user: UserOutput }>) => {
  switch (action.type) {
    case USER_SHOW_SUCCESS: {
      const { payload = { user: {} } } = action;
      return payload.user;
    }
    case USER_UPDATE_SUCCESS: {
      const { payload = { user: {} } } = action;
      return payload.user;
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

  user,
};

/* ****************************************************************************************************************** */
