"use client";
import React, { useState } from "react";
import styles from "./ForgetPassword.module.css";
import { Toaster, toast } from "sonner";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/request-password-reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      toast.success(data.message);
      setEmail(""); // Clear input text
    } catch (error) {
      toast.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.forgetPasswordPage}>
      <Toaster position="bottom-right" visibleToasts={1} />
      <div className={styles.contentWrapper}>
        <h2 className={styles.formTitle}>Forget Password</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <label className={styles.inputLabel}>Email</label>
            <div className={styles.inputField}>
              <input
                type="email"
                className={styles.input}
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ForgetPassword;
