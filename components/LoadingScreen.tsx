"use client";

import { motion } from "framer-motion";

interface LoadingScreenProps {
  line: string;
}

export default function LoadingScreen({ line }: LoadingScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hero-gradient px-6">
      <motion.div
        className="w-full max-w-2xl rounded-3xl border border-slate-700/60 bg-black/45 p-8 text-center shadow-panel backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Alter Timeline Engine</p>
        <motion.h2
          key={line}
          className="mt-5 text-3xl text-slate-100 sm:text-4xl"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {line}
        </motion.h2>
        <div className="mx-auto mt-8 h-2 w-56 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
