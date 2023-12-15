import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePost } from "../stores/actions/blogActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const ReadPost = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.blog.posts);

  useEffect(() => {
    // Panggil action untuk mendapatkan data posts dari Firestore
    dispatch(getPosts());
  }, [dispatch]);

  const handleDeletePost = async (id) => {
    await dispatch(deletePost(id));
    await dispatch(getPosts());
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8">Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-md overflow-hidden shadow-md relative"
          >
            <img
              src="https://via.placeholder.com/400x200"
              alt="Blog Post"
              className="w-full h-40 object-cover object-center"
            />
            <div className="p-4 flex flex-col">
              <h3 className="text-xl text-gray-900 font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-2">{post.author}</p>
              <p className="text-gray-700 mb-2">{post.content}</p>
              {post.createdAt && (
                <p className="text-sm text-gray-500 mb-2">
                  Posted on {post.createdAt.toDate().toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="absolute bottom-0 right-0">
              <NavLink
                to={`/update/${post.id}`}
                // onClick={() => handleEditPost(post.id)}
                className="edit-button mt-4 text-gray-500 hover:text-yellow-500 ml-auto bg-transparent border-0 outline-none focus:outline-none"
              >
                <FontAwesomeIcon icon={faEdit} className="h-5 w-5" />
              </NavLink>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="delete-button mt-4 text-gray-500 hover:text-red-500 ml-auto bg-transparent border-0 outline-none focus:outline-none"
              >
                <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadPost;
