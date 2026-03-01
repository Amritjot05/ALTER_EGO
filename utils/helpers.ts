import { AlterEgoResult, StatKey } from "@/lib/types";

export const QUESTIONS = [
  "What is your biggest fear?",
  "What do you secretly want but rarely admit?",
  "What habit is holding you back?",
  "What environment makes you feel powerful?",
  "If money did not matter, what would you chase?"
];

const DEFAULT_RESULT: AlterEgoResult = {
  name: "Nova Riven - The Adaptive Strategist",
  tagline: "Disciplined under pressure. Focused on meaningful impact.",
  dominant_trait: "Calculated resilience",
  shadow_trait: "Perfection paralysis",
  risk_appetite: "Measured but bold when conviction is high",
  leadership_style: "Lead from the front, then delegate with precision",
  emotional_pattern: "Composed exterior, intense internal standards",
  career_path:
    "Started in a technical role, built cross-functional credibility, then launched a mission-driven venture that solved high-stakes operational problems.",
  five_year_roadmap: [
    "Year 1: Rebuild foundations and master one high-leverage skill.",
    "Year 2: Ship a visible project and gather uncomfortable feedback.",
    "Year 3: Take a public risk and own the outcome.",
    "Year 4: Build systems, not heroics, and scale execution.",
    "Year 5: Lead a category-defining initiative."
  ],
  stats: {
    discipline: 80,
    creativity: 84,
    risk_tolerance: 68,
    emotional_control: 72,
    strategic_thinking: 86
  },
  origin_story:
    "In one timeline, hesitation kept the edges of ambition dull. In this one, discomfort became training data. Every setback was logged, studied, and converted into better decisions.\n\nBy the time opportunities appeared, this version of you had already rehearsed pressure. They stopped waiting for confidence and started moving with clarity. Over five years, consistency turned into momentum, and momentum turned into influence."
};

function clampStat(value: unknown, fallback: number) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return fallback;
  }
  return Math.max(0, Math.min(100, Math.round(numeric)));
}

export function normalizeResult(input: unknown): AlterEgoResult {
  const payload = (typeof input === "object" && input !== null ? input : {}) as Partial<AlterEgoResult>;
  const stats = payload.stats ?? DEFAULT_RESULT.stats;

  return {
    name: payload.name?.trim() || DEFAULT_RESULT.name,
    tagline: payload.tagline?.trim() || DEFAULT_RESULT.tagline,
    dominant_trait: payload.dominant_trait?.trim() || DEFAULT_RESULT.dominant_trait,
    shadow_trait: payload.shadow_trait?.trim() || DEFAULT_RESULT.shadow_trait,
    risk_appetite: payload.risk_appetite?.trim() || DEFAULT_RESULT.risk_appetite,
    leadership_style: payload.leadership_style?.trim() || DEFAULT_RESULT.leadership_style,
    emotional_pattern: payload.emotional_pattern?.trim() || DEFAULT_RESULT.emotional_pattern,
    career_path: payload.career_path?.trim() || DEFAULT_RESULT.career_path,
    five_year_roadmap:
      Array.isArray(payload.five_year_roadmap) && payload.five_year_roadmap.length > 0
        ? payload.five_year_roadmap.slice(0, 5).map((item, index) => {
            const line = String(item ?? "").trim();
            return line || DEFAULT_RESULT.five_year_roadmap[index];
          })
        : DEFAULT_RESULT.five_year_roadmap,
    stats: {
      discipline: clampStat(stats.discipline, DEFAULT_RESULT.stats.discipline),
      creativity: clampStat(stats.creativity, DEFAULT_RESULT.stats.creativity),
      risk_tolerance: clampStat(stats.risk_tolerance, DEFAULT_RESULT.stats.risk_tolerance),
      emotional_control: clampStat(stats.emotional_control, DEFAULT_RESULT.stats.emotional_control),
      strategic_thinking: clampStat(stats.strategic_thinking, DEFAULT_RESULT.stats.strategic_thinking)
    },
    origin_story: payload.origin_story?.trim() || DEFAULT_RESULT.origin_story
  };
}

export function buildFallbackResult(answers: string[]): AlterEgoResult {
  const merged = `${answers.join(" ")}`.toLowerCase();
  const ambitionBoost = merged.includes("build") || merged.includes("startup") ? 6 : 0;
  const fearPenalty = merged.includes("failure") ? -5 : 0;

  return normalizeResult({
    ...DEFAULT_RESULT,
    name: "Arin Voss - The Relentless Architect",
    tagline: "Built from discipline. Forged in discomfort.",
    stats: {
      discipline: 82 + ambitionBoost,
      creativity: 88,
      risk_tolerance: 72 + fearPenalty,
      emotional_control: 66,
      strategic_thinking: 90
    }
  });
}

const STAT_LABELS: Record<StatKey, string> = {
  discipline: "Discipline",
  creativity: "Creativity",
  risk_tolerance: "Risk Tolerance",
  emotional_control: "Emotional Control",
  strategic_thinking: "Strategic Thinking"
};

export function formatStatLabel(key: StatKey) {
  return STAT_LABELS[key];
}

export function getTopStats(stats: AlterEgoResult["stats"]) {
  return (Object.entries(stats) as [StatKey, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, value]) => ({ key, label: formatStatLabel(key), value }));
}

export function getLowestStats(stats: AlterEgoResult["stats"]) {
  return (Object.entries(stats) as [StatKey, number][])
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([key, value]) => ({ key, label: formatStatLabel(key), value }));
}

export function buildShadowResult(source: AlterEgoResult): AlterEgoResult {
  return {
    ...source,
    name: `${source.name.split("-")[0].trim()} - The Unraveled Variant`,
    tagline: "Potential abandoned under the weight of avoidance.",
    dominant_trait: "Short-term comfort seeking",
    shadow_trait: "Self-betrayal through delay",
    risk_appetite: "Avoids visible risk, accepts hidden regret",
    leadership_style: "Withdraws when stakes rise",
    emotional_pattern: "Reactive loops and unfinished cycles",
    career_path:
      "Stayed in safe roles too long, postponed bold moves, and watched smaller opportunities replace the mission they once wanted.",
    five_year_roadmap: [
      "Year 1: Delays difficult decisions and calls it planning.",
      "Year 2: Stays busy but avoids meaningful exposure.",
      "Year 3: Comfort grows, conviction shrinks.",
      "Year 4: Tries to restart without consistent execution.",
      "Year 5: Realizes the price of hesitation."
    ],
    stats: {
      discipline: Math.max(18, source.stats.discipline - 28),
      creativity: Math.max(22, source.stats.creativity - 22),
      risk_tolerance: Math.max(14, source.stats.risk_tolerance - 30),
      emotional_control: Math.max(16, source.stats.emotional_control - 24),
      strategic_thinking: Math.max(20, source.stats.strategic_thinking - 26)
    },
    origin_story:
      "The shadow timeline did not collapse overnight. It eroded in micro-compromises: one missed promise, one delayed leap, one quiet surrender at a time.\n\nThis version still had talent, but no sustained standards. They optimized for relief over growth, and the future narrowed. Shadow Mode is the warning label for what happens when potential is never converted into action."
  };
}
