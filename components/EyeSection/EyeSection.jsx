"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import styles from "./EyeSection.module.css";

const clubMembers = [
  { id: 'N', name: "Satvik", role: "President", targetAngle: -Math.PI/2 },
  { id: 'NE', name: "Aditya", role: "Vice President", targetAngle: -Math.PI/4 },
  { id: 'E', name: "Pragna", role: "Tech Lead", targetAngle: 0 },
];

export default function EyeSection() {
  const containerRef = useRef(null);
  const gazeTimerRef = useRef(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(0);
  const [activeMember, setActiveMember] = useState(null);

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
    const maxRadius = rect.width * 0.08;
    const rawDistance = Math.sqrt(dx * dx + dy * dy);
    const distance = Math.min(rawDistance, maxRadius);

    mouseX.set(Math.cos(angle) * distance);
    mouseY.set(Math.sin(angle) * distance);
    
    // Check if looking far enough to trigger a card
    if (rawDistance > rect.width * 0.6) {
      // Find closest angle
      let closestMember = null;
      let minDiff = Infinity;
      
      // normalize angle to 0 - 2PI for easier diff
      let normAngle = angle < 0 ? angle + 2*Math.PI : angle;
      
      clubMembers.forEach(m => {
        let mAngle = m.targetAngle < 0 ? m.targetAngle + 2*Math.PI : m.targetAngle;
        let diff = Math.min(Math.abs(normAngle - mAngle), 2*Math.PI - Math.abs(normAngle - mAngle));
        if (diff < minDiff) {
          minDiff = diff;
          closestMember = m;
        }
      });

      if (closestMember) {
        if (activeMember?.id !== closestMember.id) {
          setActiveMember(closestMember);
        }
        if (gazeTimerRef.current) clearTimeout(gazeTimerRef.current);
      } else {
        if (activeMember) setActiveMember(null);
      }
    } else {
      if (activeMember) setActiveMember(null);
    }

    // Auto-blink occasionally during interaction
    if (Date.now() - lastInteraction > 2000 && Math.random() > 0.95) {
      triggerBlink();
    }
    setLastInteraction(Date.now());
  };

  const triggerBlink = () => {
    if (isBlinking) return;
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
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
      >
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        
        <div className={styles.iris}>
          <motion.div 
            className={styles.pupil} 
            style={{ x: pupilX, y: pupilY }}
          ></motion.div>
          
          <div className={styles.shutter}>
            {[...Array(7)].map((_, i) => (
              <div key={i} className={styles.blade}></div>
            ))}
          </div>
        </div>

        {clubMembers.map(member => {
          const radiusPercent = 42; 
          const x = 50 + Math.cos(member.targetAngle) * radiusPercent;
          const y = 50 + Math.sin(member.targetAngle) * radiusPercent;
          const isActive = activeMember?.id === member.id;
          
          return (
            <div 
              key={member.id}
              className={`${styles.fixedMember} ${isActive ? styles.fixedMemberActive : ""}`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
