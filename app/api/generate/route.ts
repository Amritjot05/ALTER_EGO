import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompt";
import { buildFallbackResult, normalizeResult } from "@/utils/helpers";

interface GenerateRequestBody {
  answers?: string[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequestBody;
    const answers = Array.isArray(body.answers) ? body.answers.slice(0, 5) : [];

    if (answers.length < 5 || answers.some((entry) => !String(entry).trim())) {
      return NextResponse.json({ error: "Please provide all five answers." }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(buildFallbackResult(answers));
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: buildSystemPrompt()
        },
        {
          role: "user",
          content: buildUserPrompt(answers)
        }
      ]
    });

    const raw = completion.choices[0]?.message?.content || "{}";
    let parsed: unknown = {};

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = buildFallbackResult(answers);
    }

    return NextResponse.json(normalizeResult(parsed));
  } catch (error) {
    console.error("/api/generate failed", error);
    return NextResponse.json({ error: "Generation failed." }, { status: 500 });
  }
}
