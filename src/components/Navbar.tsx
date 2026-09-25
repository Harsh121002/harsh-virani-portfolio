"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-navy-950/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-[4.5rem]"
        aria-label="Primary"
      >
        <a
          href="#hero"
          className="font-mono text-sm sm:text-base font-semibold tracking-tight text-white hover:text-accent-cyan transition-colors"
          onClick={() => setOpen(false)}
        >
          <span className="text-accent-cyan">&lt;</span>
          {siteConfig.name.split(" ")[0]}
          <span className="text-accent-cyan"> /&gt;</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-[44px] items-center px-3 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-md"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="ml-2 inline-flex min-h-[40px] items-center rounded-full bg-accent-cyan/10 border border-accent-cyan/30 px-4 py-1.5 text-sm font-medium text-accent-cyan hover:bg-accent-cyan/20 transition-colors"
            >
              Hire me
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-300 hover:text-white hover:bg-white/5"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-navy-950/95 backdrop-blur-xl overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-4 gap-1 max-h-[calc(100dvh-4rem)] overflow-y-auto">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-lg px-3 py-3.5 text-base text-slate-200 hover:bg-white/5 hover:text-accent-cyan"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  className="block rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-3.5 text-center text-base font-medium text-accent-cyan hover:bg-accent-cyan/20"
                  onClick={() => setOpen(false)}
                >
                  Hire me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
