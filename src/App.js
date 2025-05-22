import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Auth/LoginPage/Login";
import SignupPage from "./Auth/SignupPage/Signup";
import ProfilePage from "./ProfilePage/Profile";
import Dashboard from "./DashBoard/Dashboard";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import ProtectedRoute from "./ProtectedRoute";
import ResetPassword from "./ResetPassword/ResetPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
