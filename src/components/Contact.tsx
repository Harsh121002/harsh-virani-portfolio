"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative bg-navy-900/40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="06 — Contact"
          title="Let's build something"
          description="Open to frontend roles, freelance collaborations, and interesting product work."
        />

        <motion.div
          className="glass rounded-2xl p-6 sm:p-10 max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <ul className="space-y-5">
            <li>
              <p className="font-mono text-xs tracking-widest uppercase text-slate-500 mb-1">
                Email
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-lg sm:text-xl text-accent-cyan hover:text-cyan-300 transition-colors break-all"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <p className="font-mono text-xs tracking-widest uppercase text-slate-500 mb-1">
                Phone
              </p>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="text-lg sm:text-xl text-white hover:text-accent-cyan transition-colors"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <p className="font-mono text-xs tracking-widest uppercase text-slate-500 mb-2">
                Social
              </p>
              <div className="flex flex-wrap gap-3">
                {/* TODO: Replace #linkedin with real LinkedIn profile URL */}
                <a
                  href={siteConfig.linkedin}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:border-accent-cyan/40 hover:text-accent-cyan transition-colors"
                  aria-label="LinkedIn profile (URL pending)"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                {/* TODO: Replace #github with real GitHub profile URL */}
                <a
                  href={siteConfig.github}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:border-accent-violet/40 hover:text-accent-violet transition-colors"
                  aria-label="GitHub profile (URL pending)"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub
                </a>
              </div>
            </li>
          </ul>

          <a
            href={`mailto:${siteConfig.email}?subject=Hello%20Harsh`}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent-cyan px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20"
          >
            Send an email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
