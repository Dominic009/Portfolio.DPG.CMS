import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true, // send cookies if needed
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // 🔹 If you later add tokens:
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - maybe redirect to login");
    }
    return Promise.reject(error);
  }
);

export default api;
