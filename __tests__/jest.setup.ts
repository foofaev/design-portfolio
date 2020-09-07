import noop from 'lodash/noop';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'reflect-metadata';

configure({ adapter: new Adapter() });

// TODO: hack
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
