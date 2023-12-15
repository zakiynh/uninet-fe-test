import React from "react";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import blogReducer from "../../stores/reducers/blogReducer";
import ReadPost from "../ReadPost";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

jest.mock("../../helpers/firebase", () => ({
  firestore: {
    collection: jest.fn().mockReturnThis(),
    deleteDoc: jest.fn(() => Promise.resolve({ id: "mockId" })),
  },
}));

jest.mock("../../stores/actions/blogActions");

jest.mock("../../stores/actions/blogActions.js", () => ({
    deletePost: jest.fn((postId) => async (dispatch, getState) => {
      const posts = getState().posts.filter((post) => post.id !== postId);
      dispatch({ type: "DELETE_POST", payload: posts });
    }),
    getPosts: jest.fn(() => async (dispatch) => {}),
  }));

jest.mock("firebase/firestore", () => ({
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));

jest.mock('../../helpers/swal.jsx', () => ({
    fire: jest.fn(),
  }));

describe("ReadPost Component", () => {
    let store;
    
    beforeEach(() => {
        store = createStore(blogReducer, applyMiddleware(thunk));
    });
    
    beforeEach(() => {
        // Reset all mocks before each test
        jest.resetAllMocks();
    });
    
    test('calls handleDeletePost when delete button is clicked', () => {
        const handleDeletePost = jest.fn();
        const post = { id: '1', title: 'Post 1' };
      
        render(
          <button
            onClick={() => handleDeletePost(post.id)}
            className="delete-button mt-4 text-gray-500 hover:text-red-500 ml-auto bg-transparent border-0 outline-none focus:outline-none"
          >
            <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
          </button>
        );
      
        const deleteButton = screen.getByRole('button');
        fireEvent.click(deleteButton);
      
        expect(handleDeletePost).toHaveBeenCalledWith(post.id);
      });
})
