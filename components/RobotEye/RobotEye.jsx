"use client";

import { useTerminalMode } from "@/hooks/useTerminalMode";
import styles from "./RobotEye.module.css";

export default function RobotEye() {
  const { isTerminalMode } = useTerminalMode();

  return (
    <div className={`${styles.wrapper} ${isTerminalMode ? styles.terminal : ""}`}>
      <div className={styles.container}>
        {/* Layer 1: Concentric Rings */}
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>

        {/* Radar Sweep Arm (Terminal Only) */}
        {isTerminalMode && <div className={styles.radarSweep}></div>}

        {/* Layer 2: Crosshair / Reticle */}
        <div className={isTerminalMode ? styles.radarCrosshair : styles.crosshair}></div>

        {/* Blips (Terminal Only) */}
        {isTerminalMode && (
          <>
            <div className={`${styles.blip} ${styles.blip1}`}></div>
            <div className={`${styles.blip} ${styles.blip2}`}></div>
            <div className={`${styles.blip} ${styles.blip3}`}></div>
          </>
        )}

        {/* Layer 3: Ticks */}
        {!isTerminalMode && <div className={styles.ticks}></div>}

        {/* Layer 4: Iris + Internal Layers */}
        <div className={styles.iris}>
          {/* Layer 5: Scanline */}
          <div className={styles.scan}></div>
          {/* Layer 6: Pupil */}
          <div className={styles.pupil}></div>
        </div>

        {/* Layer 7: Blink */}
        {!isTerminalMode && <div className={styles.blink}></div>}
      </div>
      <span className={styles.label}>
        {isTerminalMode ? "SCAN_READY // TARGET_LOCK" : "SYS_ONLINE · V3.0"}
      </span>
      <div className={styles.blueprintHint}>[ HOLD_TO_INSPECT ]</div>
    </div>
  );
}
