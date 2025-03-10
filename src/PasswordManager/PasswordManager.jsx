"use client";
import React, { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa"; // Import icons from React Icons library
import styles from "./PasswordManager.module.css";

// Sample data for password entries
const passwordEntries = [
  {
    id: 1,
    accountType: "Gmail Account",
    email: "john.doe@gmail.com",
    password: "*****", // Add password field
    lastModified: "2 days ago",
  },
  {
    id: 2,
    accountType: "Gmail Account",
    email: "john.doe@gmail.com",
    password: "*****", // Add password field
    lastModified: "2 days ago",
  },
  {
    id: 3,
    accountType: "Gmail Account",
    email: "john.doe@gmail.com",
    password: "*****", // Add password field
    lastModified: "2 days ago",
  },
];

// Password Card Component
function PasswordCard({ accountType, email, password, lastModified }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAccountType, setEditedAccountType] = useState(accountType);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPassword, setEditedPassword] = useState(password);

  return (
    <article className={styles.card}>
      <div className={styles.cardContent}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedAccountType}
              onChange={(e) => setEditedAccountType(e.target.value)}
              className={styles.input}
            />
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              value={editedPassword}
              onChange={(e) => setEditedPassword(e.target.value)}
              className={styles.input}
            />
          </>
        ) : (
          <>
            <h2 className={styles.accountType}>{accountType}</h2>
            <p className={styles.email}>{email}</p>
            <p className={styles.password}>{password}</p>{" "}
            {/* Display password */}
            <p className={styles.lastModified}>Last modified: {lastModified}</p>
          </>
        )}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={() => setIsEditing(!isEditing)}
        >
          <FaEdit className={styles.editIcon} />
        </button>
        <button className={styles.actionButton}>
          <FaEye className={styles.viewIcon} />
        </button>
      </div>
    </article>
  );
}

// Password Grid Component
function PasswordGrid({ passwordEntries }) {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        {passwordEntries.map((entry) => (
          <div key={entry.id} className={styles.column}>
            <PasswordCard {...entry} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Password Header Component
function PasswordHeader() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>My Passwords</h1>
      <button className={styles.addButton}>+ Add New</button>
    </header>
  );
}

// Main Dashboard Component
function Dashboard() {
  return (
    <section className={styles.passwordManager}>
      <div className={styles.container}>
        <PasswordHeader />
        <PasswordGrid passwordEntries={passwordEntries} />
      </div>
    </section>
  );
}

export default Dashboard;
