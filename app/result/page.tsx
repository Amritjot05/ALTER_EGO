"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ResultCard from "@/components/ResultCard";
import StatBar from "@/components/StatBar";
import { AlterEgoResult } from "@/lib/types";
import { buildShadowResult, formatStatLabel, getLowestStats, getTopStats, normalizeResult } from "@/utils/helpers";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AlterEgoResult | null>(null);
  const [shadowMode, setShadowMode] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("alterEgo");
    if (!stored) {
      return;
    }

    try {
      setResult(normalizeResult(JSON.parse(stored)));
    } catch {
      setResult(null);
    }
  }, []);

  const displayData = useMemo(() => {
    if (!result) {
      return null;
    }
    return shadowMode ? buildShadowResult(result) : result;
  }, [result, shadowMode]);

  const strengths = useMemo(() => {
    if (!displayData) {
      return [];
    }
    return [displayData.dominant_trait, ...getTopStats(displayData.stats).map((item) => `${item.label} (${item.value})`)];
  }, [displayData]);

  const weaknesses = useMemo(() => {
    if (!displayData) {
      return [];
    }
    return [displayData.shadow_trait, ...getLowestStats(displayData.stats).map((item) => `${item.label} (${item.value})`)];
  }, [displayData]);

  function downloadCard() {
    if (!displayData) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, "#020617");
    gradient.addColorStop(0.6, "#0f172a");
    gradient.addColorStop(1, "#164e63");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(34, 211, 238, 0.15)";
    ctx.fillRect(70, 70, canvas.width - 140, canvas.height - 140);

    ctx.fillStyle = "#67e8f9";
    ctx.font = "600 42px serif";
    ctx.fillText("ALTER EGO", 120, 180);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 64px serif";
    ctx.fillText(displayData.name.slice(0, 28), 120, 290);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "400 34px sans-serif";
    ctx.fillText(displayData.tagline.slice(0, 52), 120, 360);

    ctx.fillStyle = "#22d3ee";
    ctx.font = "600 36px sans-serif";
    ctx.fillText("Top Stats", 120, 490);

    const topStats = getTopStats(displayData.stats);
    topStats.forEach((stat, index) => {
      const y = 580 + index * 120;
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "500 34px sans-serif";
      ctx.fillText(stat.label, 120, y);

      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      ctx.fillRect(430, y - 38, 470, 46);

      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(430, y - 38, (470 * stat.value) / 100, 46);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 28px sans-serif";
      ctx.fillText(String(stat.value), 930, y - 2);
    });

    ctx.fillStyle = "#94a3b8";
    ctx.font = "400 24px sans-serif";
    ctx.fillText(shadowMode ? "Shadow Mode Timeline" : "Prime Timeline", 120, 1220);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `alterego-${shadowMode ? "shadow" : "prime"}.png`;
    link.click();
  }

  if (!displayData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-hero-gradient px-6 text-white">
        <div className="max-w-xl rounded-3xl border border-slate-700/70 bg-black/40 p-8 text-center">
          <h1 className="text-3xl">No profile generated yet</h1>
          <p className="mt-3 text-slate-300">Answer the five questions first to reveal your alternate identity.</p>
          <button
            type="button"
            onClick={() => router.push("/questions")}
            className="mt-7 rounded-full border border-cyan-300/70 px-6 py-2 text-sm uppercase tracking-[0.16em] text-cyan-100"
          >
            Start Questions
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-hero-gradient px-6 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <ResultCard data={displayData} mode={shadowMode ? "shadow" : "alter"} />

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-6 rounded-3xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-panel backdrop-blur-lg">
            <div>
              <h2 className="text-xl text-cyan-200">Personality Breakdown</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-200">
                <p>
                  <span className="text-slate-400">Dominant Trait:</span> {displayData.dominant_trait}
                </p>
                <p>
                  <span className="text-slate-400">Shadow Trait:</span> {displayData.shadow_trait}
                </p>
                <p>
                  <span className="text-slate-400">Risk Appetite:</span> {displayData.risk_appetite}
                </p>
                <p>
                  <span className="text-slate-400">Leadership Style:</span> {displayData.leadership_style}
                </p>
                <p>
                  <span className="text-slate-400">Emotional Pattern:</span> {displayData.emotional_pattern}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg text-cyan-200">Career Path</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{displayData.career_path}</p>
            </div>

            <div>
              <h3 className="text-lg text-cyan-200">5-Year Roadmap</h3>
              <ol className="mt-3 space-y-2 text-sm text-slate-200">
                {displayData.five_year_roadmap.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ol>
            </div>
          </section>

          <section className="space-y-5 rounded-3xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-panel backdrop-blur-lg">
            <h2 className="text-xl text-cyan-200">Life Stat Card</h2>
            {(Object.entries(displayData.stats) as [keyof AlterEgoResult["stats"], number][]).map(([key, value]) => (
              <StatBar key={key} label={formatStatLabel(key)} value={value} />
            ))}
          </section>
        </div>

        <section className="rounded-3xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-panel backdrop-blur-lg">
          <h2 className="text-xl text-cyan-200">Origin Story</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-200">
            {displayData.origin_story.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-panel backdrop-blur-lg sm:grid-cols-2">
          <div>
            <h2 className="text-lg text-cyan-200">Strengths</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {strengths.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg text-amber-200">Weaknesses</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {weaknesses.map((item, index) => (
                <li key={`${item}-${index}`}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={downloadCard}
            className="rounded-full border border-cyan-300/70 bg-cyan-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100 transition hover:bg-cyan-400/20"
          >
            Download My Alter Ego Card
          </button>
          <button
            type="button"
            onClick={() => setShadowMode((current) => !current)}
            className="rounded-full border border-amber-300/70 bg-amber-400/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-amber-100 transition hover:bg-amber-400/20"
          >
            {shadowMode ? "Exit Shadow Mode" : "Shadow Mode"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/questions")}
            className="rounded-full border border-slate-400/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-100 transition hover:bg-slate-800/70"
          >
            Regenerate
          </button>
        </section>
      </div>
    </main>
  );
}
