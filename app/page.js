import CassetteHeader from "@/components/CassetteHeader/CassetteHeader";
import Hero from "@/components/Hero/Hero";
import Pillars from "@/components/Pillars/Pillars";
import RoadWork from "@/components/RoadWork/RoadWork";
import Challenges from "@/components/Challenges/Challenges";
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

      <SectionDivider number="02" label="what we do" />

      {/* 02 — ABOUT */}
      <Pillars />

      <SectionDivider number="03" label="what we built" />

      {/* 03 — ROAD WORK (Folders for Projects & Achievements) */}
      <RoadWork />

      <SectionDivider number="04" label="events" />

      {/* 04 — COMPETITIONS */}
      <Challenges />

      <SectionDivider number="05" label="manifesto" />

      {/* 05 — MANIFESTO */}
      <Manifesto />

      <SectionDivider number="06" label="join" />

      {/* 06 — JOIN CTA */}
      <CTA />

      <SectionDivider number="07" label="the eye" />

      {/* 07 — EYE */}
      <EyeSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
