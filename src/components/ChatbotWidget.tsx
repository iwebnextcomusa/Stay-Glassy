import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, AlertCircle, Bot, User, HelpCircle } from "lucide-react";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hello there! I is GlassyGPT, the official virtual concierge of StayGlassy.ca. How can I help you regarding our logical cards, classroom bundles, or delivery options today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest speech bubbles
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    setInputValue("");
    setErrorStatus(null);

    // Append User message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [...prev, { sender: "user", text: userText, time: timestamp }]);
    
    setIsTyping(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });

      if (!response.ok) {
        throw new Error("Chatbot service offline. Using intelligent client assistant.");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.text || "I was able to retrieve your inquiry, but returned an empty response. Let me know if I can detail California Core mapping or ordering options instead!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (e: any) {
      console.warn("Express chatbot endpoint failed, falling back to instant client simulation:", e);
      // Fallback response for testing preview stability without server start delay
      setTimeout(() => {
        let simulatedReply = "I am ready! We are Sacramento's premiere critical-thinking card makers. Feel free to explore our educators section, where teachers get 25% off classroom orders of 5 docks or more!";
        if (userText.toLowerCase().includes("curriculum") || userText.toLowerCase().includes("standard") || userText.toLowerCase().includes("ngss")) {
          simulatedReply = "StayGlassy aligns directly with the Next Generation Science Standards (NGSS) science practices under Argumentation from Evidence, and CCSS logic analysis models.";
        } else if (userText.toLowerCase().includes("price") || userText.toLowerCase().includes("cost") || userText.toLowerCase().includes("discount")) {
          simulatedReply = "The Core Deck starts at $24.99 with volume school district licenses scaling up to 30 decks. Browse the Shop section below to inspect available tiers!";
        } else if (userText.toLowerCase().includes("contact") || userText.toLowerCase().includes("dakota")) {
          simulatedReply = "You can directly call Dakota at 408-431-2665 or write an email to dakota@stayglassy.ca. We are located in Sacramento, CA!";
        } else if (userText.toLowerCase().includes("buy") || userText.toLowerCase().includes("ship")) {
          simulatedReply = "We ship anywhere in the US directly out of Sacramento! Checkout our integrated Shop options below to secure immediate school deliveries.";
        }
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: simulatedReply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 800);
    } finally {
      setIsTyping(false);
    }
  };

  const selectSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Button */}
      <button
        id="btn-chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center cursor-pointer shadow-xl shadow-orange-200 hover:bg-orange-600 hover:scale-105 transition-all duration-300"
        title="Chat with GlassyGPT"
        aria-label="Toggle chat widget"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Windows (Active when isOpen) */}
      {isOpen && (
        <div 
          id="chat-window-panel"
          className="absolute bottom-18 right-0 w-[350px] sm:w-[400px] h-[450px] max-h-[calc(100vh-140px)] rounded-3xl bg-[#fdfcf9] flex flex-col overflow-hidden border-2 border-indigo-100 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-300"
        >
          {/* Header */}
          <div className="p-4 bg-indigo-950 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-orange-400 animate-pulse" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black flex items-center gap-2">
                  GlassyGPT
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                </h4>
                <p className="text-[10px] text-indigo-250 font-mono tracking-wider opacity-85">Sacramento AI Concierge</p>
              </div>
            </div>
            
            <button
              id="btn-close-chat"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-indigo-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fdfcf9]">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`flex gap-3 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs border flex-shrink-0 ${
                  m.sender === "user" 
                    ? "bg-orange-100 text-orange-700 border-orange-200" 
                    : "bg-indigo-100 text-indigo-700 border-indigo-200"
                }`}>
                  {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Speech Balloon */}
                <div className="flex flex-col gap-1.5 text-left">
                  <div className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "bg-orange-500 text-white rounded-tr-none font-semibold shadow-md shadow-orange-100"
                      : "bg-white text-gray-803 text-indigo-950 border border-indigo-100 rounded-tl-none shadow-sm"
                  }`}>
                    {m.text}
                  </div>
                  <span className={`text-[9px] font-mono text-gray-400 ${m.sender === "user" ? "text-right" : "text-left"}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-indigo-100 flex items-center gap-1 shadow-sm">
                  <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions list */}
          <div className="px-4 py-2 border-t border-indigo-50 bg-indigo-50/30 flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
            <button
              onClick={() => selectSuggestedPrompt("Is StayGlassy standard aligned?")}
              className="text-[10px] bg-white hover:bg-indigo-50 text-indigo-900 font-bold px-2.5 py-1 rounded-full border border-indigo-105 border-indigo-100 transition-all cursor-pointer truncate max-w-full"
            >
              🎓 Standard Aligned?
            </button>
            <button
              onClick={() => selectSuggestedPrompt("Do you take school Purchase Orders?")}
              className="text-[10px] bg-white hover:bg-indigo-50 text-indigo-900 font-bold px-2.5 py-1 rounded-full border border-indigo-105 border-indigo-100 transition-all cursor-pointer truncate max-w-full"
            >
              📄 School PO Support?
            </button>
            <button
              onClick={() => selectSuggestedPrompt("Can I contact Dakota?")}
              className="text-[10px] bg-white hover:bg-indigo-50 text-indigo-900 font-bold px-2.5 py-1 rounded-full border border-indigo-105 border-indigo-100 transition-all cursor-pointer truncate max-w-full"
            >
              📞 Direct Contact Info?
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-indigo-100 flex gap-2">
            <input
              type="text"
              id="inp-chat-message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask GlassyGPT..."
              className="flex-1 bg-slate-50 border border-indigo-100 focus:border-indigo-300 rounded-xl px-3 py-2 text-xs text-indigo-950 placeholder-gray-400 focus:outline-none"
              disabled={isTyping}
            />
            <button
              type="submit"
              id="btn-send-message"
              className="p-2.5 rounded-xl bg-indigo-600 text-white flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 disabled:opacity-40"
              disabled={isTyping || !inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
