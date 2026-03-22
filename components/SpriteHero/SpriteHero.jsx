"use client";

import { motion } from "framer-motion";
import styles from "./SpriteHero.module.css";

export default function SpriteHero() {
  return (
    <section className={styles.spriteSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.placeholder}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.label}>[ SPRITE_SHEET_ANIMATION_PLACEHOLDER ]</div>
          <div className={styles.desc}>Hand-drawn animation will be integrated here.</div>
        </motion.div>
      </div>
      <motion.div 
        className={styles.indicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ↓ Scroll
      </motion.div>
    </section>
  );
}
