import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import storage from 'redux-persist/es/storage';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'app/reducer';
import rootSaga from './rootSaga';

// Redux persist config
const config = {
  key: 'root',
  storage
}

const reducer = persistReducer(config, rootReducer);

const sagaMiddleware = createSagaMiddleware(); 

const configureStore = preloadedState => {
  const store = createStore(
    reducer,
    preloadedState,
    compose(
      applyMiddleware(sagaMiddleware, createLogger()),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
  )

  sagaMiddleware.run(rootSaga);

  // Persist av store
  // persistStore(store, options, callback)
  // For example: persistStore(store, {blacklist: ['sometransientreducer']}, () => {
  //  console.log('Rehydrate completed!');  
  // })
  const rootPersistor =  persistStore(store);
  
  return {
    store,
    rootPersistor,
  };
}

export default configureStore;