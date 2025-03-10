import * as React from "react";
import styles from "./Navigation.module.css";

function Container8() {
  return (
    <nav className={styles.container8}>
      <a href="#" className={styles.div}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/650702527f724ba2af670e4c6758e924/053c9d55aa522266d767c703d82800a8d99a95586044592a1988f863b4e6b8b3?placeholderIfAbsent=true"
          alt="All Passwords icon"
          className={styles.img}
        />
        <span className={styles.allPasswords}>All Passwords</span>
      </a>
      <a href="#" className={styles.div2}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/650702527f724ba2af670e4c6758e924/34f26e49968ab0bc821732f2bd7476d9862ca0678253d9ba63dd24261ba43404?placeholderIfAbsent=true"
          alt="Profile icon"
          className={styles.img2}
        />
        <span className={styles.profile}>Profile</span>
      </a>
    </nav>
  );
}

export default Container8;
