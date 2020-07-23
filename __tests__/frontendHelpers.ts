import { mergeDeepRight } from 'ramda';
import rootReducer from '../reducer';
import { createStoreWithMiddleWare } from '../store';

export const makeStore = (customState = {}) => {
  const root = rootReducer({}, { type: '@@INIT' });
  const state = mergeDeepRight(root, customState);
  return createStoreWithMiddleWare(rootReducer, state);
};
