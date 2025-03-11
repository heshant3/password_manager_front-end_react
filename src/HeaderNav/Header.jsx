"use client";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import styles from "./Header.module.css";

function Header({ showSearch }) {
  return (
    <header className={styles.header}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6b60a69bcea55c96cfb04324960782e7ef6c2f36"
        alt="SecureVault Logo"
        className={styles.logo}
      />
      {showSearch && (
        <div className={styles.searchContainer}>
          <div className={styles.searchIconWrapper}>
            <CiSearch className={styles.searchIcon} />
          </div>
          <input
            type="text"
            placeholder="Search passwords."
            className={styles.searchInput}
            aria-label="Search passwords"
          />
        </div>
      )}
      <FaUserCircle className={styles.profileImage} />
    </header>
  );
}

export default Header;
