"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const sections = ["home", "about", "projects", "challenges", "achievements", "join"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const [clickCount, setClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState(null);

  const handleLogoClick = (e) => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      return;
    }

    e.preventDefault();
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (clickTimeout) clearTimeout(clickTimeout);
    
    if (newCount === 3) {
      window.dispatchEvent(new CustomEvent("trigger-egg", { detail: { eggId: "GRAVITY" } }));
      setClickCount(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setClickTimeout(setTimeout(() => setClickCount(0), 500));
    }
  };

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <Link href="/" className={styles.logo} onClick={handleLogoClick} title="Triple click for gravity">
          <Image
            src="/assets/ennovate-logo.png"
            alt="Ennovate Logo"
            width={120}
            height={32}
            className={styles.logoImage}
            style={{ filter: 'invert(1)' }}
            priority
          />
        </Link>

        <ul className={styles.navLinks}>
          <li className={activeSection === "about" || activeSection === "about-manifesto" ? styles.active : ""}>
            <Link href="#about">About</Link>
          </li>
          <li className={activeSection === "challenges" ? styles.active : ""}>
            <Link href="#challenges">Challenges</Link>
          </li>
          <li className={activeSection === "join" || (typeof window !== "undefined" && window.location.pathname === "/join") ? styles.active : ""}>
            <Link href="/join">Join Us</Link>
          </li>
          <li className={styles.erpItem}>
            <a href="https://cerpennovate.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.erpLink}>
              [ Launch ERP ]
            </a>
          </li>
          <div className={styles.indicator} />
        </ul>

        <button
          className={styles.mobileToggle}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          [ {drawerOpen ? "×" : "≡"} ]
        </button>
      </nav>

      <div className={`${styles.drawer} ${drawerOpen ? styles.open : ""}`}>
        <Link href="#about" onClick={closeDrawer}>About</Link>
        <Link href="#challenges" onClick={closeDrawer}>Challenges</Link>
        <Link href="/join" onClick={closeDrawer}>Join Us</Link>
        <a href="https://cerpennovate.vercel.app" target="_blank" rel="noopener noreferrer" onClick={closeDrawer} className={styles.drawerErp}>
          → Launch ERP
        </a>
      </div>
    </>
  );
}
