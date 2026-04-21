"use client";

import Projects from "@/components/Projects/Projects";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#000", position: "relative" }}>
      <div style={{ paddingTop: "80px" }}>
        <Projects />
      </div>
    </main>
  );
}
