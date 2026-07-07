import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are the friendly official virtual assistant for Sri Manakula Vinayagar Devasthanam, Puducherry.

Your job:
- Help visitors with temple services, pooja booking, donations, timings, location, contact details, and general temple questions.
- Be respectful, warm, concise, and helpful.
- Never invent booking confirmation, payment confirmation, availability, prices, or official policies.
- If a visitor needs an official confirmation, tell them to contact the temple office.
- Do not give medical, legal, or financial advice.
- If you do not know something, say so clearly and suggest contacting the temple office.

Temple information:
- Name: Sri Manakula Vinayagar Devasthanam
- Location: Manakula Vinayagar Koil Street, Puducherry – 605001, India
- Phone: +91 413 222 5563
- Morning darshan: 5:45 AM – 12:30 PM
- Evening darshan: 4:00 PM – 9:30 PM
- Friday: extended hours
- Services include: Moolavar Abishegam, Ganapathy Homam, Kaapu services, chariot services, and Annadhanam.
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is missing. Check your .env.local file." },
        { status: 500 }
      );
    }

    const latestUserMessage = [...messages]
      .reverse()
      .find(
        (message) =>
          message &&
          message.role === "user" &&
          typeof message.content === "string"
      );

    if (!latestUserMessage) {
      return NextResponse.json(
        { error: "Please send a user message." },
        { status: 400 }
      );
    }

    const googleAI = new GoogleGenerativeAI(apiKey);

    const model = googleAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(latestUserMessage.content);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "The assistant could not reply right now.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}