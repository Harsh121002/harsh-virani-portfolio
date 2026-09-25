"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/data";

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
      className="section-pad relative overflow-hidden bg-navy-900/40"
    >
      {/* Full-bleed scroll-linked 3D backdrop — softer on left where copy sits */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-y-0 right-0 w-full sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[55%] translate-x-[8%] sm:translate-x-[12%] lg:translate-x-[6%]">
          <ScrollMorphScene scrollProgress={scrollProgress} />
        </div>
        {/* Readability veil so 3D never fights text */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/70 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950/50"
          aria-hidden="true"
        />
      </div>

      {/* Ambient accent orbs */}
      <div
        className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-accent-cyan/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-32 h-80 w-80 rounded-full bg-accent-violet/10 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="04 — Projects"
          title="Featured work"
          description="Production apps spanning live streaming, support desks, video platforms, and guided UX flows."
        />

        <div className="flex flex-col gap-14 sm:gap-20 md:gap-28 lg:gap-32">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              imageLeft={i % 2 === 0}
              featured={i === 0}
            />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.p
          className="mt-20 md:mt-24 text-center text-sm text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          More case studies & experiments available on request.
        </motion.p>
      </div>
    </section>
  );
}
