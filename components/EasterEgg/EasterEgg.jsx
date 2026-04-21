"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./EasterEgg.module.css";


export default function EasterEggManager() {
  const [activeEgg, setActiveEgg] = useState(null);
  const [inputSequence, setInputSequence] = useState("");

  const triggerEgg = useCallback((eggId) => {
    setActiveEgg(eggId);
  }, []);

  // Listen for keyboard triggers
  useEffect(() => {
    const handleKeyDown = (e) => {
      const newSeq = (inputSequence + e.key.toLowerCase()).slice(-20);
      setInputSequence(newSeq);
      
      // Removed terminal/matrix keyboard triggers
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputSequence, triggerEgg]);

  // Listen for custom events
  useEffect(() => {
    const handleCustomEgg = (e) => triggerEgg(e.detail.eggId);
    window.addEventListener("trigger-egg", handleCustomEgg);
    return () => window.removeEventListener("trigger-egg", handleCustomEgg);
  }, [triggerEgg]);

  return (
    <>
      <AnimatePresence>


        {activeEgg === "BLUEPRINT" && (
          <motion.div 
            className={styles.blueprintOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveEgg(null)}
          >
            <div className={styles.blueprintContent}>
              <svg viewBox="0 0 800 500" className={styles.schematic}>
                {/* Background Grid */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,180,255,0.15)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Main Circular Assembly */}
                <circle cx="400" cy="250" r="180" fill="none" stroke="rgba(0,255,255,0.4)" strokeWidth="1" strokeDasharray="10,5" />
                <circle cx="400" cy="250" r="120" fill="none" stroke="rgba(0,255,255,0.7)" strokeWidth="2" />
                
                {/* Gear 1 (Top Left) */}
                <g transform="translate(250, 150) rotate(15)">
                  <circle r="40" fill="none" stroke="cyan" strokeWidth="1.5" />
                  {[...Array(12)].map((_, i) => (
                    <rect key={i} x="-5" y="-48" width="10" height="10" fill="cyan" transform={`rotate(${i * 30})`} />
                  ))}
                  <circle r="10" fill="none" stroke="cyan" strokeWidth="1" />
                </g>

                {/* Gear 2 (Center) */}
                <g transform="translate(400, 250)">
                  <circle r="60" fill="none" stroke="cyan" strokeWidth="2" />
                  {[...Array(18)].map((_, i) => (
                    <rect key={i} x="-6" y="-70" width="12" height="15" fill="cyan" transform={`rotate(${i * 20})`} />
                  ))}
                  <path d="M-30,-30 L30,30 M-30,30 L30,-30" stroke="rgba(0,255,255,0.5)" strokeWidth="1" />
                </g>

                {/* Dimension Lines */}
                <g stroke="rgba(0,255,255,0.6)" strokeWidth="1">
                  <line x1="400" y1="50" x2="400" y2="100" />
                  <line x1="220" y1="250" x2="280" y2="250" />
                  <path d="M400,60 L580,60 M400,60 L410,55 M400,60 L410,65" fill="none" />
                </g>
                <text x="590" y="65" fill="cyan" fontSize="12" fontFamily="monospace">Ø 360.00mm REF</text>
                <text x="590" y="85" fill="cyan" fontSize="10" fontFamily="monospace">TOLERANCE: +/- 0.05</text>

                {/* Title Block */}
                <rect x="550" y="380" width="220" height="100" fill="none" stroke="cyan" strokeWidth="1" />
                <line x1="550" y1="410" x2="770" y2="410" stroke="cyan" />
                <line x1="550" y1="440" x2="770" y2="440" stroke="cyan" />
                <text x="560" y="402" fill="cyan" fontSize="10" fontWeight="bold">PROJECT: ENN_ROBOT_EYE_V4</text>
                <text x="560" y="430" fill="cyan" fontSize="9">DWG NO: 772-B | REV: 03</text>
                <text x="560" y="465" fill="cyan" fontSize="9">DESIGNER: [ STUDENT_01 ]</text>
                <text x="560" y="490" fill="cyan" fontSize="8" opacity="0.6">© 2022-2026 ENNOVATE INDUSTRIES</text>

                {/* Hatching area */}
                <defs>
                  <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(0,255,255,0.3)" strokeWidth="1" />
                  </pattern>
                </defs>
                <path d="M100,400 L200,400 L150,450 Z" fill="url(#hatch)" stroke="cyan" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Persistent global effects */}
      <style jsx global>{`
        ${activeEgg === "GRAVITY" ? `
          body * {
            transition: transform 10s ease-in !important;
            transform: translateY(-200vh) rotate(${Math.random() * 20 - 10}deg) !important;
          }
        ` : ""}
      `}</style>
    </>
  );
}
