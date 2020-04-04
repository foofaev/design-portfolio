/* ****************************************************************************************************************** */

import get from 'lodash/get';
import { Action, LogginInState } from '../types';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/session';

/* ****************************************************************************************************************** */

const loggingInState = (state = { error: '', status: 'none' as 'none' }, action: Action<LogginInState>): LogginInState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { status: 'requested', error: '' };
    case LOGIN_SUCCESS:
      return { status: 'finished', error: '' };
    case LOGIN_FAILURE:
      return { status: 'failed', error: get(action, 'payload.error', '') };
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
