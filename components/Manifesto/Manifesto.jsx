"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Manifesto.module.css";
import { useTerminalMode } from "@/hooks/useTerminalMode";

const QUOTE_WORDS = [
  "We", "don't", "wait", "for", "the", "future.",
  "We", "build", "the", "damn", "thing."
];

export default function Manifesto() {
  const { isTerminalMode } = useTerminalMode();
  const quoteRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <section className={styles.manifesto} id="about-manifesto">
      <motion.div
        className={styles.quoteWrapper}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        ref={quoteRef}
      >
        <div className={styles.quote}>
          {QUOTE_WORDS.map((word, i) => {
            const start = i / QUOTE_WORDS.length;
            const end = (i + 1) / QUOTE_WORDS.length;
            const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
            
            const isBuild = word.toLowerCase().includes("build");
            const displayWord = isTerminalMode ? (isBuild ? `[ ${word.toUpperCase()} ]` : word.toUpperCase()) : word;

            return (
              <motion.span
                key={i}
                style={{ opacity }}
                className={isBuild ? (isTerminalMode ? "glow" : styles.outline) : ""}
              >
                {displayWord}{" "}
                {i === 5 ? <br /> : ""}
              </motion.span>
            );
          })}
        </div>
        <p className={styles.author}>
          {isTerminalMode ? "// CLUB_ENNOVATE // 2022_PRESENT" : "// Club Ennovate · 2022–present"}
        </p>
      </motion.div>

      <motion.div
        className={styles.body}
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {isTerminalMode ? (
          <p>
            ENNOVATE_STARTED_THREE_YEARS_AGO_WITH_A_SIMPLE_BELIEF: 
            THE_BEST_WAY_TO_LEARN_HOW_TECHNOLOGY_WORKS_IS_TO_BUILD_SOMETHING_WITH_IT_THAT_ACTUALLY_MATTERS.
          </p>
        ) : (
          <p>Ennovate started three years ago with a simple belief: the best way to learn how technology works is to build something with it that actually matters.</p>
        )}
        <p>
          {isTerminalMode 
            ? "WE_ARE_NOT_A_CODING_BOOTCAMP. WE_ARE_NOT_A_RESEARCH_LAB. WE_ARE_A_GROUP_OF_STUDENTS." 
            : "We're not a coding bootcamp. We're not a research lab. We're a group of students who would rather spend a Saturday debugging servo firmware than doing almost anything else."}
        </p>
      </motion.div>
    </section>
  );
}
