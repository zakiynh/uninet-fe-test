import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from '../../stores/reducers/rootReducer';
import { firestore } from '../../helpers/firebase';
import * as blogActions from '../../stores/actions/blogActions';

import CreatePost from '../CreatePosts';

// Mock the Firebase functions
jest.mock('../../helpers/firebase', () => ({
  firestore: {
    collection: jest.fn().mockReturnThis(),
    addDoc: jest.fn(() => Promise.resolve({ id: 'mockId' })),
  },
}));

// Mock the external Swal library
jest.mock('../../helpers/swal.jsx', () => ({
  fire: jest.fn(),
}));

jest.mock('../../stores/actions/blogActions.js');

describe('CreatePost Component', () => {
  let store;

  beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));
  });

  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();
  
    // Mock the createPost action to dispatch the CREATE_POST action
    blogActions.createPost.mockImplementation((post) => async (dispatch) => {
      dispatch({ type: 'CREATE_POST', payload: { id: 'mockId', ...post } });
    });
  });

  test('renders the component', () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <CreatePost />
      </Provider>
    );

    expect(getByText('Create Blog Post')).toBeInTheDocument();
    expect(getByLabelText('Author:')).toBeInTheDocument();
    expect(getByLabelText('Title:')).toBeInTheDocument();
    expect(getByLabelText('Content:')).toBeInTheDocument();
    expect(getByText('Create Post')).toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <CreatePost />
      </Provider>
    );

    fireEvent.change(getByLabelText('Author:'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Title:'), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText('Content:'), { target: { value: 'Test Content' } });

    expect(getByLabelText('Author:').value).toBe('John Doe');
    expect(getByLabelText('Title:').value).toBe('Test Title');
    expect(getByLabelText('Content:').value).toBe('Test Content');
  });

  it('handles create post button click', async () => {
    firestore.addDoc.mockResolvedValueOnce('mockPostRef');
  firestore.collection.mockReturnValueOnce('mockCollection');

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <CreatePost />
      </Provider>
    );

    fireEvent.change(getByLabelText('Author:'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Title:'), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText('Content:'), { target: { value: 'Test Content' } });

    fireEvent.click(getByText('Create Post'));

    // Wait for the asynchronous dispatch to finish
    await waitFor(() => {
      const state = store.getState();
      expect(state.blog.posts.length).toBe(1);
    });
  });
});
