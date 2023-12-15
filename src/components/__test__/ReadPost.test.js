import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import ReadPost from "../ReadPost";
import blogReducer from "../../stores/reducers/blogReducer";
import * as blogActions from "../../stores/actions/blogActions";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../stores/actions/blogActions");

const mockPosts = [
  {
    id: "1",
    title: "Post 1",
    author: "Author 1",
    content: "Content 1",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Post 2",
    author: "Author 2",
    content: "Content 2",
    createdAt: new Date(),
  },
];

// Mock getPosts to return a function
blogActions.getPosts.mockImplementation(() => (dispatch) => {
  dispatch({ type: "GET_POSTS", payload: mockPosts });
});

describe("ReadPost Component", () => {
  it("fetches and displays posts", async () => {
    const store = createStore(
      blogReducer,
      { blog: { posts: [] } },
      applyMiddleware(thunk)
    );

    const { getByText, findAllByRole } = render(
      <Provider store={store}>
        <ReadPost />
      </Provider>
    );

    const headingElements = await findAllByRole("heading");
    const postHeadingElements = headingElements.filter(
      (element) => element.textContent !== "Blog Posts"
    );

    postHeadingElements.forEach((headingElement, index) => {
      expect(headingElement).toHaveTextContent(mockPosts[index].title);
      expect(getByText(mockPosts[index].author)).toBeInTheDocument();
      expect(getByText(mockPosts[index].content)).toBeInTheDocument();
    });
  });


  it('renders without crashing', () => {
    const mockPost = { id: '1', title: 'Post 1', author: 'Author 1', content: 'Content 1' };
    const store = createStore(blogReducer, { blog: { posts: [mockPost] } }, applyMiddleware(thunk));
  
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ReadPost />
        </Router>
      </Provider>
    );
  
    expect(getByText('Post 1')).toBeInTheDocument();
  });
});
