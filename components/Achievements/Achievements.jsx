"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import styles from "./Achievements.module.css";
import achievementsData from "@/data/achievements.json";

function AchievementCard({ achievement, isLeft, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.45"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [isLeft ? -30 : 30, 0]);

  const card = (
    <motion.div
      ref={ref}
      className={styles.card}
      style={{ opacity, x }}
    >
      {achievement.image && (
        <div className={styles.cardImage}>
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            sizes="380px"
            style={{ objectFit: "cover" }}
          />
          <div className={styles.cardImageOverlay} />
          <span className={styles.cardYear}>{achievement.year}</span>
        </div>
      )}
      <div className={styles.cardBody}>
        <span className={styles.cardCategory}>
          {achievement.category}
        </span>
        <h3 className={styles.cardTitle}>
          {achievement.title}
        </h3>
        <p className={styles.cardDesc}>{achievement.description}</p>
      </div>
    </motion.div>
  );

  return (
    <div className={styles.branch}>
      {/* Left slot */}
      {isLeft ? (
        <div className={styles.cardLeft}>{card}</div>
      ) : (
        <div className={styles.cardEmpty} />
      )}

      {/* Center — spine node */}
      <motion.div
        className={styles.nodeDot}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35, delay: 0.1 }}
      />

      {/* Right slot */}
      {!isLeft ? (
        <div className={styles.cardRight}>{card}</div>
      ) : (
        <div className={styles.cardEmpty} />
      )}
    </div>
  );
}

export default function Achievements() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className={styles.achievements}
      id="achievements"
    >
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>ACHIEVEMENTS</h2>
        <span className={styles.subLabel}>// engineering milestones & victories</span>
      </motion.div>

      {/* Timeline */}
      <div className={styles.timeline}>
        {/* Static spine track */}
        <div className={styles.spineTrack} />

        {/* Animated fill */}
        <motion.div className={styles.spineFill} style={{ height: spineHeight }} />

        {/* Achievement rows */}
        <div className={styles.nodesWrapper}>
          {achievementsData.map((achievement, i) => (
            <AchievementCard
              key={achievement.id}
              index={i}
              achievement={achievement}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
