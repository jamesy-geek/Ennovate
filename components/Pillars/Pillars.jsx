"use client";

import { motion } from "framer-motion";
import { useTerminalMode } from "@/hooks/useTerminalMode";
import useTypewriter from "@/hooks/useTypewriter";
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
    desc: "Real world problems that warranted attention now come to us for solution. Heritage tourism, accessibility, logistics, and public infrastructure.",
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

function PillarItem({ pillar, isTerminal }) {
  const { displayText: typedDesc } = useTypewriter(pillar.desc, { enabled: isTerminal, speed: 15 });
  
  return (
    <motion.div
      className={`${styles.pillar} ${pillar.variant === "white" ? styles.whiteBand : ""} ${isTerminal ? styles.terminalPillar : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.pillarLine}></div>
      <div className={styles.pillarNumber}>[ {pillar.id} ]</div>
      <div className={styles.pillarContent}>
        <p className={styles.pillarCategory}>{isTerminal ? pillar.category.replace(/\s+/g, '_').toUpperCase() : pillar.category}</p>
        <h2 className={styles.pillarTitle}>{isTerminal ? pillar.title.replace(/\s+/g, '_').toUpperCase() : pillar.title}</h2>
        <p className={styles.pillarDesc}>
          {isTerminal ? typedDesc : pillar.desc}
        </p>
        <div className={styles.pillarTags}>
          {pillar.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {isTerminal ? tag.replace(/\s+/g, '_') : tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Pillars() {
  const { isTerminalMode } = useTerminalMode();

  return (
    <section className={styles.pillars} id="about">
      {isTerminalMode && (
        <div className={styles.sectionHeader}>
          <h2 className="glow">WHAT_WE_DO</h2>
          <span className={styles.command}>cat /etc/ennovate/mission.conf</span>
        </div>
      )}
      {pillars.map((pillar) => (
        <PillarItem key={pillar.id} pillar={pillar} isTerminal={isTerminalMode} />
      ))}
    </section>
  );
}
