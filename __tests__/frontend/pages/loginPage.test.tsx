import React from 'react';
import { mount } from 'enzyme';
import { createStore, combineReducers } from 'redux';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import LoginPage from '../../../frontend/views/LoginPage';

const rootReducer = combineReducers({
  form: formReducer,
});

describe('frontend / LoginPage', () => {
  it('renders', () => {
    expect(LoginPage).toBeDefined();
    const store = createStore(rootReducer);
    const tree = mount(
      <Provider store={store}>
        <HashRouter>
          <LoginPage />
        </HashRouter>
      </Provider>,
    );
    expect(tree).not.toBeNull();
    expect(tree.find('Header')).toBeDefined();
    expect(tree.find('LoginForm')).toBeDefined();
    expect(tree.find('Tooltip')).toBeDefined();
  });
});
