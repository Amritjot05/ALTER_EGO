"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface QuestionCardProps {
  question: string;
  defaultValue?: string;
  onNext: (answer: string) => void;
  disabled?: boolean;
}

export default function QuestionCard({
  question,
  defaultValue = "",
  onNext,
  disabled = false
}: QuestionCardProps) {
  const [value, setValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [question]);

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) {
      return;
    }
    onNext(trimmed);
  }

  return (
    <motion.div
      className="mx-auto mt-14 w-full max-w-3xl rounded-3xl border border-slate-700/70 bg-slate-900/35 p-6 shadow-panel backdrop-blur-lg sm:p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Question</p>
      <h2 className="mt-4 text-2xl leading-snug text-slate-100 sm:text-4xl">{question}</h2>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submit();
          }
        }}
        placeholder="Type your answer and press Enter"
        className="mt-7 min-h-36 w-full resize-none rounded-2xl border border-slate-700/80 bg-black/40 p-4 text-base text-slate-100 outline-none transition focus:border-cyan-300/80"
        disabled={disabled}
      />

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-slate-400">Enter submits. Shift + Enter adds a line break.</p>
        <button
          type="button"
          onClick={submit}
          disabled={disabled || value.trim().length === 0}
          className="rounded-full border border-cyan-300/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100 transition hover:bg-cyan-300/15 disabled:cursor-not-allowed disabled:border-slate-600 disabled:text-slate-500"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
}
