export default function handleCartView(data, addMessage) {
  if (Array.isArray(data.cartItems) && data.cartItems.length > 0) {
    addMessage(
      "bot",
      `🧺 현재 장바구니 목록이에요 (${data.cartItems.length}개):`
    );
    data.cartItems.forEach((item, idx) =>
      addMessage(
        "bot",
        `${idx + 1}. 상품ID ${item.productId} — 수량: ${item.quantity}개 — ${Number(
          item.price
        ).toLocaleString()}원`
      )
    );
  } else {
    addMessage("bot", "🧺 장바구니가 비어 있습니다.");
  }
}
