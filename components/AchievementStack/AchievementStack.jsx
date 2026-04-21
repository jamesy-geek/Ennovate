"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";
import styles from "./AchievementStack.module.css";
import achievementsData from "@/data/achievements.json";

export default function AchievementStack() {
  const [achievements, setAchievements] = useState(achievementsData);
  const [isGridMode, setIsGridMode] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [topIndex, setTopIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isNearButton, setIsNearButton] = useState(false);
  
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 120 };
  
  const cardSprings = [];
  
  const firstX = useSpring(x, springConfig);
  const firstY = useSpring(y, springConfig);
  cardSprings.push({ sx: firstX, sy: firstY });

  for (let i = 1; i < achievements.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const prevSX = cardSprings[i-1].sx;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const prevSY = cardSprings[i-1].sy;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const sx = useSpring(prevSX, { damping: 25, stiffness: 200 }); 
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const sy = useSpring(prevSY, { damping: 25, stiffness: 200 }); 
    cardSprings.push({ sx, sy });
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (buttonRef.current) {
        const btnRect = buttonRef.current.getBoundingClientRect();
        const btnCenter = {
          x: btnRect.left + btnRect.width / 2,
          y: btnRect.top + btnRect.height / 2
        };
        const dist = Math.hypot(e.clientX - btnCenter.x, e.clientY - btnCenter.y);
        
        const near = dist < 200;
        setIsNearButton(near);
        
        if (!near && !isGridMode) {
          x.set(e.clientX);
          y.set(e.clientY);
          setMousePosition({ x: e.clientX, y: e.clientY });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, isGridMode]);

  const handleCardClick = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const handleCardDoubleClick = () => {
    setTopIndex((prev) => (prev + 1) % achievements.length);
    setExpandedId(null);
  };

  const toggleGrid = () => {
    setIsGridMode(!isGridMode);
    setExpandedId(null);
  };

  const orderedAchievements = [...achievements.slice(topIndex), ...achievements.slice(0, topIndex)];

  return (
    <div className={styles.container} ref={containerRef}>
      <button 
        ref={buttonRef}
        className={styles.gridBtn} 
        onClick={toggleGrid}
      >
        {isGridMode ? "BACK TO STACK" : "REORGANIZE TO GRID"}
      </button>

      <div className={isGridMode ? styles.grid : styles.stackWrapper}>
        <AnimatePresence>
          {orderedAchievements.map((achievement, index) => {
            const isExpanded = expandedId === achievement.id;
            
            return (
              <motion.div
                key={achievement.id}
                className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}
                layout
                initial={false}
                style={!isGridMode ? {
                  x: cardSprings[index].sx,
                  y: cardSprings[index].sy,
                  zIndex: achievements.length - index, 
                  position: "fixed",
                  left: -150, 
                  top: -200,   
                  rotate: index * 2,
                  scale: 1 - (index * 0.05)
                } : {}}
                onClick={(e) => {
                  if (e.detail === 1) {
                    setTimeout(() => { if (e.detail === 1) handleCardClick(achievement.id) }, 200);
                  }
                }}
                onDoubleClick={handleCardDoubleClick}
                transition={{
                  type: "spring",
                  stiffness: 100 - index * 5,
                  damping: 20,
                }}
              >
                <div className={styles.cardInner}>
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={achievement.image} 
                      alt={achievement.title} 
                      fill 
                      style={{ objectFit: "cover" }}
                    />
                    <div className={styles.overlay} />
                  </div>
                  
                  <div className={styles.content}>
                    <span className={styles.category}>{achievement.category}</span>
                    <h3 className={styles.title}>{achievement.title}</h3>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className={styles.description}
                        >
                          <p>{achievement.description}</p>
                          <span className={styles.year}>{achievement.year}</span>
                          <div className={styles.controlsHint}>
                            DOUBLE CLICK FOR NEXT CARD
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {!isGridMode && !isNearButton && (
        <div className={styles.stackHint}>
          CLICK TO EXPAND  |  DOUBLE CLICK FOR NEXT
        </div>
      )}
    </div>
  );
}
