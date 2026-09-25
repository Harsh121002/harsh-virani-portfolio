import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Harsh Virani — Software Developer",
  description:
    "Software Developer specializing in React, Next.js, and Redux Toolkit. Building responsive, production web applications with Firebase, REST APIs, and modern UI.",
  keywords: [
    "Harsh Virani",
    "Software Developer",
    "React",
    "Next.js",
    "Redux Toolkit",
    "Portfolio",
  ],
  authors: [{ name: "Harsh Virani" }],
  metadataBase: new URL("https://harsh-virani-portfolio.vercel.app"),
  openGraph: {
    title: "Harsh Virani — Software Developer",
    description:
      "Software Developer building responsive production apps with React, Next.js, and Redux Toolkit.",
    type: "website",
    url: "https://harsh-virani-portfolio.vercel.app",
    images: [
      {
        url: "/og-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Harsh Virani — Software Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Virani — Software Developer",
    description:
      "Software Developer building responsive production apps with React, Next.js, and Redux Toolkit.",
    images: ["/og-thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-navy-950 text-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}
