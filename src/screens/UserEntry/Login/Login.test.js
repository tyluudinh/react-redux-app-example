import React from 'react';
// import configureStore from 'redux-mock-store'
import Login from './container';

describe('Login Component', () => {
  // create any initial state needed
  const initialState = {};
// here it is possible to pass in any middleware if needed into //configureStore
//   const mockStore = configureStore();
  let wrapper;
  let store;
  
  beforeEach(() => {
    // pass the mock function as the login prop
    // store = mockStore(initialState);
    wrapper = shallow(<Login store={store}/>)
  })
// ...tests here...
})