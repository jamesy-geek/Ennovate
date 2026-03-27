"use client";

import { useState, useEffect } from "react";

export default function useTypewriter(text, { speed = 30, delay = 0, enabled = true } = {}) {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayText(text);
      setIsDone(true);
      return;
    }

    setDisplayText("");
    setIsDone(false);

    const timeout = setTimeout(() => {
      let current = "";
      let index = 0;
      
      const interval = setInterval(() => {
        if (index < text.length) {
          current += text[index];
          setDisplayText(current);
          index++;
        } else {
          setIsDone(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, enabled]);

  return { displayText, isDone };
}
