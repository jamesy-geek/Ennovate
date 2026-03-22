"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./EyeSection.module.css";

export default function EyeSection() {
  const containerRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config for a "fleshy", weighted eye feel
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const pupilX = useSpring(mouseX, springConfig);
  const pupilY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const handleMouseMove = (e) => {
      if (isTouch) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      // Even smaller radius for maximum subtlety
      const distance = Math.min(Math.sqrt(dx * dx + dy * dy), rect.width * 0.06);

      mouseX.set(Math.cos(angle) * distance);
      mouseY.set(Math.sin(angle) * distance);
    };

    if (!isTouch) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      // Gentle random drift on touch
      const interval = setInterval(() => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 10;
        mouseX.set(Math.cos(angle) * distance);
        mouseY.set(Math.sin(angle) * distance);
      }, 3000);
      return () => clearInterval(interval);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouch, mouseX, mouseY]);

  return (
    <section className={styles.eyeSection}>
      <div className={styles.eyeContainer} ref={containerRef}>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.iris}>
          <motion.div 
            className={styles.pupil} 
            style={{ x: pupilX, y: pupilY }}
          ></motion.div>
          {/* Camera shutter overlay */}
          <div className={styles.shutter}>
            <div className={styles.blade}></div>
            <div className={styles.blade}></div>
            <div className={styles.blade}></div>
            <div className={styles.blade}></div>
            <div className={styles.blade}></div>
            <div className={styles.blade}></div>
            <div className={styles.blade}></div>
          </div>
        </div>
        <span className={styles.label}>[ INTERACTIVE_EYE_04 ]</span>
      </div>
    </section>
  );
}
