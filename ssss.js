"use client";
import React, { useState, useEffect } from "react";
import { TbEdit, TbEditOff } from "react-icons/tb"; // Import icons from React Icons library
import styles from "./PasswordManager.module.css";
import { MdOutlineDelete } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc"; // Import save icon
import axios from "axios"; // Import axios for API calls

// Password Card Component
function PasswordCard({
  _id,
  accountType,
  email,
  password,
  lastModified,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAccountType, setEditedAccountType] = useState(accountType);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedPassword, setEditedPassword] = useState(password);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/account/updateById/${_id}`,
        {
          accountType: editedAccountType,
          email: editedEmail,
          password: editedPassword,
        }
      );
      if (response.status === 200) {
        onUpdate(_id, {
          ...response.data,
          lastModified: new Date().toISOString(),
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

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
            <p className={styles.password}>{password}</p>
            <p className={styles.lastModified}>Last modified: {lastModified}</p>
          </>
        )}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <TbEditOff size={17} className={styles.editIcon} />
          ) : (
            <TbEdit size={17} className={styles.editIcon} />
          )}
        </button>
        <button
          className={styles.actionButton}
          onClick={isEditing ? handleSave : null}
        >
          {isEditing ? (
            <VscSaveAs size={17} className={styles.viewIcon} />
          ) : (
            <MdOutlineDelete size={17} className={styles.viewIcon} />
          )}
        </button>
      </div>
    </article>
  );
}

// Password Grid Component
function PasswordGrid({ passwordEntries, onUpdate }) {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        {passwordEntries.map((entry) => (
          <div key={entry._id} className={styles.column}>
            <PasswordCard {...entry} onUpdate={onUpdate} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Password Header Component
function PasswordHeader({ onAddNew }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>My Passwords</h1>
      <button className={styles.addButton} onClick={onAddNew}>
        + Add New
      </button>
    </header>
  );
}

// Modal Component
function Modal({ isOpen, onClose, onSave }) {
  const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ accountType, email, password });
    setAccountType("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Add New Password</h2>
        <input
          type="text"
          placeholder="Account Type"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwordEntries, setPasswordEntries] = useState([]);

  useEffect(() => {
    const fetchPasswordEntries = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/account/data/${userId}`
          );
          setPasswordEntries(response.data);
        } catch (error) {
          console.error("Error fetching password entries:", error);
        }
      }
    };

    fetchPasswordEntries();
  }, []);

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (newEntry) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/account/create",
          {
            ...newEntry,
            userId,
          }
        );
        if (response.status === 201) {
          setPasswordEntries((prevEntries) => [...prevEntries, response.data]);
        }
      } catch (error) {
        console.error("Error saving new entry:", error);
      }
    }
    setIsModalOpen(false);
  };

  const handleUpdate = (id, updatedEntry) => {
    setPasswordEntries(
      passwordEntries.map((entry) => (entry._id === id ? updatedEntry : entry))
    );
  };

  return (
    <section className={styles.passwordManager}>
      <div className={styles.container}>
        <PasswordHeader onAddNew={handleAddNew} />
        <PasswordGrid
          passwordEntries={passwordEntries}
          onUpdate={handleUpdate}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </section>
  );
}

export default Dashboard;
