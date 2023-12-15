import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePosts from "../components/CreatePosts";
import ReadPost from "../components/ReadPost";
import { getPosts } from "../stores/actions/blogActions";
import { LOGIN_SUCCESS } from "../stores/actions/actionType";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const users = storedUser ? JSON.parse(storedUser) : null;

    if (users) {
      dispatch({ type: LOGIN_SUCCESS, payload: users })
      dispatch(getPosts());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [dispatch, user, history]);

  return (
      <div className="container mx-auto mt-8 text-center">
        {user && (
          <>
            <h2 className="text-3xl font-bold mb-4">
              Welcome to the Thread Blog
            </h2>
            <CreatePosts />
            <ReadPost />
          </>
        )}
      </div>
  );
}

export default Dashboard;
