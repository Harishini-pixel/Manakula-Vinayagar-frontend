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

    // If no API key is present, or FALLBACK_CHATBOT is enabled,
    // use a local keyword-based fallback so the assistant still responds.
    const useFallback = !apiKey || process.env.FALLBACK_CHATBOT === "1";

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

    // Simple keyword-based fallback reply generator
    const generateFallbackReply = (text: string) => {
      const t = text.toLowerCase();

      if (t.includes("book") || t.includes("pooja") || t.includes("service")) {
        return `To book a pooja, please call the temple office at +91 413 222 5563 or visit the temple booking counter. I can guide you through typical steps but cannot make reservations or confirm availability.`;
      }

      if (t.includes("donat") || t.includes("undiyal")) {
        return `Donations and E-Undiyal are accepted at the temple office. For details, please contact +91 413 222 5563. If you want, I can summarize common donation options.`;
      }

      if (t.includes("time") || t.includes("darshan") || t.includes("timing")) {
        return `Morning darshan: 5:45 AM – 12:30 PM. Evening darshan: 4:00 PM – 9:30 PM. Fridays may have extended hours.`;
      }

      if (t.includes("contact") || t.includes("address") || t.includes("phone")) {
        return `Sri Manakula Vinayagar Devasthanam\nManakula Vinayagar Koil Street, Puducherry – 605001, India\nPhone: +91 413 222 5563`;
      }

      // Generic fallback
      return `I’m sorry — the temple assistant is temporarily unavailable to generate smart replies. For immediate help, please call +91 413 222 5563 or ask about bookings, donations, or timings and I'll provide the available information.`;
    };

    if (useFallback) {
      const reply = generateFallbackReply(latestUserMessage.content);
      return NextResponse.json({ reply });
    }

    // Try the Google Generative API, but fall back if it fails (quota, rate-limit, etc.)
    try {
      const googleAI = new GoogleGenerativeAI(apiKey);

      const model = googleAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: SYSTEM_PROMPT,
      });

      const result = await model.generateContent(latestUserMessage.content);
      const reply = result.response.text();

      return NextResponse.json({ reply });
    } catch (googleError) {
      console.error("Generative API error, falling back:", googleError);

      const errMsg =
        googleError instanceof Error ? googleError.message : String(googleError);

      // If the error looks like a quota/rate-limit issue, return a friendly fallback reply.
      if (
        /quota|limit|429|rate-?limit|too many requests|unauthori[sz]ed|401|invalid authentication|access_token_type_unsupported/i.test(
          errMsg
        )
      ) {
        const reply = generateFallbackReply(latestUserMessage.content);
        return NextResponse.json({ reply });
      }

      // Otherwise surface the error for debugging but provide a minimal friendly message.
      return NextResponse.json(
        { error: errMsg || "The assistant could not reply right now." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Chat API error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "The assistant could not reply right now.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}