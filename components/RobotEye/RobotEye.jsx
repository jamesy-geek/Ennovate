import styles from "./RobotEye.module.css";

export default function RobotEye() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Layer 1: Concentric Rings */}
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>
        <div className={styles.ring}></div>

        {/* Layer 2: Crosshair */}
        <div className={styles.crosshair}></div>

        {/* Layer 3: Ticks */}
        <div className={styles.ticks}></div>

        {/* Layer 4: Iris + Internal Layers */}
        <div className={styles.iris}>
          {/* Layer 5: Scanline */}
          <div className={styles.scan}></div>
          {/* Layer 6: Pupil */}
          <div className={styles.pupil}></div>
        </div>

        {/* Layer 7: Blink */}
        <div className={styles.blink}></div>
      </div>
      <span className={styles.label}>SYS_ONLINE · V3.0</span>
    </div>
  );
}
