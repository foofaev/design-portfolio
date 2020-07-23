import React from 'react';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../../../frontend/reducers';

import ProjectPage from '../../../frontend/views/ProjectPage';

describe('frontend / PortfolioPage', () => {
  it('renders', () => {
    expect(ProjectPage).toBeDefined();
    const store = createStore(reducers, applyMiddleware(thunk));
    const tree = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['project-1']}>
          <ProjectPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(tree).not.toBeNull();
  });
});
