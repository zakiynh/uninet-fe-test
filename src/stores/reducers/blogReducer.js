import { CREATE_POST, GET_POSTS, DELETE_POST } from "../actions/actionType";

const initialState = {
  posts: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case DELETE_POST:
        return {
            ...state,
            posts: state.posts.filter((post) => post.id !== action.payload),
        };
    default:
      return state;
  }
};

export default blogReducer;
