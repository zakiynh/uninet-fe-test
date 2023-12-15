import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, getPosts } from "../stores/actions/blogActions";
import showError from "../helpers/swal";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async () => {
    try {
      if (!author || !title || !content) {
        showError("warning", "Please fill all the fields");
        return;
      }
      const post = {
        author,
        title,
        content,
        createdAt: new Date(),
      };

      await dispatch(createPost(post));
      await dispatch(getPosts());

      setAuthor("");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
    <h2 className="text-2xl font-bold mb-4">Create Blog Post</h2>
    <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="author" className="text-gray-700 font-semibold mb-2">
            Author:
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-700 font-semibold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="text-gray-700 font-semibold mb-2">
            Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
            rows="5"
          />
        </div>
        <button
          type="button"
          onClick={handleCreatePost}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
