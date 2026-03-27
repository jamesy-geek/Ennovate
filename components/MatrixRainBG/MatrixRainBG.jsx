"use client";

import { useEffect, useRef } from "react";
import { useTerminalMode } from "@/hooks/useTerminalMode";
import styles from "./MatrixRainBG.module.css";

export default function MatrixRainBG() {
  const { isTerminalMode } = useTerminalMode();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isTerminalMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters from Matrix (Katakana + digits)
    const chars = "ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ2345789";
    const fontSize = 13;
    const columns = Math.ceil(width / fontSize);
    const drops = new Array(columns).fill(1);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let animationId;
    const draw = () => {
      ctx.fillStyle = "rgba(2, 12, 2, 0.1)"; // Match --bg with fade
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff41"; // --g
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isTerminalMode]);

  if (!isTerminalMode) return null;

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
