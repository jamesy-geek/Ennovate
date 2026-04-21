"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./RoadWork.module.css";

const folders = [
  {
    id: "projects",
    title: "OUR BUILDS",
    subtitle: "Explore our latest projects",
    path: "/projects",
  },
  {
    id: "achievements",
    title: "MILESTONES",
    subtitle: "Our journey and victories",
    path: "/achievements",
  }
];

export default function RoadWork() {
  return (
    <section className={styles.roadwork} id="roadwork">
      <div className={styles.container}>
        {folders.map((folder, index) => (
          <Link href={folder.path} key={folder.id} className={styles.folderWrapper}>
            <motion.div 
              className={styles.folder}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.folderTab}>
                <span className={styles.folderId}>0{index + 1}</span>
              </div>
              <div className={styles.folderBody}>
                <div className={styles.icon}>
                  {folder.id === "projects" ? "[ BUILD ]" : "[ WIN ]"}
                </div>
                <h3 className={styles.title}>
                  {folder.title}
                </h3>
                <p className={styles.subtitle}>
                  {folder.subtitle}
                </p>
                <div className={styles.cta}>
                  OPEN FOLDER
                  <span className={styles.arrow}>→</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
