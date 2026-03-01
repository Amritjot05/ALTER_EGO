"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PARTICLE_COUNT = 22;

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-gradient px-6">
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: PARTICLE_COUNT }).map((_, index) => {
          const left = (index * 13) % 100;
          const delay = (index % 7) * 0.6;
          const duration = 8 + (index % 6);
          return (
            <span
              key={index}
              className="particle"
              style={{
                left: `${left}%`,
                bottom: "-12%",
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
            />
          );
        })}
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <p className="mb-5 text-xs uppercase tracking-[0.55em] text-cyan-300/80">Alter Ego</p>
        <h1 className="text-4xl leading-tight text-slate-100 sm:text-6xl md:text-7xl">
          Meet the version of you that made different choices.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm text-slate-300 sm:text-base">
          A cinematic profile from an alternate timeline: identity, traits, career arc, and the five-year roadmap you
          would have built under different pressure.
        </p>
        <Link
          href="/questions"
          className="glow-button mt-10 inline-flex rounded-full border border-cyan-300/50 bg-cyan-400/10 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
        >
          Generate My Alter Ego
        </Link>
      </motion.div>
    </section>
  );
}
