import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send } from "lucide-react";

interface ChatMessage {
  userId: string;
  username: string;
  text: string;
}

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  currentUserId: string;
}

function ChatPanel({
  messages,
  onSendMessage,
  currentUserId,
}: ChatPanelProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const text = message.trim();

    if (!text) return;

    onSendMessage(text);
    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <section className="flex min-h-75 flex-col rounded-2xl border border-white/[0.07] bg-[#0d1224] lg:min-h-0">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <MessageSquare className="size-4 text-cyan-400" />

        <h3 className="text-sm font-bold tracking-tight text-white">
          Live Chat
        </h3>
      </div>

      {/* Messages */}
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="py-4 text-center text-xs text-slate-500">
            No messages yet.
          </p>
        ) : (
          messages.map((msg, index) => {
            const isYou = msg.userId === currentUserId;

            return (
              <div key={`${msg.userId}-${index}`} className="flex flex-col gap-0.5">
                <span
                  className={`text-xs font-semibold ${
                    isYou ? "text-violet-400" : "text-cyan-400"
                  }`}
                >
                  {isYou ? "You" : msg.username}
                </span>

                <p className="wrap-break-word text-sm leading-snug text-slate-300">
                  {msg.text}
                </p>
              </div>
            );
          })
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/[0.07] p-3">
        <div className="flex items-center gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing || e.keyCode === 229) return;

              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            type="text"
            placeholder="Type a message..."
            className="h-10 min-w-0 flex-1 rounded-lg border border-white/[0.07] bg-[#111827] px-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
          />

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
              message.trim()
                ? "bg-cyan-400/15 text-cyan-400 hover:bg-cyan-400/25"
                : "cursor-not-allowed bg-[#111827] text-slate-600"
            }`}
            aria-label="Send message"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ChatPanel;