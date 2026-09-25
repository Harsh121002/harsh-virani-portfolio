"use client";

import { motion } from "framer-motion";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <motion.div
      className="mb-12 md:mb-16 max-w-2xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {eyebrow && (
        <p className="mb-3 font-mono text-sm tracking-widest text-accent-cyan uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
