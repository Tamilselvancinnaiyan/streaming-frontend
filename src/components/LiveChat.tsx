"use client";

import React, { useState } from "react";
import { Send, Smile, MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { ChatMessage } from "@/hooks/useLiveKit";

interface LiveChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export default function LiveChat({ messages, onSendMessage }: LiveChatProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3 className="chat-title">Live Chat</h3>
        <button className="icon-btn">
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="messages-area">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`message-bubble ${msg.isSuperChat ? "super-chat" : ""} ${msg.isHost ? "host-msg" : ""}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <img src={msg.avatar} alt={msg.user} className="user-avatar" />
              <div className="msg-content">
                <span className="username">
                  {msg.user}{" "}
                  {msg.isHost && <span className="host-tag">Host</span>}
                </span>
                <p className="text">{msg.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="chat-input-area">
        <div className="input-wrapper">
          <button className="emoji-btn">
            <Smile size={20} />
          </button>
          <input
            type="text"
            placeholder="Write a message..."
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="send-btn" onClick={handleSend}>
            <Send size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--card);
          border-left: 1px solid var(--border);
        }

        .chat-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-title {
          font-size: 1rem;
          font-weight: 600;
        }

        .messages-area {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .message-bubble {
          display: flex;
          gap: 0.75rem;
        }

        .super-chat {
          background: rgba(99, 102, 241, 0.1);
          padding: 0.75rem;
          border-radius: 0.5rem;
          border-left: 3px solid var(--primary);
        }

        .host-msg .username {
          color: var(--primary);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .msg-content {
          flex: 1;
        }

        .username {
          display: block;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--muted);
          margin-bottom: 0.125rem;
        }

        .text {
          font-size: 0.875rem;
          color: var(--foreground);
          line-height: 1.4;
        }

        .host-tag {
          font-size: 0.625rem;
          background: var(--primary);
          color: white;
          padding: 0.125rem 0.375rem;
          border-radius: 9999px;
          margin-left: 0.25rem;
        }

        .chat-input-area {
          padding: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--background);
          border: 1px solid var(--border);
          padding: 0.5rem 0.75rem;
          border-radius: 0.75rem;
        }

        .chat-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--foreground);
          font-size: 0.875rem;
        }

        .icon-btn,
        .emoji-btn,
        .send-btn {
          background: transparent;
          border: none;
          color: var(--muted);
          cursor: pointer;
          transition: color 0.2s;
        }

        .send-btn {
          color: var(--primary);
        }

        .send-btn:hover {
          color: var(--primary-hover);
        }
      `}</style>
    </div>
  );
}
