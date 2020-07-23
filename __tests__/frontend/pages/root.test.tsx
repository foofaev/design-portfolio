import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../../frontend/Root';

describe('frontend/Root.tsx', () => {
  it.only('renders Root', () => {
    expect(Root).toBeDefined();
    const tree = shallow(<Root />);
    expect(tree).not.toBeNull();
  });
});
