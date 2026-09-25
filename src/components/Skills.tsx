"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TechIcon from "./TechIcon";
import { skillCategories } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative bg-navy-900/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="02 — Skills"
          title="Tools & technologies"
          description="A practical stack for shipping production UIs — from pixels to APIs and AI integrations."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              className="glass rounded-2xl p-4 sm:p-6 min-w-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <h3 className="mb-4 font-mono text-xs tracking-widest uppercase text-accent-cyan">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-3 text-sm sm:text-base text-slate-200"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/5">
                      <TechIcon slug={skill.icon} size={20} title={skill.name} />
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
