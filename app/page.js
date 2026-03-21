import Hero from "@/components/Hero/Hero";
import Pillars from "@/components/Pillars/Pillars";
import Stats from "@/components/Stats/Stats";
import Challenges from "@/components/Challenges/Challenges";
import Manifesto from "@/components/Manifesto/Manifesto";
import CTA from "@/components/CTA/CTA";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Pillars />
      <Stats />
      <Challenges />
      <Manifesto />
      <CTA />
      <Footer />
    </main>
  );
}
