"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <p className={styles.left}>
          Club Ennovate · Est. 2022 · Innovation for Living. And Fun.
        </p>
      </div>
      <ul className={styles.links}>
        <li><a href="https://instagram.com/club_ennovate" target="_blank" rel="noopener noreferrer">
          Instagram
        </a></li>
        <li><a href="https://linkedin.com/company/club-ennovate" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a></li>
        <li><a href="https://github.com/club-ennovate" target="_blank" rel="noopener noreferrer">
          GitHub
        </a></li>
      </ul>
    </footer>
  );
}
