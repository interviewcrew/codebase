import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { interviews } from "@/db/schema";
import { eq } from "drizzle-orm";

type TokenUsage = {
  source: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  created_at: string;
};

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("x-secret");
  if (authHeader !== process.env.AGENT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { interviewId, usage } = body;

  if (!interviewId || !usage) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const [interview] = await db
      .select({ tokenUsage: interviews.tokenUsage })
      .from(interviews)
      .where(eq(interviews.id, interviewId));

    if (!interview) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 });
    }

    const currentUsage = (interview.tokenUsage as TokenUsage[]) || [];
    const newUsage: TokenUsage = {
      ...usage,
      source: "agent", // specific source for realtime agent
      created_at: new Date().toISOString(),
    };

    await db
      .update(interviews)
      .set({
        tokenUsage: [...currentUsage, newUsage],
      })
      .where(eq(interviews.id, interviewId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving token usage:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

