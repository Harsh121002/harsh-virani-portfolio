"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { siteConfig, projects } from "@/lib/data";

const cardEase = [0.22, 1, 0.36, 1] as const;

const focusAreas = [
  "Responsive & accessible UI",
  "Component-based architecture",
  "End-to-end feature ownership",
  "Team leadership & mentoring",
];

const stats = [
  {
    value: String(projects.length),
    label: "Featured projects",
    hint: "Live production apps",
    accent: "cyan" as const,
  },
  {
    value: "Lead",
    label: "Frontend delivery",
    hint: "Multi-module admin panel",
    accent: "violet" as const,
  },
  {
    value: "React",
    label: "Primary stack",
    hint: "Next.js · Redux Toolkit",
    accent: "cyan" as const,
  },
  {
    value: String(siteConfig.languages.length),
    label: "Languages",
    hint: siteConfig.languages.join(" · "),
    accent: "violet" as const,
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      {/* Ambient depth */}
      <div
        className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-accent-cyan/10 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-accent-violet/12 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/[0.04] blur-[100px]"
        aria-hidden="true"
      />

      {/* Ghost decorative number */}
      <span
        className="pointer-events-none absolute -top-2 right-2 sm:right-8 select-none font-mono text-[6.5rem] sm:text-[8.5rem] md:text-[10rem] font-bold leading-none tracking-tighter text-white/[0.03]"
        aria-hidden="true"
      >
        01
      </span>

      {/* Subtle decorative depth planes */}
      <div
        className="pointer-events-none absolute right-[8%] top-[28%] hidden h-40 w-40 rotate-12 rounded-3xl border border-white/[0.04] bg-gradient-to-br from-accent-cyan/5 to-transparent md:block"
        aria-hidden="true"
        style={{ transform: "perspective(600px) rotateY(-18deg) rotateX(8deg)" }}
      />
      <div
        className="pointer-events-none absolute right-[14%] top-[38%] hidden h-28 w-28 -rotate-6 rounded-2xl border border-white/[0.05] bg-gradient-to-tl from-accent-violet/8 to-transparent lg:block"
        aria-hidden="true"
        style={{ transform: "perspective(600px) rotateY(12deg) rotateX(-6deg)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="01 — About"
          title="Who I am"
          description="A software developer who owns features end-to-end and leads delivery with clarity."
        />

        {/* Intro strip */}
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: cardEase }}
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-[1.2] text-balance max-w-3xl">
            <span className="text-white">{siteConfig.role}. </span>
            <span className="gradient-text">
              Shipping polished product UI with React &amp; Next.js.
            </span>
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="mb-8 md:mb-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const isCyan = stat.accent === "cyan";
            const beam = isCyan ? "via-accent-cyan/50" : "via-accent-violet/50";
            const valueColor = isCyan ? "text-accent-cyan" : "text-accent-violet";
            const hoverBorder = isCyan
              ? "hover:border-accent-cyan/35"
              : "hover:border-accent-violet/35";

            return (
              <motion.div
                key={stat.label}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 backdrop-blur-md transition-all duration-300 ${hoverBorder} hover:bg-white/[0.055]`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: cardEase }}
              >
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${beam} to-transparent opacity-70`}
                  aria-hidden="true"
                />
                <p
                  className={`font-mono text-2xl sm:text-3xl font-bold tracking-tight ${valueColor}`}
                >
                  {stat.value}
                </p>
                <p className="mt-1.5 text-sm font-medium text-white">{stat.label}</p>
                <p className="mt-0.5 text-xs text-slate-500 leading-snug">{stat.hint}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-5">
          {/* Summary card */}
          <motion.div
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 lg:p-8 backdrop-blur-md lg:col-span-3 transition-colors duration-300 hover:border-accent-cyan/25 hover:bg-white/[0.05]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: cardEase }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-cyan/10 blur-3xl opacity-60"
              aria-hidden="true"
            />

            <p className="font-mono text-[0.7rem] tracking-widest uppercase text-accent-cyan mb-4">
              Summary
            </p>
            <p className="relative text-slate-300 leading-relaxed text-[0.95rem] sm:text-base md:text-lg">
              {siteConfig.summary}
            </p>
          </motion.div>

          {/* Side panel: languages + focus */}
          <motion.aside
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7 backdrop-blur-md lg:col-span-2 space-y-7 transition-colors duration-300 hover:border-accent-violet/25 hover:bg-white/[0.05]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: cardEase }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-violet/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -left-8 -bottom-8 h-36 w-36 rounded-full bg-accent-violet/10 blur-3xl"
              aria-hidden="true"
            />

            <div>
              <h3 className="font-mono text-[0.7rem] tracking-widest uppercase text-accent-violet mb-3">
                Languages
              </h3>
              <ul className="flex flex-wrap gap-2">
                {siteConfig.languages.map((lang) => (
                  <li
                    key={lang}
                    className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-slate-300 transition-colors hover:border-accent-violet/30 hover:text-white"
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[0.7rem] tracking-widest uppercase text-accent-violet mb-3">
                Focus
              </h3>
              <ul className="space-y-2.5">
                {focusAreas.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm text-slate-400 leading-relaxed"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
