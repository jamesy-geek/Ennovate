"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import styles from "./Achievements.module.css";
import { useTerminalMode } from "@/hooks/useTerminalMode";
import achievementsData from "@/data/achievements.json";

function AchievementCard({ achievement, index, isTerminal }) {
  return (
    <motion.div
      className={`${styles.card} ${isTerminal ? styles.terminalCard : ""}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -10, transition: { type: "spring", stiffness: 350, damping: 25 } }}
    >
      {/* Glow effect */}
      <div className={styles.cardGlow} />

      {/* Image */}
      <div className={styles.cardImageWrap}>
        <Image
          src={achievement.image}
          alt={achievement.title}
          fill
          sizes="400px"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.cardImageOverlay} />
        <span className={styles.cardYear}>{achievement.year}</span>
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        <span className={styles.cardCategory}>
          {isTerminal ? achievement.category.toUpperCase() : achievement.category}
        </span>
        <h3 className={styles.cardTitle}>
          {isTerminal ? achievement.title.toUpperCase() : achievement.title}
        </h3>
        <p className={styles.cardDesc}>{achievement.description}</p>
      </div>

      {/* Edge highlight */}
      <div className={styles.cardEdge} />
    </motion.div>
  );
}

export default function Achievements() {
  const { isTerminalMode } = useTerminalMode();
  const scrollContainerRef = useRef(null);

  return (
    <section
      className={`${styles.achievements} ${isTerminalMode ? styles.terminal : ""}`}
      id="achievements"
    >
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.headerLeft}>
          <h2 className={`${styles.title} ${isTerminalMode ? "glow" : ""}`}>
            {isTerminalMode ? "TROPHY_CASE" : "ACHIEVEMENTS"}
          </h2>
          <span className={isTerminalMode ? styles.command : styles.subLabel}>
            {isTerminalMode ? "cat /var/log/wins.log" : "// milestones & victories"}
          </span>
        </div>
        <div className={styles.scrollHint}>
          <span>{isTerminalMode ? "← DRAG →" : "← scroll →"}</span>
        </div>
      </motion.div>

      {/* Horizontal scroll strip */}
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        <div className={styles.scrollTrack}>
          {achievementsData.map((achievement, i) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={i}
              isTerminal={isTerminalMode}
            />
          ))}
          {/* Spacer at end */}
          <div className={styles.scrollSpacer} />
        </div>
      </div>

      {/* Shelf accent line */}
      <div className={styles.shelfLine} />
    </section>
  );
}
