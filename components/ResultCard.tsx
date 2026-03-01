import { AlterEgoResult } from "@/lib/types";

interface ResultCardProps {
  data: AlterEgoResult;
  mode: "alter" | "shadow";
}

export default function ResultCard({ data, mode }: ResultCardProps) {
  return (
    <section className="rounded-3xl border border-slate-700/60 bg-slate-900/35 p-6 shadow-panel backdrop-blur-lg">
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">{mode === "alter" ? "Identity" : "Shadow Identity"}</p>
      <h1 className="mt-3 text-3xl text-slate-100 sm:text-5xl">{data.name}</h1>
      <p className="mt-3 text-base italic text-slate-300">{data.tagline}</p>
    </section>
  );
}
