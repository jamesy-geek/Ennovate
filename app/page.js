import CassetteHeader from "@/components/CassetteHeader/CassetteHeader";
import Hero from "@/components/Hero/Hero";
import Pillars from "@/components/Pillars/Pillars";
import Stats from "@/components/Stats/Stats";
import Challenges from "@/components/Challenges/Challenges";
import Manifesto from "@/components/Manifesto/Manifesto";
import CTA from "@/components/CTA/CTA";
import EyeSection from "@/components/EyeSection/EyeSection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <CassetteHeader />
      <Hero />
      <Pillars />
      <Stats />
      <Challenges />
      <Manifesto />
      <CTA />
      <EyeSection />
      <Footer />
    </main>
  );
}
