import React from 'react';
import { mount } from 'enzyme';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../../../frontend/reducers';

import PortfolioPage from '../../../frontend/views/PortfolioPage';

describe('frontend / PortfolioPage', () => {
  it('renders', () => {
    expect(PortfolioPage).toBeDefined();
    const store = createStore(reducers, applyMiddleware(thunk));
    const tree = mount(
      <Provider store={store}>
        <HashRouter>
          <PortfolioPage />
        </HashRouter>
      </Provider>,
    );
    expect(tree).not.toBeNull();
  });
});
