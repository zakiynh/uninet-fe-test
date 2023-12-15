import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import CreatePost from "../CreatePost";
import { useDispatch } from "react-redux";
import { createPost } from "../../stores/actions/blogActions";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));
jest.mock("../../stores/actions/blogActions.js", () => ({
  createPost: jest.fn(),
}));

describe("CreatePost", () => {
  let wrapper;
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    wrapper = render(<CreatePost />);
  });
  it("should render the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should dispatch createPost action when form is submitted", async () => {
    const title = wrapper.getByLabelText("title");
    const content = wrapper.getByLabelText("content");
    const submitButton = wrapper.getByText("submit");
    fireEvent.change(title, { target: { value: "Test Title" } });
    fireEvent.change(content, { target: { value: "Test Content" } });
    fireEvent.click(submitButton);
    await waitForElement(() => wrapper.getByText("Post created!"));
    expect(createPost).toHaveBeenCalledWith({
      title: "Test Title",
      content: "Test Content",
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "CREATE_POST_SUCCESS",
      payload: {
        title: "Test Title",
        content: "Test Content",
      },
    });
  });
});
