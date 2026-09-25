"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="h-32 w-32 rounded-full bg-accent-cyan/10 animate-pulse-slow blur-2xl" />
    </div>
  ),
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-grid-fade"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050816_70%)] pointer-events-none z-[1]" />

      <HeroScene />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-xl lg:max-w-2xl pointer-events-none">
          <motion.p
            className="font-mono text-sm sm:text-base text-accent-cyan mb-4 pointer-events-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {siteConfig.name}
          </motion.h1>

          <motion.p
            className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold gradient-text pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
          >
            {siteConfig.role}
          </motion.p>

          <motion.p
            className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
          >
            Building responsive, production web apps with React, Next.js, and
            Redux Toolkit — from UI architecture to Firebase auth and REST APIs.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-accent-cyan px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.p
            className="mt-10 hidden sm:block font-mono text-xs text-slate-500 pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Drag the 3D scene · auto-rotates
          </motion.p>
        </div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-500 hover:text-accent-cyan transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </motion.a>
    </section>
  );
}
