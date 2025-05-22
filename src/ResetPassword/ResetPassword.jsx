import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import { Toaster, toast } from "sonner";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isLinkExpired, setIsLinkExpired] = useState(false); // Add this state
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/update-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      const data = await response.json();
      if (data.message === "Link has expired") {
        setIsLinkExpired(true);
      }
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error("Error:", error);
    }
  };

  return (
    <main className={styles.resetPasswordPage}>
      <Toaster position="bottom-right" visibleToasts={1} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.formTitle}>Reset Password</h2>
        {isLinkExpired ? ( // Conditionally render based on link expiration
          <p className={styles.message}>
            The reset link has expired. Please request a new one.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <label className={styles.inputLabel}>New Password</label>
              <div className={styles.inputField}>
                <input
                  type="password"
                  className={styles.input}
                  aria-label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.inputLabel}>Confirm Password</label>
              <div className={styles.inputField}>
                <input
                  type="password"
                  className={styles.input}
                  aria-label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;
