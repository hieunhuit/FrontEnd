import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';

const composeEnhencers =
  process.env.NODE_ENV !== 'production' && typeof window == 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();
const configStore = () => {
  const middlewares = [sagaMiddleware];
  const enhencers = [applyMiddleware(...middlewares)];
  const store = createStore(rootReducer, composeEnhencers(...enhencers));
  sagaMiddleware.run(rootSaga); // là 1 proccess dùng để theo dõi các action
  return store;
};

export default configStore; // export ra 1 function => muon dung thi phai goi ham
