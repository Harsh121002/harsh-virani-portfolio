"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="01 — About"
          title="Who I am"
          description="A software developer who owns features end-to-end and leads delivery with clarity."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              {siteConfig.summary}
            </p>
          </motion.div>

          <motion.aside
            className="lg:col-span-2 glass rounded-2xl p-6 sm:p-8 space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <h3 className="font-mono text-xs tracking-widest uppercase text-accent-violet mb-3">
                Languages
              </h3>
              <ul className="flex flex-wrap gap-2">
                {siteConfig.languages.map((lang) => (
                  <li
                    key={lang}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300"
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs tracking-widest uppercase text-accent-violet mb-3">
                Focus
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex gap-2">
                  <span className="text-accent-cyan" aria-hidden="true">▹</span>
                  Responsive & accessible UI
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-cyan" aria-hidden="true">▹</span>
                  Component-based architecture
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-cyan" aria-hidden="true">▹</span>
                  Team leadership & mentoring
                </li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
