/* ****************************************************************************************************************** */

import { Action } from '../types';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/session';

/* ****************************************************************************************************************** */

const loggingInState = (state = 'none', action: Action<string>) => {
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
const session = (state = { isLoggedIn: false }, action: Action<void>) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { isLoggedIn: true };
    }
    default: {
      return state;
    }
  }
};

/* ****************************************************************************************************************** */
export {
  loggingInState,
  session,
};

/* ****************************************************************************************************************** */
