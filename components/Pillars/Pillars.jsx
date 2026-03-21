"use client";

import { motion } from "framer-motion";
import styles from "./Pillars.module.css";

const pillars = [
  {
    id: "01",
    category: "Core Focus",
    title: "ROBOTICS",
    desc: "From servo control to full humanoid builds. We design, fabricate, and program robots that move in the real world — not just on paper.",
    tags: ["ROS", "Arduino", "Inverse Kinematics", "OpenCV", "3D Printing"],
    variant: "dark",
  },
  {
    id: "02",
    category: "Mission",
    title: "REAL PROBLEMS",
    desc: "We don't build for demos. Our projects tackle heritage tourism, accessibility, logistics, and public infrastructure — things that actually need fixing.",
    tags: ["Deployed", "Field Tested", "Impact Driven", "Cross-disciplinary"],
    variant: "white",
  },
  {
    id: "03",
    category: "Culture",
    title: "SIDE PROJECTS",
    desc: "Some of our best work started as 'what if we tried this over the weekend.' Personal obsessions, weird ideas, experimental builds — all welcome.",
    tags: ["AI Agents", "Embedded Systems", "Web Apps", "Hardware Hacks"],
    variant: "dark",
  },
];

export default function Pillars() {
  return (
    <section className={styles.pillars} id="about">
      {pillars.map((pillar) => (
        <motion.div
          key={pillar.id}
          className={`${styles.pillar} ${pillar.variant === "white" ? styles.whiteBand : ""}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.pillarLine}></div>
          <div className={styles.pillarNumber}>[ {pillar.id} ]</div>
          <div className={styles.pillarContent}>
            <p className={styles.pillarCategory}>{pillar.category}</p>
            <h2 className={styles.pillarTitle}>{pillar.title}</h2>
            <p className={styles.pillarDesc}>{pillar.desc}</p>
            <div className={styles.pillarTags}>
              {pillar.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
