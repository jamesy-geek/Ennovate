"use client";

import { useState, useEffect, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export default function useTextScramble(targetText, { delay = 0, duration = 800, interval = 30 } = {}) {
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started || !targetText) return;

    const length = targetText.length;
    const totalSteps = Math.ceil(duration / interval);
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;

      let result = "";
      for (let i = 0; i < length; i++) {
        if (targetText[i] === " ") {
          result += " ";
        } else if (i / length < progress) {
          result += targetText[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setText(result);

      if (step >= totalSteps) {
        setText(targetText);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [started, targetText, duration, interval]);

  return text;
}
