"use client";

import AchievementStack from "@/components/AchievementStack/AchievementStack";
import Link from "next/link";
import { motion } from "framer-motion";
export default function AchievementsPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#000", position: "relative", overflow: "hidden" }}>
      <AchievementStack />
    </main>
  );
}
