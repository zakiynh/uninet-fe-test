import React from "react";
import { useSelector } from "react-redux";
import CreatePost from "../components/createPost";
import ReadPost from "../components/ReadPost";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
      <div className="container mx-auto mt-8 text-center">
        {user && (
          <>
            <h2 className="text-3xl font-bold mb-4">
              Welcome to the Thread Blog
            </h2>
            <CreatePost />
            <ReadPost />
          </>
        )}
      </div>
  );
}

export default Dashboard;
