"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import styles from "./EyeSection.module.css";

export default function EyeSection() {
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(0);
  const [showMetadata, setShowMetadata] = useState(false);

  const handlePointerDown = () => {
    timerRef.current = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("trigger-egg", { detail: { eggId: "BLUEPRINT" } }));
    }, 3000);
  };

  const handlePointerUp = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config for a "fleshy", weighted eye feel
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const pupilX = useSpring(mouseX, springConfig);
  const pupilY = useSpring(mouseY, springConfig);

  const handlePointerInteraction = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), rect.width * 0.08);

    mouseX.set(Math.cos(angle) * distance);
    mouseY.set(Math.sin(angle) * distance);
    
    // Auto-blink occasionally during interaction
    if (Date.now() - lastInteraction > 2000 && Math.random() > 0.95) {
      triggerBlink();
    }
    setLastInteraction(Date.now());
  };

  const triggerBlink = () => {
    if (isBlinking) return;
    setIsBlinking(true);
    setShowMetadata(true);
    setTimeout(() => {
      setIsBlinking(false);
      // Keep metadata a bit longer
      setTimeout(() => setShowMetadata(false), 1200);
    }, 200);
  };

  return (
    <section 
      className={styles.eyeSection}
      onPointerMove={handlePointerInteraction}
    >
      <div 
        className={`${styles.eyeContainer} ${isBlinking ? styles.blinkActive : ""}`} 
        ref={containerRef}
        onClick={triggerBlink}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        
        <div className={styles.iris}>
          <motion.div 
            className={styles.pupil} 
            style={{ x: pupilX, y: pupilY }}
          ></motion.div>
          
          {/* Shutter overlay */}
          <div className={styles.shutter}>
            {[...Array(7)].map((_, i) => (
              <div key={i} className={styles.blade}></div>
            ))}
          </div>
        </div>

        <div className={styles.labelContainer}>
          <span className={styles.label}>[ INTERACTIVE_EYE_04 ]</span>
          
          <AnimatePresence>
            {showMetadata && (
              <>
                <motion.span 
                  className={styles.metaTag}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  style={{ top: '10%', right: '-40%' }}
                >
                  // COORD_VALIDATED
                </motion.span>
                <motion.span 
                  className={styles.metaTag}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  style={{ bottom: '15%', left: '-50%' }}
                >
                  // BIOMETRIC_SCAN
                </motion.span>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
