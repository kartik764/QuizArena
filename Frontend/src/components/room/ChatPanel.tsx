function ChatPanel() {
  const messages = [
    {
      user: "Brainiac",
      text: "This one is easy!",
    },
    {
      user: "Smartypants",
      text: "I think it's H2O",
    },
    {
      user: "TriviaKing",
      text: "Let's gooo!",
    },
  ];

  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Chat
      </h2>

      <div className="space-y-4 mb-6">

        {messages.map((msg, index) => (
          <div key={index}>

            <p className="font-semibold">
              {msg.user}
            </p>

            <p className="text-gray-400">
              {msg.text}
            </p>

          </div>
        ))}

      </div>

      <input
        type="text"
        placeholder="Type a message..."
        className="w-full bg-[#111827] border border-gray-700 rounded-xl px-4 py-3 outline-none"
      />

    </div>
  );
}

export default ChatPanel;