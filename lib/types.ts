export interface AlterEgoResult {
  name: string;
  tagline: string;
  dominant_trait: string;
  shadow_trait: string;
  risk_appetite: string;
  leadership_style: string;
  emotional_pattern: string;
  career_path: string;
  five_year_roadmap: string[];
  stats: {
    discipline: number;
    creativity: number;
    risk_tolerance: number;
    emotional_control: number;
    strategic_thinking: number;
  };
  origin_story: string;
}

export type StatKey = keyof AlterEgoResult["stats"];
