import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import { getCart } from "../../../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, cart, totalPrice, error } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading cart…</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  if (!cart || cart.items.length === 0)
    return <p style={{ textAlign: "center" }}>Your cart is empty!</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🛒 My Cart</h2>
      {cart.items.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <p>
            <strong>Product:</strong>{" "}
            {typeof item.productId === "object"
              ? item.productId.name
              : item.productId}
          </p>
          <p>Quantity: {item.quantity}</p>
          <hr />
        </div>
      ))}

      <h3>Total Price: ₹{totalPrice}</h3>
    </div>
  );
};

export default Cart;
