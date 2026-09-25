"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { siteConfig } from "@/lib/data";

const cardEase = [0.22, 1, 0.36, 1] as const;

type ContactCard = {
  id: string;
  label: string;
  value: string;
  href: string;
  accent: "cyan" | "violet";
  external?: boolean;
  ariaLabel: string;
  icon: ReactNode;
};

function MailIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const contacts: ContactCard[] = [
  {
    id: "email",
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    accent: "cyan",
    ariaLabel: `Email ${siteConfig.email}`,
    icon: <MailIcon />,
  },
  {
    id: "phone",
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    accent: "violet",
    ariaLabel: `Call ${siteConfig.phone}`,
    icon: <PhoneIcon />,
  },
  {
    id: "github",
    label: "GitHub",
    value: "Harsh121002",
    href: siteConfig.github,
    accent: "cyan",
    external: true,
    ariaLabel: "GitHub profile",
    icon: <GitHubIcon />,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "harsh-virani-hh121002",
    href: siteConfig.linkedin,
    accent: "violet",
    external: true,
    ariaLabel: "LinkedIn profile",
    icon: <LinkedInIcon />,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative overflow-hidden bg-navy-900/40">
      {/* Ambient depth */}
      <div
        className="pointer-events-none absolute -left-28 top-24 h-80 w-80 rounded-full bg-accent-cyan/10 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-16 h-96 w-96 rounded-full bg-accent-violet/12 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/[0.04] blur-[100px]"
        aria-hidden="true"
      />

      {/* Ghost decorative number */}
      <span
        className="pointer-events-none absolute -top-2 right-2 sm:right-10 select-none font-mono text-[5rem] sm:text-[9rem] md:text-[11rem] font-bold leading-none tracking-tighter text-white/[0.03]"
        aria-hidden="true"
      >
        05
      </span>

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="05 — Contact"
          title="Let's build"
          description="Open to software roles, freelance collaborations, and interesting product work. Drop a line — I usually reply within a day."
        />

        {/* Large gradient CTA headline strip */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: cardEase }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.15] text-balance">
            <span className="text-white">Have an idea? </span>
            <span className="gradient-text">Let&apos;s ship it together.</span>
          </p>
        </motion.div>

        {/* Contact cards grid */}
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
          {contacts.map((item, i) => {
            const isCyan = item.accent === "cyan";
            const iconWrap = isCyan
              ? "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/25 group-hover:border-accent-cyan/50 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.25)]"
              : "bg-accent-violet/10 text-accent-violet border-accent-violet/25 group-hover:border-accent-violet/50 group-hover:shadow-[0_0_24px_rgba(167,139,250,0.25)]";
            const beam = isCyan ? "via-accent-cyan/50" : "via-accent-violet/50";
            const hoverBorder = isCyan
              ? "hover:border-accent-cyan/35"
              : "hover:border-accent-violet/35";

            return (
              <motion.a
                key={item.id}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={item.ariaLabel}
                className={`group relative flex items-start gap-3 sm:gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6 backdrop-blur-md transition-all duration-300 ${hoverBorder} hover:bg-white/[0.055] sm:hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: cardEase }}
              >
                {/* Top beam */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${beam} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  aria-hidden="true"
                />

                <span
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${iconWrap}`}
                >
                  {item.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[0.7rem] tracking-widest uppercase text-slate-500 mb-1.5">
                    {item.label}
                  </span>
                  <span className="block text-base sm:text-lg font-medium text-white break-all group-hover:text-slate-50 transition-colors">
                    {item.value}
                  </span>
                </span>

                <span
                  className="mt-1 shrink-0 text-slate-600 transition-colors duration-300 group-hover:text-slate-300"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Primary CTAs */}
        <motion.div
          className="mt-10 md:mt-12 flex flex-wrap items-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25, ease: cardEase }}
        >
          <a
            href={`mailto:${siteConfig.email}?subject=Hello%20Harsh`}
            className="inline-flex w-full sm:w-auto min-h-[44px] items-center justify-center gap-2 rounded-xl bg-accent-cyan px-6 py-3.5 text-sm font-semibold text-navy-950 transition-all duration-300 hover:bg-cyan-300 hover:-translate-y-0.5 shadow-[0_0_28px_rgba(34,211,238,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan"
          >
            <MailIcon />
            Send an email
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="inline-flex w-full sm:w-auto min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-accent-violet/40 hover:bg-white/10 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-violet"
          >
            <PhoneIcon />
            Call now
          </a>
        </motion.div>

        <motion.p
          className="mt-8 text-sm text-slate-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          Prefer async? Email works best — include a short brief and timeline if you have one.
        </motion.p>
      </div>
    </section>
  );
}
