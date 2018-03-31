import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import 'antd/dist/antd.css';
import configureStore from './store/configureStore';
import AppRouter from './router/container';
import GoogleAnalytics from "app/components/GoogleAnalytics/GoogleAnalytics";

export const { store, rootPersistor } = configureStore();

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <GoogleAnalytics id="UA-113246121-2">
            <AppRouter />
          </GoogleAnalytics>
        </Provider>
      </Router>
    );
  }
}

export const persistor = rootPersistor;
export default App;
