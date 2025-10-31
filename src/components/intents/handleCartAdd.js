// src/intents/handleCartAdd.js
export default function handleCartAdd(data, addMessage) {
  if (!data) {
    addMessage("bot", "⚠️ 장바구니 데이터가 없습니다.");
    return;
  }

  // ✅ 성공적으로 장바구니에 추가된 경우
  if (data.addedProduct) {
    addMessage(
      "bot",
      `🛒 "${data.addedProduct.name || "상품"}"을(를) 장바구니에 담았습니다!`
    );
  } else if (data.message) {
    // ✅ 백엔드에서 보낸 메시지 출력
    addMessage("bot", data.message);
  } else {
    // ✅ 예외 처리
    addMessage("bot", "⚠️ 장바구니 추가 중 오류가 발생했습니다.");
  }
}
