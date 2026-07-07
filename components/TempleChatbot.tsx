"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE =
  "Vanakkam! I’m the Sri Manakula Vinayagar assistant. I can help with pooja bookings, donations, temple services, timings, location, and general questions. How may I help you today?";

const QUICK_ACTIONS = [
  { label: "Book a Pooja", hint: "How do I book a pooja or service?" },
  { label: "Donate", hint: "Tell me about donations and E-Undiyal." },
  { label: "Temple Timings", hint: "What are the temple darshan timings?" },
  { label: "Services", hint: "What services are available at the temple?" },
  { label: "Contact", hint: "What is the temple address and contact number?" },
];

export default function TempleChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, error]);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = async (textFromButton?: string) => {
    const text = (textFromButton ?? input).trim();

    if (!text || loading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: text,
            },
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to get a reply right now.");
      }

      const assistantReply =
        data.reply ||
        data.message ||
        "I’m sorry, I could not answer that right now.";

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: assistantReply,
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
          open ? "pointer-events-none scale-75 opacity-0" : "opacity-100"
        }`}
        style={{
          background: "linear-gradient(135deg, #D4AF37 0%, #E07A00 100%)",
        }}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6 text-bg-deep" />
      </button>

      <div
        className={`fixed inset-0 z-[70] transition-all duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setOpen(false)}
        />

        <div
          className={`absolute bottom-0 right-0 h-[85dvh] w-full max-w-md transition-all duration-300 md:bottom-5 md:right-5 md:h-[600px] md:rounded-2xl md:shadow-2xl ${
            open ? "translate-y-0" : "translate-y-8"
          }`}
          style={{ background: "#0A0806" }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex h-full flex-col overflow-hidden rounded-t-2xl border border-gold-primary/15 md:rounded-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-gold-primary/10 px-4 py-3 md:px-5 md:py-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4AF37 0%, #E07A00 100%)",
                  }}
                >
                  <Sparkles className="h-4 w-4 text-bg-deep" />
                </div>

                <div>
                  <p className="font-heading text-base font-semibold leading-tight text-ivory">
                    Temple Assistant
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-gold-dim">
                    Sri Manakula Vinayagar Devasthanam
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ivory-dim transition-colors duration-200 hover:bg-white/5 hover:text-ivory"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 md:px-5">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed md:max-w-[80%] ${
                      message.role === "user"
                        ? "rounded-tr-md bg-gold-primary/15 text-ivory"
                        : "glass rounded-tl-md text-ivory-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="glass flex items-center gap-1.5 rounded-2xl rounded-tl-md px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-primary/60" />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-primary/60"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-primary/60"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="flex justify-center">
                  <div className="max-w-xs rounded-card border border-maroon/30 bg-maroon/20 px-4 py-2.5 text-center text-xs text-ivory-dim">
                    <p>{error}</p>
                    <button
                      onClick={() => {
                        const lastUserMessage = [...messages]
                          .reverse()
                          .find((message) => message.role === "user");

                        if (lastUserMessage) {
                          sendMessage(lastUserMessage.content);
                        }
                      }}
                      className="mt-1 inline-block text-gold-primary underline hover:text-gold-light"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="space-y-2 pt-2">
                  <p className="font-mono text-[10px] uppercase tracking-wide text-gold-dim">
                    Quick questions
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map((action) => (
                      <button
                        key={action.label}
                        type="button"
                        onClick={() => sendMessage(action.hint)}
                        className="rounded-full border border-gold-primary/20 px-3 py-1.5 text-xs text-gold-primary/80 transition-all duration-200 hover:border-gold-primary/40 hover:bg-gold-primary/10"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-ivory-dim/50">
                  AI assistant — please verify important booking and payment details
                </span>
              </div>

              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex shrink-0 items-center gap-2 border-t border-gold-primary/10 px-4 py-3 md:px-5"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about the temple..."
                disabled={loading}
                className="flex-1 rounded-full border border-white/10 bg-bg-raised px-4 py-2.5 text-sm text-ivory outline-none transition-colors duration-200 placeholder:text-ivory-dim/40 focus:border-gold-primary/40 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-30"
                style={{
                  background:
                    !input.trim() || loading
                      ? "rgba(255,255,255,0.1)"
                      : "linear-gradient(135deg, #D4AF37 0%, #E07A00 100%)",
                }}
                aria-label="Send message"
              >
                <Send className="h-4 w-4 text-bg-deep" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}