import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, getPosts } from "../stores/actions/blogActions";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const currentPost = useSelector((state) => state.blog.posts.find(post => post.id === id));
    const [updatedTitle, setUpdatedTitle] = useState(currentPost.title);
    const [updatedContent, setUpdatedContent] = useState(currentPost.content);

  const handleUpdatePost = async () => {
    const updatedPost = {
      title: updatedTitle,
      content: updatedContent,
    };

    await dispatch(updatePost(id, updatedPost));
    await dispatch(getPosts());
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-4">Edit Post</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
        <textarea
          value={updatedContent}
          onChange={(e) => setUpdatedContent(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
          rows="4"
        />
      </div>
      <button
        onClick={handleUpdatePost}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Update Post
      </button>
    </div>
  );
};

export default EditPost;
