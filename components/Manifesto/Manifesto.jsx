"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Manifesto.module.css";
import { TextGenerate } from "@/components/TextEffects/TextEffects";

const QUOTE_WORDS = [
  "We", "don't", "wait", "for", "the", "future.",
  "We", "build", "the", "damn", "thing."
];

function ManifestoWord({ word, index, total, scrollYProgress }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);

  const isBuild = word.toLowerCase().includes("build");

  return (
    <motion.span
      style={{ opacity }}
      className={isBuild ? styles.outline : ""}
    >
      {word}{" "}
      {index === 5 ? <br /> : ""}
    </motion.span>
  );
}

export default function Manifesto() {
  const quoteRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ["start 0.9", "center center"],
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
          {QUOTE_WORDS.map((word, i) => (
            <ManifestoWord
              key={i}
              word={word}
              index={i}
              total={QUOTE_WORDS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
        <p className={styles.author}>
          {"// Club Ennovate \u00B7 2022\u2013present"}
        </p>
      </motion.div>

      <motion.div
        className={styles.body}
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <TextGenerate 
          words="Ennovate started because we were bored of just studying engineering. Three years later: robots that actually move, software deployed in the field, and a group of students who would rather spend a Saturday debugging servo firmware than doing almost anything else."
        />
      </motion.div>
    </section>
  );
}
