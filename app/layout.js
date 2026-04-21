import { Bebas_Neue, Barlow, Barlow_Condensed, JetBrains_Mono, Archivo } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav/Nav";
import Cursor from "@/components/Cursor/Cursor";
import EasterEggManager from "@/components/EasterEgg/EasterEgg";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const archivo = Archivo({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-archivo",
});

const barlow = Barlow({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "ENNOVATE — We Build.",
  description: "Robots, code, and real-world problems. Club Ennovate established 2022.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="cursor-none">
      <body
        className={`${bebasNeue.variable} ${archivo.variable} ${barlow.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable}`}
        style={{
          fontFamily: "var(--font-barlow), sans-serif",
        }}
      >
        <Cursor />
        <Nav />
        <EasterEggManager />
        {children}
      </body>
    </html>
  );
}
