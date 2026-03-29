"use client";

import styles from "./SectionDivider.module.css";
import { motion } from "framer-motion";

export default function SectionDivider({ number, label }) {
  return (
    <motion.div
      className={styles.divider}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.line} />
      <div className={styles.meta}>
        <span className={styles.number}>[ {number} ]</span>
        {label && <span className={styles.label}>{label}</span>}
      </div>
      <div className={styles.line} />
    </motion.div>
  );
}
