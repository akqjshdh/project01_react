import React, { useState } from "react";

export default function MessageInput({ onSend, loading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="예: 커피 찾아줘 / 장바구니 보여줘"
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "10px 16px",
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: 6,
        }}
      >
        전송
      </button>
    </form>
  );
}
