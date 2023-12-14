import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS } from '../actions/actionType';

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;