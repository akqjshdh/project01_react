export default function handleProductSearch(data, addMessage) {
  if (Array.isArray(data.products) && data.products.length > 0) {
    addMessage(
      "bot",
      `🔍 "${data.keyword}" 관련 상품 ${data.products.length}개를 찾았어요!`
    );

    data.products.forEach((p) =>
      addMessage(
        "bot",
        `${p.number}. ${p.name} — ${Number(p.price).toLocaleString()}원 (${
          p.brand || p.manufacturer || "브랜드 미상"
        })`,
        p.image_url || p.imageUrl || null
      )
    );
  } else {
    addMessage("bot", "🤖 관련 상품을 찾지 못했습니다.");
  }
}
