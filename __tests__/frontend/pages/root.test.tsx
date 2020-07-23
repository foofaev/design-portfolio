import React from 'react';
import { shallow } from 'enzyme';
import Root from '../../../frontend/Root';

describe('frontend / Root', () => {
  it('renders', () => {
    expect(Root).toBeDefined();
    const tree = shallow(<Root />);
    expect(tree).not.toBeNull();
  });
});
