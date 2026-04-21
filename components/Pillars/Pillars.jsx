"use client";

import { motion } from "framer-motion";
import styles from "./Pillars.module.css";

const pillars = [
  {
    id: "01",
    category: "Core Focus",
    title: "ROBOTICS",
    desc: "Servo control to robots that win in competitions. We design, fabricate, and program robots that move in the real world — not just on paper.",
    tags: ["ROS", "Arduino", "Inverse Kinematics", "OpenCV", "3D Printing"],
    variant: "dark",
  },
  {
    id: "02",
    category: "Mission",
    title: "REAL PROBLEMS",
    desc: "Heritage tourism, public infrastructure, accessibility, logistics — problems that matter outside a lab. We build for the field, not the demo.",
    tags: ["Deployed", "Field Tested", "Impact Driven", "Cross-disciplinary"],
    variant: "white",
  },
  {
    id: "03",
    category: "Culture",
    title: "SIDE PROJECTS",
    desc: "Weekend experiments. Personal obsessions. Weird ideas. Cool stuff. Some of our best work started as 'what if we tried this over the weekend.'",
    tags: ["AI Agents", "Embedded Systems", "Web Apps", "Hardware Hacks"],
    variant: "dark",
  },
];

function PillarItem({ pillar }) {
  return (
    <motion.div
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
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Pillars() {
  return (
    <section className={styles.pillars} id="about">
      {pillars.map((pillar) => (
        <PillarItem key={pillar.id} pillar={pillar} />
      ))}
    </section>
  );
}
