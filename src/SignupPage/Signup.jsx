import React from "react";
import styles from "./Signup.module.css";

function SignupPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <>
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
              <input type="text" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <input type="email" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <input type="password" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Confirm Password</label>
              <input type="password" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date of Birth</label>
              <input type="date" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Address</label>
              <input type="text" className={styles.formInput} />
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
