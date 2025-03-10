import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <i className={styles.lockIcon} />
        <h1 className={styles.logoText}>SecureVault</h1>
      </div>
      <button className={styles.signOut}>Sign Out</button>
    </header>
  );
}

export default Header;
