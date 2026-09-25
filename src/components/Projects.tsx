"use client";

import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TechIcon from "./TechIcon";
import { projects } from "@/lib/data";
import { stackToIconSlug } from "@/lib/icons";

const ScrollMorphScene = dynamic(() => import("./ScrollMorphScene"), {
  ssr: false,
  loading: () => null,
});

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scrollProgress.current = latest;
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-pad relative bg-navy-900/40 overflow-hidden"
    >
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px] opacity-40 sm:opacity-55 lg:opacity-80 translate-x-[18%] lg:translate-x-[8%]">
        <ScrollMorphScene scrollProgress={scrollProgress} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="04 — Projects"
          title="Featured work"
          description="Production apps spanning live streaming, support desks, video platforms, and guided UX flows."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => {
            const glow =
              project.accent === "cyan" ? "hover:glow-cyan" : "hover:glow-violet";
            const badge =
              project.accent === "cyan"
                ? "text-accent-cyan border-accent-cyan/30 bg-accent-cyan/10"
                : "text-accent-violet border-accent-violet/30 bg-accent-violet/10";

            return (
              <motion.article
                key={project.title}
                className={`glass rounded-2xl overflow-hidden flex flex-col transition-shadow duration-300 ${glow}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="relative aspect-[16/9] overflow-hidden border-b border-white/5">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.subtitle}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={i < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                </div>

                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-mono ${badge}`}
                    >
                      {project.role}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-slate-400">{project.subtitle}</p>

                  <ul className="mt-5 space-y-2 flex-1">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2 text-sm text-slate-400 leading-relaxed"
                      >
                        <span
                          className={
                            project.accent === "cyan"
                              ? "text-accent-cyan mt-1 shrink-0"
                              : "text-accent-violet mt-1 shrink-0"
                          }
                          aria-hidden="true"
                        >
                          ▹
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-5 border-t border-white/5">
                    <p className="sr-only">Tech stack</p>
                    <ul className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => {
                        const slug = stackToIconSlug(tech);
                        return (
                          <li
                            key={tech}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                          >
                            {slug && (
                              <TechIcon slug={slug} size={14} title={tech} />
                            )}
                            {tech}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
