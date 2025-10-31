import { useState } from "react";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const addMessage = (sender, text, extra = null) => {
    setMessages((prev) => [...prev, { sender, text, extra }]);
  };

  return { messages, setMessages, loading, setLoading, addMessage };
}
