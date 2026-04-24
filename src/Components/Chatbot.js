import React, { useState, useRef, useEffect } from "react";
import api from "../API/api";
import "./Chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "AI", text: "Hello! I am your AI Healthcare Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: "User", text: userText }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await api.post("/chat", { message: userText });
      setMessages(prev => [...prev, { sender: "AI", text: response.data.response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: "AI", text: "Sorry, I couldn't process your request right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3 className="chatbot-header-title">
              <span className="online-dot"></span>
              Smart Assistant
            </h3>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.sender === 'AI' ? 'ai' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble ai loading">
                typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input-area" onSubmit={handleSend}>
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="chatbot-send" disabled={isLoading || !input.trim()}>
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
