import { useState } from "react";

interface ChatMessage {
  userId: string;
  username: string;
  text: string;
}

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

function ChatPanel({ messages, onSendMessage }: ChatPanelProps) {
  const [message, setMessage] = useState("");
  const handleSend = () => {
    const text = message.trim();

    if (!text) return;

    onSendMessage(text);
    setMessage("");
  };

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6">
      <h2 className="text-2xl font-bold mb-6">Chat</h2>

      <div className="space-y-4 mb-6">
        {messages.map((msg, index) => (
          <div key={index}>
            <p className="font-semibold">{msg.username}</p>

            <p className="text-gray-400">{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type a message..."
          className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700 px-4 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;
