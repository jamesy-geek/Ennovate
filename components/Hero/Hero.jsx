"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Hero.module.css";
import { useTerminalMode } from "@/hooks/useTerminalMode";
import useTypewriter from "@/hooks/useTypewriter";
import RobotEye from "@/components/RobotEye/RobotEye";
import MagneticButton from "@/components/MagneticButton/MagneticButton";

export default function Hero() {
  const { isTerminalMode } = useTerminalMode();
  const [text, setText] = useState("");
  const fullText = isTerminalMode ? "CLUB_ENNOVATE // EST_2022" : "Club Ennovate · Est. 2022";

  const subText = "Robots, code, and real-world problems. Three years of building things that actually matter.";
  const { displayText: typedSub } = useTypewriter(subText, { enabled: isTerminalMode, speed: 20 });

  // Typewriter effect (Original)
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section className={`${styles.hero} ${isTerminalMode ? styles.terminal : ""}`}>
      {/* Ghost Watermark */}
      <div className={styles.ghost}>{isTerminalMode ? "0x03" : "03"}</div>

      {/* Hero Content */}
      <div className={styles.content}>
        <p className={styles.eyebrow}>{text}<span className={styles.cursor}>{isTerminalMode ? "_" : "|"}</span></p>

        <h1 className={`${styles.title} ${isTerminalMode ? 'glitch glow' : ''}`}>
          {isTerminalMode ? (
            <div className={styles.line}>WE_BUILD_REAL</div>
          ) : (
            <>
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
            </>
          )}
        </h1>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          {isTerminalMode ? typedSub : (
            <>
              Robots, code, and real-world problems.<br />
              Three years of building things that actually matter.
            </>
          )}
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <Link href="#about" className={`${styles.btn} ${styles.btnOutline}`}>
            {isTerminalMode ? "[ WHAT_WE_DO ]" : "[ What We Do ]"}
          </Link>
          <Link href="/join">
            <MagneticButton>
              <span className={`${styles.btn} ${styles.btnFilled}`}>
                {isTerminalMode ? "[ JOIN_THE_CLUB ]" : "[ Join the Club ]"}
              </span>
            </MagneticButton>
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
        <span>{isTerminalMode ? "↓ SCROLL_INIT" : "↓ Scroll"}</span>
      </motion.div>
    </section>
  );
}
