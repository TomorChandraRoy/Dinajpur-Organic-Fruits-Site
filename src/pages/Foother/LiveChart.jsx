import { useState } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

/* =========================
   Chat Message Component
========================= */
const ChatMessage = ({ msg }) => {
  return (
    <div
      className={`flex ${
        msg.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs md:max-w-sm px-4 py-2 rounded-lg text-sm ${
          msg.sender === "user"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-slate-800"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
};

/* =========================
   Main Component
========================= */
const  LiveChat = () =>{
  const [messages, setMessages] = useState([
    { text: "Hello 👋 How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // User message
    const newMsg = { text: input, sender: "user" };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Fake bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thanks! We will get back to you soon.", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md flex flex-col h-[600px]">

        {/* Header */}
        <div className="p-4 border-b flex items-center gap-2">
          <FaUserCircle className="text-2xl text-blue-600" />
          <h3 className="font-semibold text-slate-900">
            Live Chat Support
          </h3>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, index) => (
            <ChatMessage key={index} msg={msg} />
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
          >
            <FaPaperPlane />
          </button>
        </div>

      </div>
    </div>
  );
}
export default LiveChat;