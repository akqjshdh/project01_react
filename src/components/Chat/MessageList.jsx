import React from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, loading }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        height: 420,
        overflowY: "auto",
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        background: "#fafafa",
      }}
    >
      {messages.map((m, i) => (
        <MessageBubble key={i} sender={m.sender} text={m.text} extra={m.extra} />
      ))}

      {loading && <div style={{ textAlign: "center" }}>⌛ AI가 처리 중입니다...</div>}
    </div>
  );
}
