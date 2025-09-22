import axios from 'axios'

const API_BASE_URL = "http://localhost:3000/api";
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // yo chai  cookies  send garna ko lagi (for JWT in cookies)
  headers: {
    "Content-Type": "application/json",
  },
});
interface RegisterUserData {
  name: string;
  email: string;
  password: string;

}
class APIService{
        async request(config:any) {
    try {
      const response = await axiosInstance(config);
      return response.data;
    } catch (err:any) {
      const message = err.response?.data?.message || "An error occurred";
      throw new Error(message);
    }
  }
  login(email:string,password:string){
    return this.request({
        url:'/v1/login',
        method:'POST',
        data:{email,password}
    })
  }
  register(userData: RegisterUserData) {
  return this.request({
    url: "/v1/register",
    method: "POST",
    data: userData,
  });
}
}
export const apiService = new APIService();
