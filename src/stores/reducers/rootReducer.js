import { combineReducers } from 'redux';
import authReducer from './authReducer';
import blogReducer from './blogReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  // Add other reducers here if you have more
});

export default rootReducer;