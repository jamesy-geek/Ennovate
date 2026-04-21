"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./TVDisplay.module.css";

const logos = [
  { src: "/assets/Logos/College.png", alt: "College Logo", offsetX: "-20px", offsetY: "0px" },
  { src: "/assets/Logos/2.png", alt: "Logo 2", offsetX: "-16px", offsetY: "0px" },
  { src: "/assets/Logos/3.png", alt: "Logo 3", offsetX: "-16px", offsetY: "0px" },
  { src: "/assets/Logos/4.png", alt: "Logo 4", offsetX: "-16px", offsetY: "0px" },
  { src: "/assets/Logos/5.png", alt: "Logo 5", offsetX: "-16px", offsetY: "0px" }
];

export default function TVDisplay({ scale = 1 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, 3000); // Change logo every 3 seconds
    return () => clearInterval(timer);
  }, []);

  const currentLogo = logos[currentIndex];

  return (
    <div className={styles.tvContainer}>
      <div className={styles.screenInner}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <Image
              src={currentLogo.src}
              alt={currentLogo.alt}
              fill
              className={styles.logoImage}
              style={{ objectPosition: `calc(50% + (${currentLogo.offsetX} * ${scale})) calc(50% + (${currentLogo.offsetY} * ${scale}))` }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <Image
        src="/assets/Logos/Empty TV.png"
        alt="TV Frame Overlay"
        fill
        className={styles.tvBase}
        priority
      />
    </div>
  );
}
