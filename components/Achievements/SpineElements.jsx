"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * ASCIIReveal Component
 * Replaces an image with its ASCII representation.
 * On hover, the ASCII characters "dissolve" or "reveal" the actual image.
 */
export const ASCIIReveal = ({ src, alt, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const asciiChars = "@#S%?*+;:,. ";
  
  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image 
        src={src} 
        alt={alt} 
        fill
        className={`object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
      
      <AnimatePresence>
        {isMounted && !isHovered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black flex flex-wrap content-start select-none pointer-events-none"
            style={{ fontSize: '8px', lineHeight: '8px', fontFamily: 'monospace', overflow: 'hidden' }}
          >
            {Array.from({ length: 400 }).map((_, i) => (
              <span key={i} style={{ color: "rgba(255, 255, 255, 0.4)" }}>
                {asciiChars[Math.floor(Math.random() * asciiChars.length)]}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", zIndex: 10 }}
        />
      )}
    </div>
  );
};

/**
 * RoboticSpine Component
 * A thick, high-density mechanical vertebrae spine with pulsing fibers.
 */
export const RoboticSpine = ({ scrollProgress }) => {
  const segments = 24;
  
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-24 pointer-events-none" style={{ zIndex: 10 }}>
      {/* Central Axis */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-white/10" />
      
      {/* Glow path behind */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[4px] bg-white/40 origin-top blur-sm"
        style={{ scaleY: scrollProgress }}
      />

      {/* Pulsing "Fiber Optic" Cables */}
      <svg className="absolute inset-0 w-full h-full overflow-visible opacity-20">
        <motion.path 
          d="M 48 0 Q 60 100 48 200 T 48 400 T 48 600 T 48 800 T 48 1000"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
          style={{ pathLength: scrollProgress }}
        />
        <motion.path 
          d="M 48 0 Q 36 100 48 200 T 48 400 T 48 600 T 48 800 T 48 1000"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2 6"
          style={{ pathLength: scrollProgress }}
        />
      </svg>
      
      {/* Segmented Vertebrae */}
      <div className="flex flex-col justify-between h-full py-20 items-center">
        {Array.from({ length: segments }).map((_, i) => (
          <Vertebra key={i} index={i} scrollProgress={scrollProgress} total={segments} />
        ))}
      </div>
    </div>
  );
};

const Vertebra = ({ index, scrollProgress, total }) => {
  const threshold = index / total;
  const isActive = scrollProgress > threshold;
  
  return (
    <motion.div 
      className="relative w-12 h-4 my-2"
      initial={{ opacity: 0.1, scale: 0.8 }}
      animate={isActive ? { 
        opacity: 1, 
        scale: 1,
        transition: { type: "spring", stiffness: 100 }
      } : { 
        opacity: 0.1, 
        scale: 0.8 
      }}
    >
      {/* Hexagonal Plate */}
      <div className="absolute inset-0 bg-black border border-white/40 skew-x-12" />
      <div className="absolute inset-0 bg-black border border-white/40 -skew-x-12" />
      
      {/* Core Unit */}
      <div 
        className="absolute inset-[4px] bg-white/10 transition-colors duration-500"
        style={{ 
          backgroundColor: isActive ? "rgba(255, 255, 255, 0.2)" : "transparent",
          boxShadow: isActive ? "0 0 10px rgba(255, 255, 255, 0.5)" : "none"
        }}
      >
        <div className="w-full h-[1px] bg-white/30 absolute top-1/2 -translate-y-1/2" />
      </div>
      
      {/* Animated LEDs */}
      {isActive && (
        <motion.div 
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-white"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: index * 0.1 }}
        />
      )}
    </motion.div>
  );
};

/**
 * DataPort (Node) Component
 * Redesigned industrial connection point.
 */
export const DataPort = ({ isActive, delay }) => {
  return (
    <motion.div 
      className="relative w-6 h-6 flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Outer Ring */}
      <div className="absolute inset-0 border border-white/40 rounded-sm rotate-45" />
      
      {/* Inner status dot */}
      <motion.div 
        className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-white/20'}`}
        animate={isActive ? { 
          boxShadow: ["0 0 0px white", "0 0 10px white", "0 0 0px white"]
        } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
      
      {/* Decorative mechanical bits */}
      <div className="absolute -top-1 left-1/2 w-[1px] h-2 bg-white/40" />
      <div className="absolute -bottom-1 left-1/2 w-[1px] h-2 bg-white/40" />
    </motion.div>
  );
};
