import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextResponse } from "next/server";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    // Call the LLM with the prompt
    const result = streamText({
      model: google("gemini-1.5-flash"),
      prompt: "Give me any three random open ended questions. Each question must be separated by '||'.",
    })
    
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    )
    ;
  }
}
