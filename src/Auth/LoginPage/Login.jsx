"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Api/Api";
import styles from "./Login.module.css";
import { Toaster, toast } from "sonner";

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response.status === 200) {
        const { userId, token } = response.data;
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed : Please Enter Correct Credential");
    }
  };

  return (
    <main className={styles.loginPage}>
      <Toaster position="bottom-right" visibleToasts={1} />
      <div className={styles.contentWrapper}>
        <section className={styles.welcomeColumn}>
          <div className={styles.welcomeContainer}>
            <div className={styles.welcomeContent}>
              <h1 className={styles.welcomeTitle}>
                Secure Password <br />
                Management
              </h1>
              <p className={styles.welcomeDescription}>
                Access your secure password vault
              </p>
            </div>
          </div>
        </section>
        <section className={styles.formColumn}>
          <div className={styles.formContainer}>
            <div className={styles.formContent}>
              <h2 className={styles.formTitle}>Login</h2>
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
                <div className={styles.inputWrapper}>
                  <label className={styles.inputLabel}>Password</label>
                  <div className={styles.inputField}>
                    <input
                      type="password"
                      className={styles.input}
                      aria-label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.formActions}>
                  <label className={styles.checkboxWrapper}>
                    <div className={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkboxLabel}>Remember me</span>
                    </div>
                  </label>
                  <Link to="/forgetpassword" className={styles.forgotPassword}>
                    Forgot Password?
                  </Link>
                </div>
                <button type="submit" className={styles.loginButton}>
                  Login
                </button>
              </form>
              <p className={styles.signupText}>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
