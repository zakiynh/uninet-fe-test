import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import loggerMiddleware from './middleware/logger'; // Sesuaikan dengan path yang sesuai
import rootReducer from './reducers/rootReducer'; // Sesuaikan dengan path yang sesuai

const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));

export default store;