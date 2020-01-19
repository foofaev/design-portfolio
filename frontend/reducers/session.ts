/* ****************************************************************************************************************** */

import { Action } from '../types';

/* ****************************************************************************************************************** */

const loggingInState = (state = 'none', action: Action<string>) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return 'requested';
    case 'LOGIN_SUCCESS':
      return 'finished';
    case 'LOGIN_FAILURE':
      return 'failed';
    default:
      return state;
  }
};

/* ****************************************************************************************************************** */
const session = (state: { isLoggedIn: boolean }, action: Action<void>) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return { isLoggedIn: true };
    }
    default: {
      return { isLoggedIn: false };
    }
  }
};

/* ****************************************************************************************************************** */
export {
  loggingInState,
  session,
};

/* ****************************************************************************************************************** */
