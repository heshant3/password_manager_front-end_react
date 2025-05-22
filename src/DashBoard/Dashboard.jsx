import * as React from "react";
import styles from "./Dashboard.module.css";
import PasswordGrid from "../PasswordManager/PasswordManager";
import Profile from "../ProfilePage/Profile";
import { IoKeySharp } from "react-icons/io5";
import { TbUserFilled } from "react-icons/tb";
import Header from "../HeaderNav/Header";

function Container8() {
  const [activeTab, setActiveTab] = React.useState("passwords");
  const [passwordEntries, setPasswordEntries] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  const handleUpdate = (_id, updatedEntry) => {
    const updatedEntries = passwordEntries.map((entry) =>
      entry._id === _id ? { ...entry, ...updatedEntry } : entry
    );
    setPasswordEntries(updatedEntries);
  };

  const handleDelete = (_id) => {
    const updatedEntries = passwordEntries.filter((entry) => entry._id !== _id);
    setPasswordEntries(updatedEntries);
  };

  return (
    <div>
      <Header showSearch={activeTab === "passwords"} onSearch={setSearchText} />
      <div className={styles.dashboard}>
        <nav className={styles.container8}>
          <button
            className={`${styles.div} ${
              activeTab === "passwords" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("passwords")}
          >
            <IoKeySharp className={styles.icon} />
            <span className={styles.allPasswords}>All Passwords</span>
          </button>
          <button
            className={`${styles.div2} ${
              activeTab === "profile" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <TbUserFilled className={styles.icon} />
            <span className={styles.profile}>Profile</span>
          </button>
        </nav>
        <div className={styles.content}>
          {activeTab === "passwords" && (
            <PasswordGrid
              passwordEntries={passwordEntries}
              onSave={handleUpdate}
              onDelete={handleDelete}
              searchText={searchText}
            />
          )}
          {activeTab === "profile" && <Profile />}
        </div>
      </div>
    </div>
  );
}

export default Container8;
