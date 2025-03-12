import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/auth/check-token/${token}`
          );
          if (!response.data) {
            localStorage.clear();
            navigate("/login");
          }
        } catch (error) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    const interval = setInterval(() => {
      checkTokenValidity();
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
