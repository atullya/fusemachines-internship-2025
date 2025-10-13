import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchAllProduct, fetchProductById } from "../../store/productSlice";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";

// 🎨 Verified working images (checked for live URLs)
const images = [
  // Clothing
  "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=600",
  // Shoes
  "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
  // Accessories / misc.
  "https://images.pexels.com/photos/2988633/pexels-photo-2988633.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const DisplayAllProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  const navigate = useNavigate();
  if (loading) return <p style={{ textAlign: "center" }}>Loading…</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!products.length)
    return <p style={{ textAlign: "center" }}>No products found.</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px",
        padding: "2rem",
        background: "#fafafa",
      }}
    >
      {products.map((p) => {
        const randomImg = images[Math.floor(Math.random() * images.length)];
        return (
          <div
            onClick={() => {
              navigate(`/product/${p._id}`); // 👈 navigate to product page
            }}
            key={p._id}
            style={{
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={randomImg}
              alt={p.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "6px",
                marginBottom: "0.75rem",
              }}
            />
            <h3
              style={{
                margin: "0.25rem 0",
                fontSize: "1.1rem",
                textAlign: "center",
                color: "#333",
              }}
            >
              {p.name}
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#666",
                textAlign: "center",
                minHeight: "40px",
              }}
            >
              {p.description}
            </p>
            <h5
              style={{
                color: "#2c3e50",
                marginTop: "0.5rem",
              }}
            >
              Rs.{p.price}
            </h5>
            <button
              style={{
                color: "blue",
                padding: "2px 7px",
              }}
              onClick={() => {
                dispatch(addToCart({ productId: p._id }));
              }}
            >
              Add To Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayAllProduct;
