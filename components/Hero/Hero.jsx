"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import styles from "./Hero.module.css";
import useTypewriter from "@/hooks/useTypewriter";
import MagneticButton from "@/components/MagneticButton/MagneticButton";
import { FlipWords } from "@/components/TextEffects/TextEffects";

const stats = [
  { label: "Years Active", target: 3, suffix: "" },
  { label: "Members", target: 23, suffix: "+" },
  { label: "Projects Shipped", target: 14, suffix: "+" },
  { label: "Ideas Left", target: null, value: "∞" },
];

function CountUp({ target, suffix }) {
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
    <span ref={ref} className={styles.statNum}>
      {target ? `${count}${suffix}` : "∞"}
    </span>
  );
}

export default function Hero() {
  const [text, setText] = useState("");
  const scrollRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const fullText = "Club Ennovate · Est. 2022";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      if (container.scrollLeft > 50) setShowScrollHint(false);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.heroScroller} ref={scrollRef}>
      {/* Panel 1 — Hero Content */}
      <section className={`${styles.hero} ${styles.panel}`}>
        {/* Ghost Watermark */}
        <div className={styles.ghost}>03</div>

        {/* Hero Content */}
        <div className={styles.content}>
          <p className={styles.eyebrow}>{text}<span className={styles.cursor}>|</span></p>

          <h1 className={styles.title}>
            <div className={styles.line}>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                WE.
              </motion.span>
            </div>
            <div className={styles.line}>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                BUILD.
              </motion.span>
            </div>
            <div className={styles.line}>
              <motion.span
                className={styles.outline}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                REAL.
              </motion.span>
            </div>
          </h1>

          <motion.div
            className={styles.sub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Three years of shipping things that actually matter —<br />
            robots, embedded systems, and software built at PESCE Mandya.
          </motion.div>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <Link href="#about" className={`${styles.btn} ${styles.btnOutline}`}>
              [ What We Do ]
            </Link>
            <Link href="/join">
              <MagneticButton>
                <span className={`${styles.btn} ${styles.btnFilled}`}>
                  [ Join the Club ]
                </span>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Right Indicator */}
        <motion.div
          className={styles.scrollRight}
          initial={{ opacity: 0 }}
          animate={{ opacity: showScrollHint ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <span>→ Scroll for numbers</span>
          <div className={styles.scrollRightLine} />
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          className={styles.scroll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <div className={styles.scrollLine}></div>
          <span>↓ Scroll</span>
        </motion.div>
      </section>

      {/* Panel 2 — Stats Numbers */}
      <section className={`${styles.statsPanel} ${styles.panel}`}>
        <div className={styles.statsContent}>
          <motion.h2
            className={styles.statsTitle}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            BY THE NUMBERS
          </motion.h2>
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className={styles.statItem}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <CountUp target={stat.target} suffix={stat.suffix || ""} />
                <span className={styles.statLabel}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
          <div className={styles.statsBackHint}>
            <span>← Back to hero</span>
          </div>
        </div>
      </section>
    </div>
  );
}
