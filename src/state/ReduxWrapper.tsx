import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from '../reducers';
import Header from '../components/header';
import { CssBaseline } from "@material-ui/core";

const createStore = () => reduxCreateStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default ({ element }) => (
  <Provider store={createStore()}>
        <CssBaseline />
        <Header />
        {element}
  </Provider>
);