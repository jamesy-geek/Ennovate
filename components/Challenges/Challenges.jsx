"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Challenges.module.css";
import { EncryptedText } from "@/components/TextEffects/TextEffects";

const nexovateEvents = [
  {
    name: "National Level Hackathon",
    type: "Hackathon",
    teamSize: "2 to 4",
    desc: "A 24-hour national level hackathon where teams build innovative solutions to real-world problems. Open to participants from all over India.",
  },
  {
    name: "RoboSoccer",
    type: "Robotics",
    teamSize: "2 to 4",
    desc: "Teams control robots to score goals by pushing a ball into the opponent's goalpost within a fixed time. The event emphasizes teamwork, control accuracy, and real-time strategy.",
  },
  {
    name: "RoboRace",
    type: "Robotics",
    teamSize: "2 to 4",
    desc: "A robot competes on a specially designed track filled with turns, obstacles, and speed challenges. The objective is to complete the track in the shortest possible time without violating track rules.",
  },
  {
    name: "Plasma Pull",
    type: "Robotics",
    teamSize: "2 to 4",
    desc: "Two robots compete by pulling against each other using traction and torque. The robot that drags the opponent beyond a marked zone wins the match.",
  },
  {
    name: "Line Follower",
    type: "Robotics",
    teamSize: "2 to 4",
    desc: "Robots autonomously navigate a line track using sensors. The fastest and most accurate bot wins. Tests embedded systems and sensor calibration skills.",
  },
  {
    name: "Water Rocket",
    type: "Technical",
    teamSize: "2 to 4",
    desc: "Participants design and launch water-powered rockets aiming for maximum range and target accuracy. The event introduces principles of aerodynamics, propulsion, and pressure mechanics.",
  },
  {
    name: "Rapid Brand Rumbling",
    type: "Non-Technical",
    teamSize: "2 to 4",
    desc: "Teams build a complete brand identity from a given problem statement. They design logos, color palettes, UI/UX and typography, and create engaging advertising content within a limited time.",
  },
  {
    name: "Shark Tank",
    type: "Non-Technical",
    teamSize: "1 to 4",
    desc: "Teams will develop a startup idea, prepare a pitch deck, and present it to the judges. The goal is to simulate a real-world startup funding environment, where ideas are evaluated based on innovation, scalability and execution.",
  },
  {
    name: "IQ Wars 2.0",
    type: "Non-Technical",
    teamSize: "1 to 2",
    desc: "Participants compete in rounds testing logical reasoning, problem-solving, and general knowledge. The event includes quizzes, puzzles, and rapid-fire questions under time constraints.",
  },
];

const competitions = [
  {
    id: 1,
    name: "Nexovate 2026",
    tagline: "Flagship Technical Fest",
    desc: "Ennovate's flagship inter-college fest featuring 9 events across robotics, tech, and non-technical domains. Two days of innovation, competition, and collaboration.",
    dates: "May 4–5, 2026",
    status: "Registrations Open",
    eventCount: "9 Events",
    tags: ["Robotics", "Hackathon", "Innovation", "Non-Tech"],
  },
  {
    id: 2,
    name: "National Level Hackathon",
    tagline: "24-Hour Build Sprint",
    desc: "A national level 24-hour hackathon open to all colleges. Build real solutions, pitch to judges, and compete for top honors. Part of Nexovate 2026.",
    dates: "May 4–5, 2026",
    status: "Registrations Open",
    duration: "24 Hours",
    tags: ["Hackathon", "Coding", "Innovation", "National"],
  },
];

