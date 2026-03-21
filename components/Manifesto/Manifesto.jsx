"use client";

import { motion } from "framer-motion";
import styles from "./Manifesto.module.css";

export default function Manifesto() {
  return (
    <section className={styles.manifesto}>
      <motion.div
        className={styles.quoteWrapper}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.quote}>
          "We don't wait for the future.<br />
          We <span className={styles.outline}>build</span> the damn thing."
        </div>
        <p className={styles.author}>// Club Ennovate · 2022–present</p>
      </motion.div>

      <motion.div
        className={styles.body}
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p>Ennovate started three years ago with a simple belief: the best way to learn how technology works is to build something with it that actually matters.</p>
        <p>We're not a coding bootcamp. We're not a research lab. We're a group of students who would rather spend a Saturday debugging servo firmware than doing almost anything else.</p>
        <p>Robotics, software, hardware, AI — we build across all of it. Some exist to help the people of the world that need it. Some exist purely because we wanted to see if it was possible. Both count.</p>
      </motion.div>
    </section>
  );
}
