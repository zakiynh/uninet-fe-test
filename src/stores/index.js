import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import loggerMiddleware from './middleware/logger'; 
import rootReducer from './reducers/rootReducer'; 

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;