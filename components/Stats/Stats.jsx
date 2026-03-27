"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./Stats.module.css";
import { useTerminalMode } from "@/hooks/useTerminalMode";

const stats = [
  { label: "Years Active", target: 3, suffix: "+" },
  { label: "Members", target: 20, suffix: "+" },
  { label: "Projects Shipped", target: 10, suffix: "+" },
  { label: "Ideas Left", target: null, value: "∞" },
];

function CountUp({ target, suffix, isTerminal }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && target) {
      let start = 0;
      const duration = 1500;
      const increment = target / (duration / 30);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className={`${styles.statNum} ${isTerminal ? 'glow' : ''}`}>
      {target ? `${count}${suffix}` : (isTerminal ? "INF" : "∞")}
    </span>
  );
}

export default function Stats() {
  const { isTerminalMode } = useTerminalMode();

  return (
    <motion.div
      className={`${styles.stats} ${isTerminalMode ? styles.terminal : ""}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {stats.map((stat, i) => (
        <div key={i} className={styles.statItem}>
          <CountUp target={stat.target} suffix={stat.suffix || ""} isTerminal={isTerminalMode} />
          <span className={styles.statLabel}>
            {isTerminalMode ? stat.label.replace(/\s+/g, '_').toUpperCase() : stat.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
