import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../store/productSlice";
import type { RootState, AppDispatch } from "../../store/store";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProduct, loading } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading || !selectedProduct) {
    return <p style={{ textAlign: "center" }}>Loading product details…</p>;
  }

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>{selectedProduct.name}</h2>
      <p style={{ textAlign: "center", color: "#555" }}>
        {selectedProduct.description}
      </p>
      <h3 style={{ textAlign: "center", color: "#2c3e50" }}>
        Price: Rs.{selectedProduct.price}
      </h3>
      <p style={{ textAlign: "center" }}>
        Category: {selectedProduct.category}
      </p>
      <button
        style={{
          display: "block",
          margin: "1rem auto",
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
};

export default ProductDetails;
