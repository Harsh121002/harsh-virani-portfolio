"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="05 — Education"
          title="Academic background"
          description="Computer science and Infocomm foundations from Singapore."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {education.map((item, i) => (
            <motion.article
              key={item.degree}
              className="glass rounded-2xl p-6 sm:p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <time className="font-mono text-xs tracking-widest uppercase text-accent-cyan">
                {item.period}
              </time>
              <h3 className="mt-3 text-lg sm:text-xl font-semibold text-white leading-snug">
                {item.degree}
              </h3>
              <p className="mt-2 text-slate-400">{item.school}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
