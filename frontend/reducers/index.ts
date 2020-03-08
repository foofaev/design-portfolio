import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as projectsReducers from './projects';
import * as projectReducers from './project';
import * as projectFilesReducers from './projectFiles';
import * as sessionReducers from './session';


export default combineReducers({
  form: formReducer,
  ...projectsReducers,
  ...projectReducers,
  ...projectFilesReducers,
  ...sessionReducers,
});
