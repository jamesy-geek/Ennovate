"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/assets/ennovate-logo.png"
            alt="Ennovate Logo"
            width={120}
            height={32}
            className={styles.logoImage}
            priority
          />
        </Link>

        <ul className={styles.navLinks}>
          <li><Link href="#about">About</Link></li>
          <li><Link href="#challenges">Challenges</Link></li>
          <li><Link href="/join">Join Us</Link></li>
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
      </div>
    </>
  );
}
