import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../stores/actions/authActions";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Call the login action
    dispatch(login({ email, password }));
    console.log('login dispatch')
    navigate("/dashboard");
    console.log('login navigate')
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-4 text-center text-blue-950">Login</h2>
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
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
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="text-center text-gray-600">
            Belum punya akun?{" "}
            <a href="#" onClick={handleRegisterRedirect} className="text-blue-500 hover:underline">
              Register
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
