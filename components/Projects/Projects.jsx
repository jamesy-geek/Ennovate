"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Projects.module.css";
import projectsData from "@/data/projects.json";

export default function Projects() {
  const [projects] = useState(projectsData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragRotation, setDragRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const autoRotateTimer = useRef(null);
  const ringRef = useRef(null);

  const numCards = projects.length;
  const angleStep = 360 / numCards;
  const [radius, setRadius] = useState(580);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      let baseR = numCards <= 4 ? 360 : numCards <= 6 ? 460 : 520;
      if (width <= 480) {
        baseR *= 0.55;
      } else if (width <= 768) {
        baseR *= 0.7;
      } else if (width <= 1024) {
        baseR *= 0.85;
      }
      setRadius(baseR);
    };
    
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, [numCards]);

  const baseRotation = -activeIndex * angleStep + dragRotation;

  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % numCards);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoRotating, numCards]);

  const pauseAutoRotate = useCallback(() => {
    setIsAutoRotating(false);
    clearTimeout(autoRotateTimer.current);
    autoRotateTimer.current = setTimeout(() => {
      setIsAutoRotating(true);
    }, 8000);
  }, []);

  useEffect(() => {
    return () => clearTimeout(autoRotateTimer.current);
  }, []);

  const goTo = useCallback(
    (idx) => {
      const wrapped = ((idx % numCards) + numCards) % numCards;
      setActiveIndex(wrapped);
      setDragRotation(0);
      pauseAutoRotate();
    },
    [numCards, pauseAutoRotate]
  );

  const prev = () => goTo(activeIndex - 1);
  const next = () => goTo(activeIndex + 1);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        next();
        e.preventDefault();
      }
      if (e.key === "ArrowLeft") {
        prev();
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  const onPointerDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragRotation(0);
    e.currentTarget.setPointerCapture(e.pointerId);
    pauseAutoRotate();
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    setDragRotation(dx * 0.3);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const cardsMoved = Math.round(dragRotation / angleStep);
    if (cardsMoved !== 0) {
      goTo(activeIndex - cardsMoved);
    }
    setDragRotation(0);
  };

  const lastWheelTime = useRef(0);

  const onWheel = useCallback(
    (e) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return;

      const threshold = 25;
      if (e.deltaY > threshold || e.deltaX > threshold) {
        next();
        lastWheelTime.current = now;
      } else if (e.deltaY < -threshold || e.deltaX < -threshold) {
        prev();
        lastWheelTime.current = now;
      }
    },
    [next, prev]
  );

  return (
    <section
      className={styles.projects}
      id="projects"
    >
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>PROJECTS</h2>
          <span className={styles.subLabel}>// what we've shipped</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.counter}>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
          <button
            className={styles.navBtn}
            onClick={prev}
            aria-label="Previous"
          >
            ←
          </button>
          <button className={styles.navBtn} onClick={next} aria-label="Next">
            →
          </button>
        </div>
      </motion.div>

      {/* 3D Ring Carousel */}
      <div
        className={styles.scene}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div
          ref={ringRef}
          className={styles.ring}
          style={{
            transform: `rotateY(${baseRotation}deg)`,
            transition: isDragging
              ? "none"
              : "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {projects.map((project, i) => {
            const angle = i * angleStep;
            let angleDiff = ((i - activeIndex) * angleStep + 360) % 360;
            if (angleDiff > 180) angleDiff = 360 - angleDiff;
            const isFront = angleDiff < angleStep * 0.5;
            const isNear = angleDiff < angleStep * 1.5;

            return (
              <div
                key={project.id}
                className={`${styles.card} ${isFront ? styles.cardActive : ""}`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  opacity: isFront ? 1 : isNear ? 0.7 : 0.4,
                  filter: isFront
                    ? "none"
                    : `brightness(${isNear ? 0.7 : 0.45})`,
                }}
                onClick={() => goTo(i)}
              >
                {/* Image */}
                <div className={styles.cardImage}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="300px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.cardImageOverlay} />
                  <span className={styles.cardYear}>{project.year}</span>
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardStatus}>
                    <span
                      className={
                        project.status === "Shipped"
                          ? styles.dotShipped
                          : styles.dotInProgress
                      }
                    />
                    {project.status}
                  </div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>
                  <div className={styles.cardTags}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={styles.cardTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reflection glow on the ground */}
        <div className={styles.groundGlow} />
      </div>

      {/* Dot indicators */}
      <div className={styles.dots}>
        {projects.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive2 : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      {/* Active project name */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className={styles.activeName}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {projects[activeIndex]?.title}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
