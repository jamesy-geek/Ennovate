"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./CTA.module.css";
import { useTerminalMode } from "@/hooks/useTerminalMode";

const PARTICLE_WORDS = ["BUILD", "CODE", "SHIP", "HACK", "SOLVE", "PUSH", "TEST"];

export default function CTA() {
  const { isTerminalMode } = useTerminalMode();
  const btnRef = useRef(null);
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Generate stable random initial positions for particles
  const particles = useRef([...Array(15)].map((_, i) => ({
    id: i,
    word: PARTICLE_WORDS[i % PARTICLE_WORDS.length],
    initialX: Math.random() * 100 - 50,
    initialY: Math.random() * 100 - 50,
  })));

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const { clientX, clientY } = e;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (clientX - centerX) * 0.35;
    const y = (clientY - centerY) * 0.35;
    setPosition({ x, y });
    setMousePos({ x: clientX, y: clientY });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section className={`${styles.ctaSection} ${isTerminalMode ? 'terminal-mode' : ''}`} id="join" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className={`${styles.bgText} ${isTerminalMode ? 'glow' : ''}`}>BUILD</div>
      
      {/* Gravity Particles */}
      <div className={styles.particles}>
        {particles.current.map((p) => {
          return (
            <motion.span
              key={p.id}
              className={styles.particle}
              animate={{ 
                x: [p.initialX + "vw", (p.initialX + position.x * 0.1) + "vw"],
                y: [p.initialY + "vh", (p.initialY + position.y * 0.1) + "vh"],
                opacity: isTerminalMode ? [0.05, 0.15, 0.05] : [0.1, 0.3, 0.1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {isTerminalMode ? p.word : p.word.toLowerCase()}
            </motion.span>
          );
        })}
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className={styles.eyebrow}>
          {isTerminalMode ? "// ACCESS_GRANTED // APP_OPEN" : "// Applications open"}
        </p>
        <h2 className={`${styles.title} ${isTerminalMode ? 'glow' : ''}`}>
          {isTerminalMode ? "READY_TO_BUILD?" : "READY TO BUILD SOMETHING REAL?"}
        </h2>
        
        <Link href="/join" className={styles.linkWrapper}>
          <motion.div
            ref={btnRef}
            className={`${styles.btn} ${isTerminalMode ? 'glow' : ''}`}
            onMouseLeave={resetPosition}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          >
            {isTerminalMode ? "[ APPLY_TO_ENNOVATE ]" : "[ Apply to Ennovate ]"}
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
