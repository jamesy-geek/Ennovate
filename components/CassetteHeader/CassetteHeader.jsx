"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import useTextScramble from "@/hooks/useTextScramble";
import RobotEye from "@/components/RobotEye/RobotEye";
import { useTerminalMode } from "@/hooks/useTerminalMode";
import styles from "./CassetteHeader.module.css";

const META_ITEMS = [
  { text: "MANDYA", delay: 700 },
  { text: "EST. 2022", delay: 750 },
  { text: "INNOVATION FOR LIVING. AND FUN.", delay: 800 },
  { text: "INDIA", delay: 850 },
];

const BOOT_LOGS = [
  "[  0.000] [ OK ] Started Ennovate Kernel v3.4.0...",
  "[  0.152] [ OK ] Mounting /dev/innovation...",
  "[  0.481] [ WARN ] Low power in creativity_subsystem",
  "[  0.892] [ OK ] All systems functional.",
  "[  1.002] [ OK ] User 'STUDENT' logged in.",
];

function ScrambleItem({ text, delay, hideMobile, isTerminal }) {
  const displayValue = isTerminal ? text.replace(/\s+/g, '_').toUpperCase() : text;
  const scrambled = useTextScramble(displayValue, { delay, duration: 600 });
  
  return (
    <span className={`${styles.metaItem} ${hideMobile ? styles.hideMobile : ""}`}>
      {isTerminal && text.includes("INNOVATION") && <span className={styles.pulseDot}>● </span>}
      {scrambled}
    </span>
  );
}

export default function CassetteHeader() {
  const { isTerminalMode, toggleTerminalMode } = useTerminalMode();
  const grainRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  useEffect(() => {
    // Grain logic...
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

  const asciiLogo = `
 ███████╗███╗   ██╗███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ ████████╗███████╗
 ██╔════╝████╗  ██║████╗  ██║██╔═══██╗██║   ██║██╔══██╗╚══██╔══╝██╔════╝
 █████╗  ██╔██╗ ██║██╔██╗ ██║██║   ██║██║   ██║███████║   ██║   █████╗  
 ██╔══╝  ██║╚██╗██║██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║   ██║   ██╔══╝  
 ███████╗██║ ╚████║██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║   ██║   ███████╗
 ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝   ╚═╝   ╚══════╝
  `.trim();

  return (
    <section 
      className={`${styles.header} ${isTerminalMode ? 'terminal-mode' : ''}`} 
      ref={grainRef}
    >
      {/* Logotype */}
      <motion.div
        className={styles.logotypeWrap}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className={styles.logotypeClip}>
          {isTerminalMode ? (
            <pre className={`${styles.asciiLogo} glitch`}>
              {asciiLogo}
            </pre>
          ) : (
            <motion.h1
              className={styles.logotype}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              ennovate
            </motion.h1>
          )}
        </div>

        {!isTerminalMode && (
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
        )}
      </motion.div>

      {/* Boot Logs */}
      {isTerminalMode && (
        <div className={styles.bootLogs}>
          {BOOT_LOGS.map((log, i) => (
            <p key={i} className={log.includes('WARN') ? styles.warn : styles.ok}>
              {log}
            </p>
          ))}
        </div>
      )}

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
            isTerminal={isTerminalMode}
          />
        ))}
      </motion.div>

      {/* Eye Animation Area */}
      <motion.div
        className={styles.eyeArea}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className={styles.eyeFallback}>
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
        <span 
          className={styles.footerRight} 
          style={{ cursor: 'pointer', color: isTerminalMode ? 'var(--g)' : 'inherit' }}
          onClick={toggleTerminalMode}
        >
          {isTerminalMode ? '[ EXIT_TERMINAL ]' : 'SYS_ONLINE · V3.0'}
        </span>
      </motion.div>
    </section>
  );
}
