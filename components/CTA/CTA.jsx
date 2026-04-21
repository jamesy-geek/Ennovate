"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./CTA.module.css";

export default function CTA() {
  const btnRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (clientX - centerX) * 0.35;
    const y = (clientY - centerY) * 0.35;
    setPosition({ x, y });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section className={styles.ctaSection} id="join">
      <div className={styles.bgText}>BUILD</div>
      
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className={styles.eyebrow}>
          {"// Applications open"}
        </p>
        <h2 className={styles.title}>
          {"READY TO BUILD SOMETHING REAL?"}
        </h2>
        
        <Link href="/join" className={styles.linkWrapper} onMouseMove={handleMouseMove}>
          <motion.div
            ref={btnRef}
            className={styles.btn}
            onMouseLeave={resetPosition}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          >
            {"[ Apply to Ennovate ]"}
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
