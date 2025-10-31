import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8090/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("상품 불러오기 실패:", err));
  }, []);

  return (
    <div>
      <h2>상품 목록</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {p.price?.toLocaleString()}원  
            <br />
            제조사: {p.manufacturer}
            <br />
            공급업체: {p.supplier}
            <br />
            카테고리: {p.categoryLarge} &gt; {p.categoryMedium} &gt; {p.categoryName}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
