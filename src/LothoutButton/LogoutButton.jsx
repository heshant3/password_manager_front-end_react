import React from "react";
import axios from "axios";

const LogoutAllButton = () => {
  const handleLogoutAll = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Clear local storage and redirect to login page
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (err) {
      console.error("Error logging out from all devices:", err);
    }
  };

  return <button onClick={handleLogoutAll}>Logout All</button>;
};

export default LogoutAllButton;
