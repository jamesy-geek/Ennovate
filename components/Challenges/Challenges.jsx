"use client";

import { motion } from "framer-motion";
import styles from "./Challenges.module.css";

const challenges = [
  {
    id: 1,
    featured: true,
    status: "Active Build",
    name: "TEKNOFEST 2026 — Humanoid Robot Competition",
    desc: "Our flagship entry: a full-scale InMoov-based humanoid with custom inverse kinematics, AI face recognition, and real-time conversation. Nine-person team. Fabricated entirely in-house.",
    tags: ["Robotics", "AI", "Fabrication", "InMoov"],
    meta: [
      { key: "Competition", val: "TEKNOFEST 2026" },
      { key: "Category", val: "Humanoid Robotics" },
      { key: "Status", val: "In Progress" },
    ],
    progress: 65, // Addition D
  },
  {
    id: 2,
    status: "Upcoming",
    name: "Smart India Hackathon",
    desc: "National-level 36-hour hackathon targeting government problem statements in infrastructure and public service.",
    tags: ["Software", "Hackathon"],
    meta: [
      { key: "Format", val: "36 Hours" },
      { key: "Status", val: "Preparing" },
    ],
  },
  {
    id: 3,
    status: "Upcoming",
    name: "Internal Build Sprint",
    desc: "Club-internal 48-hour build challenge. Any tech, any problem. Judged on novelty and execution.",
    tags: ["Open", "Hardware + Software"],
    meta: [
      { key: "Format", val: "48 Hours" },
      { key: "Open to", val: "All Members" },
    ],
  },
  {
    id: 4,
    status: "Scouting",
    name: "Line Follower & Robowar",
    desc: "Classic robotics competitions to sharpen embedded systems and control theory skills at inter-college fests.",
    tags: ["Embedded", "Control Systems"],
    meta: [
      { key: "Category", val: "Competitive Robotics" },
    ],
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
