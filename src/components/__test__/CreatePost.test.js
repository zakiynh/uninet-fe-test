import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import CreatePost from '../CreatePost';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('CreatePost component', () => {
  test('renders without crashing', () => {
    useDispatch.mockReturnValue(jest.fn());
    render(<CreatePost />);
    expect(screen.getByText('Create Blog Post')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    render(<CreatePost />);
    
    // Simulate user input
    userEvent.type(screen.getByLabelText(/author/i), 'John Doe');
    userEvent.type(screen.getByLabelText(/title/i), 'Test Title');
    userEvent.type(screen.getByLabelText(/content/i), 'Test Content');
    
    // Trigger form submission
    fireEvent.click(screen.getByText(/create post/i));

    // Check if the dispatch function is called with the correct arguments
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
  });
});