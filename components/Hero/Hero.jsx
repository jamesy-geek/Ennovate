"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import RobotEye from "@/components/RobotEye/RobotEye";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Club Ennovate · Est. 2022";

  // Typewriter effect (Approved Addition C)
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Ghost Watermark */}
      <div className={styles.ghost}>03</div>

      {/* Robot Eye */}
      <div className={styles.eyeWrap}>
        <RobotEye />
      </div>

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

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          Robots, code, and real-world problems.<br />
          Three years of building things that actually matter.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <Link href="#about" className={`${styles.btn} ${styles.btnOutline}`}>
            [ What We Do ]
          </Link>
          <Link href="/join" className={`${styles.btn} ${styles.btnFilled}`}>
            [ Join the Club ]
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
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
  );
}
