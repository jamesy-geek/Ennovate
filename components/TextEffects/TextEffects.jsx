"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/**
 * EncryptedText Component
 */
export const EncryptedText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const chars = "!@#$%^&*()_+{}[]|:;<>,.?/~";
  
  useEffect(() => {
    setIsMounted(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        (text || "").split("").map((_, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= (text || "").length) clearInterval(interval);
      iteration += 1/3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  if (!isMounted) return <span className="invisible">{text}</span>;
  return <span>{displayText}</span>;
};

/**
 * FlipWords Component
 */
export const FlipWords = ({ words, duration = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  if (!words || words.length === 0) return null;

  return (
    <div className="relative inline-block h-[1.2em] min-w-[4ch] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

/**
 * TextGenerate Component
 * Staggered word reveal with blur animation.
 */
export const TextGenerate = ({ words, className = "" }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const wordsArray = (words || "").split(" ");

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.3em", lineHeight: "1.85" }}
    >
      {wordsArray.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.45, delay: idx * 0.04, ease: "easeOut" }}
          style={{ display: "inline-block" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};
