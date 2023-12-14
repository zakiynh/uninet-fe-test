import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../stores/actions/authActions";
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call the logout action
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <Link to="/dashboard">
          <h1 className="text-lg font-bold">My App</h1>
        </Link>
        <div className="flex items-center">
          <div className="mr-4">
            <Link to="/filter">
              <h5 className="text-sm font-normal">Filter</h5>
            </Link>
          </div>
          {user && (
            <button
              onClick={handleLogout}
              className="text-sm px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
