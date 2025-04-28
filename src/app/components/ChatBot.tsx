"use client";

import { useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";

const WELCOME_PROMPTS = [
  "Hi there! How can I help you with gigs today?",
  "Hello! Looking for help with your gigs?",
  "Hey! Need assistance finding or posting a gig?",
];

const FAQ_RESPONSES: Record<string, string> = {
  "how to post":
    "To post a gig, go to the 'Post a Gig' tab and fill out the form.",
  "how to find":
    "Use the search bar or filters on the gigs page to discover available gigs.",
  "what is gigbot":
    "GigBot is your personal gig assistant 🧠 Ask me anything about using this platform!",
};

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function ChatbotWidget() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    if (!showChatbot) {
      const welcome =
        WELCOME_PROMPTS[Math.floor(Math.random() * WELCOME_PROMPTS.length)];
      setMessages([{ from: "bot", text: welcome }]);
    }
  };

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const addBotMessage = (text: string) => {
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text }]);
      setTyping(false);
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");

    const lower = userText.toLowerCase();
    const match = Object.keys(FAQ_RESPONSES).find((key) => lower.includes(key));

    addBotMessage(
      match
        ? FAQ_RESPONSES[match]
        : "Hmm... I’m not sure about that. Try asking in a different way?"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleChatbot}
        className="bg-violet-600 hover:bg-violet-700 text-white rounded-full p-4 shadow-lg transition"
      >
        <FaRobot className="text-2xl" />
      </button>

      {showChatbot && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-violet-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">GigBot Assistant</h3>
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-violet-200 text-lg"
            >
              ×
            </button>
          </div>

          <div
            ref={containerRef}
            className="p-4 h-64 overflow-y-auto text-sm text-gray-700 space-y-2"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap ${
                  msg.from === "bot"
                    ? "text-violet-700"
                    : "text-right text-gray-900"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {typing && (
              <div className="italic text-violet-500">GigBot is typing...</div>
            )}
          </div>

          <div className="border-t p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
