export function buildSystemPrompt() {
  return [
    "You are an expert psychological profiler and sci-fi world builder.",
    "Create an alternate universe version of this person based on their answers.",
    "The output must feel cinematic, realistic, specific, and deeply personal.",
    "Tone: motivational but never cheesy.",
    "Return only valid JSON with no markdown, no explanation, and no extra keys.",
    "Stats must be integers between 0 and 100.",
    "Roadmap must contain exactly five concise steps labeled by year intent."
  ].join(" ");
}

export function buildUserPrompt(answers: string[]) {
  return `
Analyze this person and generate their alternate-universe profile.

Fear: ${answers[0] ?? ""}
Secret Desire: ${answers[1] ?? ""}
Limiting Habit: ${answers[2] ?? ""}
Power Environment: ${answers[3] ?? ""}
True Calling: ${answers[4] ?? ""}

Return ONLY JSON in this exact shape:
{
  "name": "",
  "tagline": "",
  "dominant_trait": "",
  "shadow_trait": "",
  "risk_appetite": "",
  "leadership_style": "",
  "emotional_pattern": "",
  "career_path": "",
  "five_year_roadmap": ["", "", "", "", ""],
  "stats": {
    "discipline": 0,
    "creativity": 0,
    "risk_tolerance": 0,
    "emotional_control": 0,
    "strategic_thinking": 0
  },
  "origin_story": ""
}`.trim();
}
