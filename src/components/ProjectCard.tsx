"use client";

import { useRef, useState, useCallback, type MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import TechIcon from "./TechIcon";
import { stackToIconSlug } from "@/lib/icons";

export type ProjectData = {
  title: string;
  liveUrl: string;
  image: string;
  subtitle: string;
  role: string;
  stack: string[];
  highlights: string[];
  accent: "cyan" | "violet" | string;
};

type Props = {
  project: ProjectData;
  index: number;
  /** Image on the left when true (desktop). Alternates by index. */
  imageLeft?: boolean;
  /** First / hero featured treatment */
  featured?: boolean;
};

export default function ProjectCard({
  project,
  index,
  imageLeft = true,
  featured = false,
}: Props) {
  const isCyan = project.accent === "cyan";
  const accentColor = isCyan ? "#22d3ee" : "#a78bfa";
  const number = String(index + 1).padStart(2, "0");

  const mediaRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const onSpotMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = mediaRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  const badge = isCyan
    ? "text-accent-cyan border-accent-cyan/35 bg-accent-cyan/10"
    : "text-accent-violet border-accent-violet/35 bg-accent-violet/10";

  const cta = isCyan
    ? "bg-accent-cyan text-navy-950 hover:bg-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.35)]"
    : "bg-accent-violet text-navy-950 hover:bg-violet-300 shadow-[0_0_28px_rgba(167,139,250,0.35)]";

  const borderGlow = isCyan
    ? "group-hover:border-accent-cyan/40"
    : "group-hover:border-accent-violet/40";

  const beam = isCyan
    ? "via-accent-cyan/60"
    : "via-accent-violet/60";

  return (
    <motion.article
      className={`group relative ${featured ? "md:-mt-2" : ""}`}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ghost case-study number */}
      <span
        className="pointer-events-none absolute -top-6 sm:-top-8 left-0 z-0 select-none font-mono text-[4.5rem] sm:text-[7rem] md:text-[9.5rem] font-bold leading-none tracking-tighter text-white/[0.035] md:text-white/[0.045]"
        aria-hidden="true"
      >
        {number}
      </span>

      <div
        className={`relative z-10 grid items-center gap-6 sm:gap-8 lg:gap-12 ${
          featured ? "lg:gap-14" : ""
        } lg:grid-cols-12`}
      >
        {/* Media column */}
        <div
          className={`min-w-0 lg:col-span-7 ${
            imageLeft ? "lg:order-1" : "lg:order-2"
          } order-1`}
        >
          <TiltCard
            maxTilt={featured ? 11 : 9}
            hoverScale={1.015}
            className="w-full"
          >
            <div
              ref={mediaRef}
              onMouseMove={onSpotMove}
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-navy-800/60 transition-colors duration-500 ${borderGlow} ${
                featured ? "shadow-2xl shadow-black/40" : "shadow-xl shadow-black/30"
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Spotlight border beam */}
              <div
                className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, ${accentColor}33, transparent 55%)`,
                }}
                aria-hidden="true"
              />

              {/* Top gradient beam line */}
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent ${beam} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                aria-hidden="true"
              />

              {/* Soft glow orb behind image (translateZ depth) */}
              <div
                className="pointer-events-none absolute -inset-8 z-0 blur-2xl opacity-60"
                style={{
                  transform: "translateZ(-40px)",
                  background: `radial-gradient(ellipse at 50% 50%, ${accentColor}40, transparent 70%)`,
                }}
                aria-hidden="true"
              />

              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-[16/10] overflow-hidden"
                aria-label={`Open ${project.title} live site`}
                style={{ transform: "translateZ(24px)" }}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.subtitle}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.06]"
                  sizes={
                    featured
                      ? "(max-width: 1024px) 100vw, 58vw"
                      : "(max-width: 1024px) 100vw, 55vw"
                  }
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-navy-950/40" />

                {/* Live chip on media */}
                <span
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy-950/75 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-all duration-300 group-hover:border-white/40 group-hover:bg-navy-950/90"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full"
                    style={{ backgroundColor: accentColor }}
                    aria-hidden="true"
                  />
                  View live →
                </span>
              </a>

              {/* Inner frame rim */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
                aria-hidden="true"
              />
            </div>
          </TiltCard>
        </div>

        {/* Content column */}
        <div
          className={`min-w-0 lg:col-span-5 ${
            imageLeft ? "lg:order-2" : "lg:order-1"
          } order-2 flex flex-col`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-mono tracking-wide ${badge}`}
            >
              {project.role}
            </span>
            <span className="font-mono text-xs text-slate-500">/{number}</span>
          </div>

          <h3
            className={`font-bold tracking-tight text-white ${
              featured
                ? "text-[1.65rem] sm:text-4xl md:text-[2.75rem] leading-[1.15]"
                : "text-[1.45rem] sm:text-3xl md:text-[2.15rem] leading-tight"
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-2 text-base sm:text-lg text-slate-400">
            {project.subtitle}
          </p>

          <ul className="mt-6 space-y-2.5">
            {project.highlights.map((h, hi) => (
              <motion.li
                key={h}
                className="flex gap-2.5 text-sm sm:text-[0.95rem] text-slate-400 leading-relaxed"
                initial={{ opacity: 0, x: imageLeft ? 12 : -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 + hi * 0.05, duration: 0.4 }}
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
                  aria-hidden="true"
                />
                {h}
              </motion.li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((tech) => {
              const slug = stackToIconSlug(tech);
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.07]"
                >
                  {slug && <TechIcon slug={slug} size={13} title={tech} />}
                  {tech}
                </span>
              );
            })}
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-8 inline-flex min-h-[44px] w-full sm:w-fit items-center justify-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${cta}`}
          >
            Live demo
            <span aria-hidden="true" className="text-base leading-none">
              ↗
            </span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}
