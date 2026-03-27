"use client";

import { motion } from "framer-motion";
import styles from "./Challenges.module.css";
import { useTerminalMode } from "@/hooks/useTerminalMode";

const challenges = [
  {
    id: 1,
    featured: true,
    status: "Active Build",
    name: "TechTatva 2026 — Flagship Competition",
    desc: "Our flagship entry: a high-performance robot designed for the annual TechTatva competition. Judged on speed, efficiency, and real-world application.",
    tags: ["Robotics", "AI", "Fabrication"],
    meta: [
      { key: "Competition", val: "TechTatva 2026" },
      { key: "Category", val: "Flagship Robotics" },
      { key: "Status", val: "In Progress" },
    ],
    progress: 65,
  },
];

function ProgressASCII({ percent }) {
  const bars = Math.round((percent / 100) * 20);
  const empty = 20 - bars;
  const barStr = "#".repeat(bars) + "_".repeat(empty);
  return <code className={styles.asciiBar}>[{barStr}] {percent}%</code>;
}

export default function Challenges() {
  const { isTerminalMode } = useTerminalMode();

  return (
    <section className={`${styles.challenges} ${isTerminalMode ? styles.terminal : ""}`} id="challenges">
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={`${styles.title} ${isTerminalMode ? 'glow' : ''}`}>
          {isTerminalMode ? "TARGET_IDENTIFIED" : "UPCOMING CHALLENGES"}
        </h2>
        <span className={isTerminalMode ? styles.command : styles.subLabel}>
          {isTerminalMode ? "grep -r 'BUILD' /projects" : "// where we compete next"}
        </span>
      </motion.div>

      <div className={styles.grid}>
        {challenges.map((card) => (
          <motion.div
            key={card.id}
            className={`${styles.card} ${card.featured ? styles.featured : ""} ${isTerminalMode ? styles.terminalCard : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.topBar}></div>
            <div className={styles.status}>
              {!isTerminalMode && <span className={card.status === "Active Build" ? styles.dotLive : styles.dotUpcoming}></span>}
              {isTerminalMode ? `STATUS_${card.status.replace(/\s+/g, '_').toUpperCase()}` : card.status}
            </div>
            <h3 className={styles.name}>{isTerminalMode ? card.name.toUpperCase() : card.name}</h3>
            <p className={styles.desc}>{card.desc}</p>
            <div className={styles.tags}>
              {card.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{isTerminalMode ? tag.toUpperCase() : tag}</span>
              ))}
            </div>

            {/* Progress pill or ASCII bar */}
            {card.featured && card.progress && (
              <div className={styles.progressContainer}>
                <div className={styles.progressHeader}>
                  <span>BUILD_PROGRESS</span>
                  {!isTerminalMode && <span>{card.progress}%</span>}
                </div>
                {isTerminalMode ? (
                  <ProgressASCII percent={card.progress} />
                ) : (
                  <div className={styles.progressBar}>
                    <motion.div
                      className={styles.progressFill}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${card.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    />
                  </div>
                )}
              </div>
            )}

            <div className={styles.meta}>
              {card.meta.map((item, i) => (
                <div key={i} className={styles.metaRow}>
                  <span>{isTerminalMode ? item.key.toUpperCase() : item.key}</span>
                  <span className={styles.metaVal}>{isTerminalMode ? item.val.replace(/ /g, '_').toUpperCase() : item.val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
