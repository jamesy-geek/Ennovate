"use client";

import { motion } from "framer-motion";
import styles from "./ComingSoon.module.css";

const QUOTE = "This section is under construction. Like most of our robots at 3 AM before a deadline.";

export default function ComingSoon() {
  return (
    <section className={styles.comingSoon} id="lab">
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.droneASCII}>
          <pre className={styles.ascii}>{`
    |   |   |   |
  __|   |   |   |__
 /  \\   |   |   /  \\
/ /\\ \\  |   |  / /\\ \\
\\/__\\/  |   |  \\/__\\/
   ||   |   |   ||
   ||___|   |___||
  /______________ \\
 | ROAD WORK AHEAD |
  \\______________/
          `}</pre>
          <div className={styles.shadow} />
        </div>

        <h3 className={styles.title}>
          {"// Road Work Ahead"}
        </h3>

        <p className={styles.quote}>{`"${QUOTE}"`}</p>

        <div className={styles.statusBar}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>
            {"Status: Under construction (probably)"}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
