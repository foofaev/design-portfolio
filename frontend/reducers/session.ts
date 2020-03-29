/* ****************************************************************************************************************** */

import { Action } from '../types';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/session';

/* ****************************************************************************************************************** */

const loggingInState = (state = 'none', action: Action<string>): string => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return 'requested';
    case LOGIN_SUCCESS:
      return 'finished';
    case LOGIN_FAILURE:
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const isLoggedIn = (state = false, action: Action<void>): boolean => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return true;
    }
    default: {
      return state;
    }
  }
};

/* ****************************************************************************************************************** */
export {
  loggingInState,
  isLoggedIn,
};

/* ****************************************************************************************************************** */
