"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import useTextScramble from "@/hooks/useTextScramble";
import RobotEye from "@/components/RobotEye/RobotEye";
import styles from "./CassetteHeader.module.css";

const META_ITEMS = [
  { text: "MANDYA", delay: 700 },
  { text: "EST. 2022", delay: 750 },
  { text: "INNOVATION FOR LIVING. AND FUN.", delay: 800 },
  { text: "INDIA", delay: 850 },
];

function ScrambleItem({ text, delay, hideMobile }) {
  const scrambled = useTextScramble(text, { delay, duration: 600 });
  return (
    <span className={`${styles.metaItem} ${hideMobile ? styles.hideMobile : ""}`}>
      {scrambled}
    </span>
  );
}
export default function CassetteHeader() {
  const grainRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  // Generate procedural film grain on mount
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 200;
    const ctx = canvas.getContext("2d");
    const img = ctx.createImageData(200, 200);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    if (grainRef.current) {
      grainRef.current.style.setProperty("--grain-url", `url(${canvas.toDataURL()})`);
    }
  }, []);

  return (
    <section className={styles.header} ref={grainRef}>
      {/* Logotype */}
      <motion.div
        className={styles.logotypeWrap}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className={styles.logotypeClip}>
          <motion.h1
            className={styles.logotype}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            ennovate
          </motion.h1>
        </div>

        {/* Logo mark */}
        <motion.div
          className={styles.logoMark}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.45, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Image
            src="/assets/ennovate-logo.png"
            alt="Ennovate Mark"
            width={80}
            height={28}
            className={styles.logoMarkImg}
          />
        </motion.div>
      </motion.div>

      {/* Metadata Strip */}
      <motion.div
        className={styles.metaStrip}
        style={{ x }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        {META_ITEMS.map((item, i) => (
          <ScrambleItem
            key={i}
            text={item.text}
            delay={item.delay}
            hideMobile={i >= 2}
          />
        ))}
      </motion.div>

      {/* Eye Animation Area (fallback: CSS Robot Eye) */}
      <motion.div
        className={styles.eyeArea}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className={styles.eyeFallback}>
          {/* === SWAPPABLE EYE / SPRITE SHEET AREA === */}
          {/* Replace <RobotEye /> with your sprite sheet component when ready */}
          <RobotEye />
        </div>
      </motion.div>

      {/* Footer Strip */}
      <motion.div
        className={styles.footerStrip}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        <span className={styles.footerLeft}>↓ scroll</span>
        <span className={styles.footerRight}>SYS_ONLINE · V3.0</span>
      </motion.div>
    </section>
  );
}
