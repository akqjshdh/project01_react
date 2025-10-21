import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chat.css"; // ✅ 스타일 분리

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "안녕하세요 👋 무엇을 찾고 계신가요?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8090/api/ai/search", {
        query: input,
      });
      const products = Array.isArray(res?.data) ? res.data : [];
      if (products.length === 0) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "죄송해요 😢 관련 상품을 찾을 수 없어요." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `${products.length}개의 상품을 찾았어요 👇`, products },
        ]);
      }
    } catch (e) {
      console.error("⚠️ 서버 호출 중 오류:", e);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "서버와 통신 중 문제가 발생했어요 😢\n잠시 후 다시 시도해주세요.",
        },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") send();
  };

  return (
    <div className="chat-container">
      <header className="chat-header">AI 쇼핑 어시스턴트</header>

      <main className="chat-main">
        {messages.map((m, i) => (
          <div key={i} className={`message-wrapper ${m.sender}`}>
            {m.products ? (
              <div className="product-grid">
                {m.products.map((p) => (
                  <div key={p.id} className="product-card">
                    <img
                      src={p.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                      alt={p.name}
                      className="product-image"
                    />
                    <div className="product-name">{p.name}</div>
                    {p.brand && <div className="product-brand">{p.brand}</div>}
                    <div className="product-price">
                      {(p.price || 0).toLocaleString()}원
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`message-bubble ${m.sender}`}>{m.text}</div>
            )}
          </div>
        ))}
        {loading && <div className="loading-msg">🤖 상품을 찾는 중이에요...</div>}
        <div ref={chatEndRef} />
      </main>

      <footer className="chat-footer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="예: 어머니 선물용 따뜻한 조끼 추천해줘"
          className="chat-input"
          disabled={loading}
        />
        <button onClick={send} disabled={loading} className="chat-btn">
          {loading ? "검색 중..." : "보내기"}
        </button>
      </footer>
    </div>
  );
}