function CompetitionDetailModal({ competition, onClose }) {
  const isNexovate = competition.id === 1;

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose}>✕</button>

        <div className={styles.modalHeader}>
          <span className={styles.modalStatus}>
            {competition.status}
          </span>
          <h2 className={styles.modalName}>
            {competition.name}
          </h2>
          <p className={styles.modalTagline}>
            {competition.tagline}
          </p>
        </div>

        <div className={styles.modalMeta}>
          <div className={styles.modalMetaItem}>
            <span className={styles.modalMetaLabel}>Dates</span>
            <span className={styles.modalMetaVal}>
              {competition.dates}
            </span>
          </div>
          {competition.duration && (
            <div className={styles.modalMetaItem}>
              <span className={styles.modalMetaLabel}>Duration</span>
              <span className={styles.modalMetaVal}>{competition.duration}</span>
            </div>
          )}
          {competition.eventCount && (
            <div className={styles.modalMetaItem}>
              <span className={styles.modalMetaLabel}>Events</span>
              <span className={styles.modalMetaVal}>{competition.eventCount}</span>
            </div>
          )}
        </div>

        <p className={styles.modalDesc}>{competition.desc}</p>

        {isNexovate && (
          <div className={styles.eventList}>
            <h3 className={styles.eventListTitle}>Event Lineup</h3>
            <div className={styles.eventGrid}>
              {nexovateEvents.map((event, i) => (
                <motion.div
                  key={event.name}
                  className={`${styles.eventItem} ${i === 0 ? styles.eventFeatured : ""}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className={styles.eventItemHeader}>
                    <span className={styles.eventNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.eventType}>
                      {event.type}
                    </span>
                  </div>
                  <h4 className={styles.eventName}>
                    {event.name}
                  </h4>
                  <p className={styles.eventDesc}>{event.desc}</p>
                  <span className={styles.eventTeam}>
                    Team Size: {event.teamSize}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {!isNexovate && (
          <div className={styles.eventList}>
            <h3 className={styles.eventListTitle}>What to Expect</h3>
            <div className={styles.hackathonDetails}>
              <div className={styles.hackathonItem}>
                <span className={styles.hackathonIcon}>[ T ]</span>
                <div>
                  <strong>24 Hours Non-Stop</strong>
                  <p>Code, build, and ship in a single sprint</p>
                </div>
              </div>
              <div className={styles.hackathonItem}>
                <span className={styles.hackathonIcon}>[ G ]</span>
                <div>
                  <strong>National Level</strong>
                  <p>Open to participants from all colleges across India</p>
                </div>
              </div>
              <div className={styles.hackathonItem}>
                <span className={styles.hackathonIcon}>[ B ]</span>
                <div>
                  <strong>Real Problems</strong>
                  <p>Solve challenges that matter with mentorship from industry</p>
                </div>
              </div>
              <div className={styles.hackathonItem}>
                <span className={styles.hackathonIcon}>[ P ]</span>
                <div>
                  <strong>Team Size: 2–4</strong>
                  <p>Collaborate, ideate, and execute as a team</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Challenges() {
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  return (
    <section className={styles.challenges} id="challenges">
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>
          <EncryptedText 
            text="COMPETITIONS WE CONDUCT" 
          />
        </h2>
        <span className={styles.subLabel}>
          {"// events we're running"}
        </span>
      </motion.div>

      <div className={styles.grid}>
        {competitions.map((card, cardIndex) => (
          <motion.button
            key={card.id}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: cardIndex * 0.15 }}
            onClick={() => setSelectedCompetition(card)}
            whileHover={{ y: -6 }}
          >
            <div className={styles.topBar}></div>
            <div className={styles.cardInner}>
              <div className={styles.status}>
                <span className={card.status === "Registrations Open" ? styles.dotLive : styles.dotUpcoming}></span>
                {card.status}
              </div>
              <h3 className={styles.name}>
                {card.name}
              </h3>
              <p className={styles.tagline}>
                {card.tagline}
              </p>
              <p className={styles.desc}>{card.desc}</p>
              <div className={styles.tags}>
                {card.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>

              <div className={styles.meta}>
                <div className={styles.metaRow}>
                  <span>Date</span>
                  <span className={styles.metaVal}>{card.dates}</span>
                </div>
                {card.eventCount && (
                  <div className={styles.metaRow}>
                    <span>Events</span>
                    <span className={styles.metaVal}>{card.eventCount}</span>
                  </div>
                )}
                {card.duration && (
                  <div className={styles.metaRow}>
                    <span>Duration</span>
                    <span className={styles.metaVal}>{card.duration}</span>
                  </div>
                )}
              </div>

              <div className={styles.viewDetails}>
                <span>[ View Details → ]</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCompetition && (
          <CompetitionDetailModal
            competition={selectedCompetition}
            onClose={() => setSelectedCompetition(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
