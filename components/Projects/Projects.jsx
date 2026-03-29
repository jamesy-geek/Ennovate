"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Projects.module.css";
import { useTerminalMode } from "@/hooks/useTerminalMode";
import projectsData from "@/data/projects.json";

function ProjectCard({ project, isActive, isPaused, onClick, style, isTerminal }) {
  return (
    <motion.div
      className={`${styles.card} ${isActive ? styles.cardActive : ""} ${isActive && isPaused ? styles.cardRaised : ""} ${isTerminal ? styles.terminalCard : ""}`}
      style={style}
      onClick={onClick}
      whileHover={!isActive ? { scale: 1.05 } : {}}
      animate={isActive && isPaused ? { y: -14 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      layout
    >
      <div className={styles.cardImage}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="300px"
          style={{ objectFit: "cover" }}
        />
        <div className={styles.cardImageOverlay} />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardStatus}>
          <span className={project.status === "Shipped" ? styles.dotShipped : styles.dotActive}>
          </span>
          {isTerminal ? project.status.replace(/\s+/g, "_").toUpperCase() : project.status}
        </div>
        <h3 className={styles.cardTitle}>{isTerminal ? project.title.toUpperCase() : project.title}</h3>
        {isActive && isPaused && (
          <motion.p
            className={styles.cardDesc}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {project.description}
          </motion.p>
        )}
        <div className={styles.cardTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.cardTag}>
              {isTerminal ? tag.toUpperCase() : tag}
            </span>
          ))}
        </div>
        <span className={styles.cardYear}>{project.year}</span>
      </div>
    </motion.div>
  );
}

function ProjectEditModal({ project, onClose, onSave }) {
  const [form, setForm] = useState({ ...project });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.modalTitle}>Edit Project</h3>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Tags (comma separated)</label>
          <input
            type="text"
            value={form.tags.join(", ")}
            onChange={(e) => handleChange("tags", e.target.value.split(",").map((t) => t.trim()))}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="Shipped">Shipped</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Year</label>
          <input
            type="text"
            value={form.year}
            onChange={(e) => handleChange("year", e.target.value)}
          />
        </div>
        <div className={styles.modalActions}>
          <button className={styles.btnCancel} onClick={onClose}>Cancel</button>
          <button className={styles.btnSave} onClick={() => onSave(form)}>Save</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { isTerminalMode } = useTerminalMode();
  const [projects, setProjects] = useState(projectsData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const ringRef = useRef(null);
  const autoRotateRef = useRef(null);

  const cardCount = projects.length;
  const angleStep = 360 / cardCount;

  // Auto-rotate when not dragging AND not paused
  useEffect(() => {
    if (isDragging || isPaused) return;

    autoRotateRef.current = setInterval(() => {
      setRotation((prev) => prev + 0.15);
    }, 30);

    return () => clearInterval(autoRotateRef.current);
  }, [isDragging, isPaused]);

  // Sync active index from rotation
  useEffect(() => {
    const normalizedRotation = (((-rotation % 360) + 360) % 360);
    const idx = Math.round(normalizedRotation / angleStep) % cardCount;
    setActiveIndex(idx);
  }, [rotation, angleStep, cardCount]);

  // Mouse drag handlers
  const handlePointerDown = useCallback((e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setStartRotation(rotation);
    e.preventDefault();
  }, [rotation]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart;
    setRotation(startRotation + delta * 0.3);
  }, [isDragging, dragStart, startRotation]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Scroll to rotate — ONLY on the ring container (local handler)
  const handleWheel = useCallback((e) => {
    e.stopPropagation();
    setIsPaused(false);
    setRotation((prev) => prev - e.deltaY * 0.15);
  }, []);

  useEffect(() => {
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handlePointerUp, handlePointerMove]);

  // Touch drag handlers
  const handleTouchStart = useCallback((e) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setStartRotation(rotation);
  }, [rotation]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStart;
    setRotation(startRotation + delta * 0.4);
  }, [isDragging, dragStart, startRotation]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Click on a card to snap to it and pause
  const snapToCard = (index) => {
    if (isPaused && index === activeIndex) {
      // Clicking the same active card again unpauses
      setIsPaused(false);
    } else {
      setRotation(-index * angleStep);
      setIsPaused(true);
    }
  };

  // Click outside the ring to unpause
  const handleSectionClick = (e) => {
    if (isPaused && ringRef.current && !ringRef.current.contains(e.target)) {
      setIsPaused(false);
    }
  };

  // Admin
  const handleAdminLogin = () => {
    if (adminPassword === "ennovate2024") {
      setIsAdminMode(true);
      setShowAdminPrompt(false);
      setAdminPassword("");
    } else {
      alert("Wrong password.");
    }
  };

  const handleSaveProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    setEditingProject(null);
  };

  return (
    <section
      className={`${styles.projects} ${isTerminalMode ? styles.terminal : ""}`}
      id="projects"
      onClick={handleSectionClick}
    >
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={`${styles.title} ${isTerminalMode ? "glow" : ""}`}>
          {isTerminalMode ? "PROJECT_ARCHIVE" : "PROJECTS"}
        </h2>
        <span className={isTerminalMode ? styles.command : styles.subLabel}>
          {isTerminalMode ? "ls -la /builds" : "// what we've shipped"}
        </span>
        <div className={styles.headerActions}>
          {!isAdminMode ? (
            <button
              className={styles.adminBtn}
              onClick={() => setShowAdminPrompt(!showAdminPrompt)}
            >
              [ {isTerminalMode ? "SUDO" : "Admin"} ]
            </button>
          ) : (
            <span className={styles.adminBadge}>✓ ADMIN</span>
          )}
        </div>
      </motion.div>

      {/* Admin password prompt */}
      <AnimatePresence>
        {showAdminPrompt && (
          <motion.div
            className={styles.adminPrompt}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <input
              type="password"
              placeholder="Enter admin password..."
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
              className={styles.adminInput}
            />
            <button className={styles.adminSubmit} onClick={handleAdminLogin}>
              {isTerminalMode ? "AUTH" : "Login"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ring Carousel */}
      <div className={styles.ringWrapper}>
        <div className={styles.dragHint}>
          {isPaused
            ? (isTerminalMode ? "PAUSED — CLICK_TO_RESUME" : "paused — click outside to resume")
            : (isTerminalMode ? "← DRAG_TO_ROTATE →" : "← drag to explore →")}
        </div>
        <div
          ref={ringRef}
          className={styles.ringContainer}
          onPointerDown={handlePointerDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          <div
            className={styles.ring}
            style={{
              transform: `rotateY(${rotation}deg)`,
              transition: isDragging ? "none" : "transform 0.1s ease-out",
            }}
          >
            {projects.map((project, i) => {
              const angle = i * angleStep;
              const isActive = i === activeIndex;
              return (
                <div
                  key={project.id}
                  className={styles.cardSlot}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(380px)`,
                  }}
                >
                  <ProjectCard
                    project={project}
                    isActive={isActive}
                    isPaused={isPaused}
                    onClick={() => snapToCard(i)}
                    isTerminal={isTerminalMode}
                  />
                  {isAdminMode && (
                    <button
                      className={styles.editBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingProject(project);
                      }}
                    >
                      ✎
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Active project details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className={styles.activeDetails}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.activeNum}>
              {String(activeIndex + 1).padStart(2, "0")}/{String(cardCount).padStart(2, "0")}
            </span>
            <span className={styles.activeName}>{projects[activeIndex]?.title}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingProject && (
          <ProjectEditModal
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onSave={handleSaveProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
