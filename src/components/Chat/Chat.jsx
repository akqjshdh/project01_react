import React, { useState } from "react";
import { sendMessageToAI } from "../../api/aiService";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

// intent handlers
import handleProductSearch from "../intents/handleProductSearch";
import handleCartAdd from "../intents/handleCartAdd";
import handleCartView from "../intents/handleCartView";
import handleGreeting from "../intents/handleGreeting";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const addMessage = (sender, text, extra = null) => {
    setMessages((prev) => [...prev, { sender, text, extra }]);
  };

  const handleSend = async (input) => {
    if (!input.trim()) return;
    addMessage("user", input);
    setLoading(true);

    try {
      const data = await sendMessageToAI(input);
      renderResponse(data);
    } catch (err) {
      console.error("❌ 요청 오류:", err);
      addMessage("bot", "⚠️ AI 서버 연결 실패");
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = (data) => {
    const intent = data.intent;
    switch (intent) {
      case "product_search":
        handleProductSearch(data, addMessage);
        break;
      case "cart_add":
        handleCartAdd(data, addMessage);
        break;
      case "cart_view":
        handleCartView(data, addMessage);
        break;
      case "greeting":
        handleGreeting(addMessage);
        break;
      default:
        addMessage("bot", data.message || "🤖 처리할 수 없는 요청입니다.");
    }
  };

  return (
    
    <div style={{ padding: 20, maxWidth: 650, margin: "0 auto" }}>
      <h2>🛍️ AI 쇼핑 어시스턴트</h2>
      <MessageList messages={messages} loading={loading} />
      <MessageInput onSend={handleSend} loading={loading} />
    </div>
  );
}
