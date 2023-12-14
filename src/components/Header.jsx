import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../stores/actions/authActions';
import { useNavigate } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call the logout action
    dispatch(logout());
    navigate('/');
  };

  return (
    <header>
      <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <Link to="/dashboard">
          <h1 className="text-lg font-bold">My App</h1>
        </Link>
        {user ? (
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="text-sm px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </button>
          </div>
        ) : null}
      </nav>
    </header>
  );
}

export default Header;