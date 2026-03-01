"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import { AlterEgoResult } from "@/lib/types";
import { QUESTIONS, normalizeResult } from "@/utils/helpers";

const LOADING_LINES = [
  "Analyzing alternate timeline...",
  "Simulating personality drift...",
  "Rewriting destiny..."
];

export default function QuestionsPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const timer = window.setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % LOADING_LINES.length);
    }, 1600);

    return () => window.clearInterval(timer);
  }, [isLoading]);

  const currentQuestion = useMemo(() => QUESTIONS[step], [step]);

  async function submitAnswers(finalAnswers: string[]) {
    setIsLoading(true);
    setError("");

    try {
      const minDelay = new Promise((resolve) => setTimeout(resolve, 4800));

      const request = fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ answers: finalAnswers })
      }).then(async (response) => {
        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Unable to generate profile.");
        }
        return (await response.json()) as AlterEgoResult;
      });

      const [generated] = await Promise.all([request, minDelay]);
      const normalized = normalizeResult(generated);
      window.localStorage.setItem("alterEgo", JSON.stringify(normalized));
      window.localStorage.setItem("alterEgoAnswers", JSON.stringify(finalAnswers));
      router.push("/result");
    } catch (generationError) {
      console.error(generationError);
      setError("Generation failed. Please try again.");
      setIsLoading(false);
    }
  }

  function handleNext(answer: string) {
    const updated = [...answers];
    updated[step] = answer;
    setAnswers(updated);

    if (step === QUESTIONS.length - 1) {
      void submitAnswers(updated);
      return;
    }

    setStep((current) => current + 1);
  }

  if (isLoading) {
    return <LoadingScreen line={LOADING_LINES[loadingIndex]} />;
  }

  return (
    <main className="min-h-screen bg-hero-gradient px-6 py-10 text-white sm:px-10">
      <ProgressBar current={step + 1} total={QUESTIONS.length} />

      <AnimatePresence mode="wait">
        <div key={step}>
          <QuestionCard question={currentQuestion} onNext={handleNext} defaultValue={answers[step] ?? ""} />
        </div>
      </AnimatePresence>

      {error ? <p className="mx-auto mt-5 max-w-3xl text-sm text-amber-300">{error}</p> : null}
    </main>
  );
}
