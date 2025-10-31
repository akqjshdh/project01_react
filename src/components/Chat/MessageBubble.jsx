import React from "react";

export default function MessageBubble({ sender, text, extra }) {
  return (
    <div
      style={{
        textAlign: sender === "user" ? "right" : "left",
        margin: "8px 0",
      }}
    >
      {sender === "user" ? (
        <b>🧍 {text}</b>
      ) : (
        <div>
          <div>🤖 {text}</div>
          {extra && (
            <img
              src={extra}
              alt="상품"
              width="140"
              style={{
                borderRadius: 8,
                marginTop: 6,
                border: "1px solid #ddd",
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
