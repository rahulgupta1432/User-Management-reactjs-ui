import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import AdminDashboard from './components/Admin/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import NotAuthorized from './components/NotAuthorized';

function App() {
  // const token = localStorage.getItem('token');
  let role = localStorage.getItem('role');
  role = JSON.parse(role)
  console.log(role)
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}

          {/* Not Authorized Route */}
          <Route path="/not-authorized" element={<NotAuthorized />} />
        </Routes>
        {
          role == "Admin" ? (
            <Routes>

              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/admindashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

            </Routes>

          ) : (
            <Routes>
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>

          )
        }
      </AuthProvider>
    </Router>
  );
}

export default App;
