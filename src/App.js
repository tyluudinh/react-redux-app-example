import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import configureStore from './store/configureStore';
import AppRouter from './router/container';

export const { store, rootPersistor } = configureStore();

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </Router>
    );
  }
}

export const persistor = rootPersistor;
export default App;
