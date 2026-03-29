import CassetteHeader from "@/components/CassetteHeader/CassetteHeader";
import Hero from "@/components/Hero/Hero";
import Pillars from "@/components/Pillars/Pillars";
import Projects from "@/components/Projects/Projects";
import Challenges from "@/components/Challenges/Challenges";
import Achievements from "@/components/Achievements/Achievements";
import Manifesto from "@/components/Manifesto/Manifesto";
import CTA from "@/components/CTA/CTA";
import ComingSoon from "@/components/ComingSoon/ComingSoon";
import EyeSection from "@/components/EyeSection/EyeSection";
import Footer from "@/components/Footer/Footer";
import SectionDivider from "@/components/SectionDivider/SectionDivider";

export default function Home() {
  return (
    <main>
      {/* 01 — LANDING (includes Numbers via horizontal scroll) */}
      <CassetteHeader />
      <Hero />

      <SectionDivider number="02" label="What We Do" />

      {/* 02 — ABOUT */}
      <Pillars />

      <SectionDivider number="03" label="Our Builds" />

      {/* 03 — PROJECTS */}
      <Projects />

      <SectionDivider number="04" label="Our Events" />

      {/* 04 — COMPETITIONS */}
      <Challenges />

      <SectionDivider number="05" label="Milestones" />

      {/* 05 — ACHIEVEMENTS */}
      <Achievements />

      <SectionDivider number="06" label="Philosophy" />

      {/* 06 — MANIFESTO */}
      <Manifesto />

      <SectionDivider number="07" label="Join" />

      {/* 07 — JOIN CTA */}
      <CTA />

      <SectionDivider number="08" label="Lab" />

      {/* 08 — DRONE (Coming Soon) */}
      <ComingSoon />

      <SectionDivider number="09" label="Observation" />

      {/* 09 — EYE */}
      <EyeSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
