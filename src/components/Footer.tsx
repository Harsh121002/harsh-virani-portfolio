import { siteConfig } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
        <p>
          © {year} {siteConfig.name}. Built with Next.js, Three.js & Framer Motion.
        </p>
        <p className="font-mono text-xs">
          Designed & coded with care
        </p>
      </div>
    </footer>
  );
}
