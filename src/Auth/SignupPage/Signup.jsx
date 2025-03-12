import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { signup } from "../../Api/Api";
import { Toaster, toast } from "sonner";

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword, dateOfBirth, address } =
      formData;

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !dateOfBirth ||
      !address
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await signup(formData);
      toast.success("Signup successful!");
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        address: "",
      });
      navigate("/login");
    } catch (err) {
      toast.error(`Signup failed! Error: ${err.message}`);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" visibleToasts={1} />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
        <section className={styles.leftPanel}>
          <h1 className={styles.title}>Secure Password Management</h1>
          <p className={styles.subtitle}>
            Keep all your passwords safe in one place
          </p>
        </section>
        <section className={styles.formPanel}>
          <h2 className={styles.formTitle}>Create Account</h2>
          <form className={styles.signupForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name</label>
              <input
                type="text"
                name="fullName"
                className={styles.formInput}
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input
                type="email"
                name="email"
                className={styles.formInput}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <input
                type="password"
                name="password"
                className={styles.formInput}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={styles.formInput}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                className={styles.formInput}
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Address</label>
              <input
                type="text"
                name="address"
                className={styles.formInput}
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles.signupButton}>
              Sign Up
            </button>
            <p className={styles.loginLink}>
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </section>
      </main>
    </>
  );
}

export default SignupPage;
