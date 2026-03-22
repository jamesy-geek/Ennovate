"use client";

import { motion } from "framer-motion";
import styles from "./Challenges.module.css";

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

export default function Challenges() {
  return (
    <section className={styles.challenges} id="challenges">
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>UPCOMING CHALLENGES</h2>
        <span className={styles.subLabel}>// where we compete next</span>
      </motion.div>

      <div className={styles.grid}>
        {challenges.map((card) => (
          <motion.div
            key={card.id}
            className={`${styles.card} ${card.featured ? styles.featured : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.topBar}></div>
            <div className={styles.status}>
              <span className={card.status === "Active Build" ? styles.dotLive : styles.dotUpcoming}></span>
              {card.status}
            </div>
            <h3 className={styles.name}>{card.name}</h3>
            <p className={styles.desc}>{card.desc}</p>
            <div className={styles.tags}>
              {card.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            {/* Addition D: Progress pill for featured card */}
            {card.featured && card.progress && (
              <div className={styles.progressContainer}>
                <div className={styles.progressHeader}>
                  <span>BUILD PROGRESS</span>
                  <span>{card.progress}%</span>
                </div>
                <div className={styles.progressBar}>
                  <motion.div
                    className={styles.progressFill}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${card.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            <div className={styles.meta}>
              {card.meta.map((item, i) => (
                <div key={i} className={styles.metaRow}>
                  <span>{item.key}</span>
                  <span className={styles.metaVal}>{item.val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
