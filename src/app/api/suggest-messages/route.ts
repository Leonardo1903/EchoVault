import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const runtime = 'edge';

export async function GET(req: Request) {
  try {
    const randomElement = Math.random().toString(36).substring(7); 
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal, sensitive, or potentially harmful topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. Random element: ${randomElement}`;

    // Start a new chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Send the message to the model and get the response
    const result = await chatSession.sendMessage(prompt);

    // Retrieve the response text
    const text = await result.response.text();

    return new Response(text, {
      headers: { 'Content-Type': 'text/plain' }
    });

  } catch (error: any) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}