import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.left}>
        Club Ennovate · Est. 2022 · Innovation for Living. And Fun.
      </p>
      <ul className={styles.links}>
        <li><a href="#" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        <li><a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href="#" target="_blank" rel="noopener noreferrer">GitHub</a></li>
      </ul>
    </footer>
  );
}
