import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
class ProductService {
  async request(config: any) {
    try {
      const response = await axiosInstance(config);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "An error occurred";
      throw new Error(message);
    }
  }
  getAllProduct() {
    return this.request({
      url: "/v1/auth/display",
      method: "GET",
    });
  }

  getProductById(id: string) {
    return this.request({
      url: `/v1/auth/product/${id}`,
      method: "GET",
    });
  }
}

export const productService = new ProductService();
