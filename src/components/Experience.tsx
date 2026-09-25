"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="03 — Experience"
          title="Where I've worked"
          description="Shipping accessible interfaces and owning UI delivery in a product team."
        />

        <ol className="relative border-l border-white/10 ml-2 sm:ml-4 space-y-8 sm:space-y-10">
          {experience.map((job, i) => (
            <motion.li
              key={`${job.company}-${job.period}`}
              className="relative pl-6 sm:pl-10"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <span
                className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-accent-cyan bg-navy-950 glow-cyan"
                aria-hidden="true"
              />
              <article className="glass rounded-2xl p-4 sm:p-7 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {job.role}
                  </h3>
                  <time className="font-mono text-xs sm:text-sm text-accent-violet shrink-0">
                    {job.period}
                  </time>
                </div>
                <p className="mt-1 text-accent-cyan font-medium">{job.company}</p>
                <ul className="mt-4 space-y-2">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2 text-sm sm:text-base text-slate-400 leading-relaxed"
                    >
                      <span className="text-accent-cyan mt-1.5 shrink-0" aria-hidden="true">
                        ▹
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
