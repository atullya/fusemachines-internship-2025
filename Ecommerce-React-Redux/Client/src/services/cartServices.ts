import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
class CartService {
  async request(config: any) {
    try {
      const response = await axiosInstance(config);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "An error occurred";
      throw new Error(message);
    }
  }
  addToCart(productId: string, quantity: number) {
    return this.request({
      url: "/v1/cart/add-to-cart",
      method: "POST",
      data: { productId, quantity },
    });
  }
  getCart() {
    return this.request({
      url: "v1/cart/get-cart-items",
      method: "GET",
    });
  }
}

export const cartService = new CartService();
