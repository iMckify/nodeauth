import React from 'react';
import { Provider } from 'react-redux';
import Store from '../utils/redux/store';

export default () => <Provider store={Store} />;
