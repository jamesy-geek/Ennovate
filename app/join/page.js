"use client";

import { motion } from "framer-motion";
import styles from "./Join.module.css";
import JoinForm from "@/components/JoinForm/JoinForm";
import JoinSidebar from "@/components/JoinSidebar/JoinSidebar";
import Footer from "@/components/Footer/Footer";

export default function JoinPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <motion.div
          className={styles.breadcrumb}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          ennovate / join
        </motion.div>
        
        <h1 className={styles.title}>
          <div className={styles.line}>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              JOIN THE
            </motion.span>
          </div>
          <div className={styles.line}>
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              CLUB.
            </motion.span>
          </div>
        </h1>

        <motion.p
          className={styles.subCopy}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          We review applications on a rolling basis. If you're selected you'll hear back within a week. No CV. No portfolio. Just tell us what you build.
        </motion.p>
      </header>

      <section className={styles.content}>
        <div className={styles.split}>
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <JoinForm />
          </motion.div>
          
          <motion.aside
            className={styles.sidebarCol}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
          >
            <JoinSidebar />
          </motion.aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
