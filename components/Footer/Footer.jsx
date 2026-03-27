"use client";

import { useState } from "react";
import { useTerminalMode } from "@/hooks/useTerminalMode";
import styles from "./Footer.module.css";

export default function Footer() {
  const { isTerminalMode } = useTerminalMode();
  const [count, setCount] = useState(0);

  const handleTap = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (newCount >= 5) {
      window.dispatchEvent(new CustomEvent("trigger-egg", { detail: { eggId: "TERMINAL" } }));
      setCount(0);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <p className={styles.left} onClick={handleTap}>
          {isTerminalMode 
            ? "CLUB_ENNOVATE // EST_2022 // INNOVATION_AND_FUN" 
            : "Club Ennovate · Est. 2022 · Innovation for Living. And Fun."}
        </p>
        <span className={styles.hint}>
          {isTerminalMode 
            ? "// TAP_5X_FOR_CONSOLE" 
            : "// TAP 5X FOR CONSOLE"}
        </span>
      </div>
      <ul className={styles.links}>
        <li><a href="#" target="_blank" rel="noopener noreferrer">{isTerminalMode ? "INSTAGRAM" : "Instagram"}</a></li>
        <li><a href="#" target="_blank" rel="noopener noreferrer">{isTerminalMode ? "LINKEDIN" : "LinkedIn"}</a></li>
        <li><a href="#" target="_blank" rel="noopener noreferrer">{isTerminalMode ? "GITHUB" : "GitHub"}</a></li>
      </ul>
    </footer>
  );
}
