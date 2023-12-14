import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Login from '../src/components/LoginForm';
import Register from './components/RegisterForm';
import Header from './components/Header';
import EditPost from './components/EditPost';

function App() {
  const isUserLoggedIn = () => {
    const user = localStorage.getItem('user');
    return !!user;
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            isUserLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update/:id" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;