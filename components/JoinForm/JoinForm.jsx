"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./JoinForm.module.css";

const DEPARTMENTS = ["CSE", "ECE", "Mech", "Civil", "Other"];
const YEARS = ["1st", "2nd", "3rd", "4th"];
const INTERESTS = ["Robotics", "Embedded Systems", "AI / ML", "Web & Apps", "Hardware", "Fabrication", "Design"];

export default function JoinForm() {
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    interests: [],
    buildHistory: "",
    motivation: "",
  });
  const [errors, setErrors] = useState({});

  const toggleInterest = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "// this field is required";
    if (!formData.email) newErrors.email = "// this field is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "// enter a valid email";
    
    if (!formData.department) newErrors.department = "// required";
    if (!formData.year) newErrors.year = "// required";
    if (formData.interests.length === 0) newErrors.interests = "// select at least one area";
    if (formData.motivation.length < 40) newErrors.motivation = "// minimum 40 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.successPanel}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.successContent}
        >
          <div className={styles.checkRing}>
            <svg viewBox="0 0 52 52" className={styles.checkmark}>
              <circle cx="26" cy="26" r="25" fill="none" />
              <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h2 className={styles.successHeadline}>{"You're in."}</h2>
          <p className={styles.successSub}>
            {"We'll be in touch at your email."}<br />
            {"Keep building."}
          </p>
          <button onClick={() => window.location.href = "/"} className={styles.backLink}>
            ← Back to ennovate
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>FULL NAME</label>
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={errors.name ? styles.inputError : ""}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.field}>
          <label>EMAIL</label>
          <input
            type="email"
            placeholder="you@college.edu"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? styles.inputError : ""}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>DEPARTMENT</label>
          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className={errors.department ? styles.inputError : ""}
          >
            <option value="" disabled>Select Dept</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.department && <span className={styles.error}>{errors.department}</span>}
        </div>
        <div className={styles.field}>
          <label>YEAR</label>
          <select
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className={errors.year ? styles.inputError : ""}
          >
            <option value="" disabled>Select Year</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          {errors.year && <span className={styles.error}>{errors.year}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label>WHAT DO YOU WANT TO WORK ON</label>
          <span className={styles.hint}>{"// pick all that apply"}</span>
        </div>
        <div className={styles.tags}>
          {INTERESTS.map((interest) => (
            <button
              key={interest}
              type="button"
              className={`${styles.tag} ${formData.interests.includes(interest) ? styles.selected : ""}`}
              onClick={() => toggleInterest(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
        {errors.interests && <span className={styles.error}>{errors.interests}</span>}
      </div>

      <div className={styles.divider}></div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label>{"SOMETHING YOU'VE BUILT"}</label>
          <span className={styles.hint}>{"// optional"}</span>
        </div>
        <div className={styles.textareaWrapper}>
          <textarea
            placeholder="A project, a script, a circuit — anything. Even if it didn't work."
            value={formData.buildHistory}
            onChange={(e) => e.target.value.length <= 400 && setFormData({ ...formData, buildHistory: e.target.value })}
            rows={3}
          />
          <span className={styles.counter}>{formData.buildHistory.length}/400</span>
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label>WHY ENNOVATE</label>
          <span className={styles.hint}>{"// 2\u20133 sentences"}</span>
        </div>
        <div className={styles.textareaWrapper}>
          <textarea
            placeholder="What do you want to build here that you can't build alone?"
            value={formData.motivation}
            onChange={(e) => e.target.value.length <= 600 && setFormData({ ...formData, motivation: e.target.value })}
            rows={4}
            className={errors.motivation ? styles.inputError : ""}
          />
          <span className={`${styles.counter} ${600 - formData.motivation.length < 50 ? styles.counterLow : ""}`}>
            {formData.motivation.length}/600
          </span>
        </div>
        {errors.motivation && <span className={styles.error}>{errors.motivation}</span>}
      </div>

      <div className={styles.submitArea}>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={styles.submitBtn}
        >
          {status === "submitting" ? "processing..." : "[ Submit Application ]"}
        </button>
        {status === "error" && (
          <p className={styles.errorNote}>
            {"// something went wrong. try again or email hello@ennovate.club"}
          </p>
        )}
        <p className={styles.note}>
          {"// no CV needed \u00B7 no experience required \u00B7 rolling review"}
        </p>
      </div>
    </form>
  );
}
