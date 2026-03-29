"use client";

import { motion } from "framer-motion";
import styles from "./ComingSoon.module.css";
import { useTerminalMode } from "@/hooks/useTerminalMode";

const SNARKY_QUOTES = [
  "We were going to put a drone companion here that follows you around the page... but it flew away during testing.",
  "This section is under construction. Like most of our robots at 3 AM before a competition.",
  "Our drone mascot is currently lost somewhere in /dev/null. We'll find it eventually.",
  "Feature coming soon™ — that's engineering-speak for 'we have finals next week.'",
  "The interactive drone got tired of following people and unionized. We're negotiating.",
];

export default function ComingSoon() {
  const { isTerminalMode } = useTerminalMode();
  // Pick a stable quote based on the day
  const quoteIndex = new Date().getDate() % SNARKY_QUOTES.length;
  const quote = SNARKY_QUOTES[quoteIndex];

  return (
    <section className={`${styles.comingSoon} ${isTerminalMode ? styles.terminal : ""}`} id="drone">
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.droneASCII}>
          <pre className={styles.ascii}>{`
     ___       ___
    /   \\─────/   \\
    \\___/ ┌─┐ \\___/
          │◉│
    ___   └─┘   ___
   /   \\─────/   \\
   \\___/     \\___/
          `}</pre>
          <div className={styles.shadow} />
        </div>

        <h3 className={styles.title}>
          {isTerminalMode ? "// 404_DRONE_NOT_FOUND" : "// Drone Companion — Coming Soon"}
        </h3>

        <p className={styles.quote}>{`"${quote}"`}</p>

        <div className={styles.statusBar}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>
            {isTerminalMode
              ? "STATUS: PROCRASTINATING"
              : "Status: Actively procrastinating"}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
