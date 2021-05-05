import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import rootReducer from '../reducers';
import Header from '../components/header';
import { CssBaseline, Container } from "@material-ui/core";

const createStore = () => reduxCreateStore(rootReducer);

export default ({ element }) => (
  <Provider store={createStore()}>
    <CssBaseline />
    <Header />
    {element}
  </Provider>
);