import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../stores/actions/authActions";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Call the register action
    await dispatch(register({ email, password }));
    navigate('/login');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-4 text-center text-green-600">Register</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none"
            onClick={handleRegister}
          >
            Register
          </button>
          <p className="text-center text-gray-600">
            Sudah punya akun?{" "}
            <a href="#" onClick={handleLoginRedirect} className="text-green-500 hover:underline">
              Login
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;