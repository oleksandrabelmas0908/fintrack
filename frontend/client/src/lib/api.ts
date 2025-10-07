import axios from "axios";

const BASE_URL = "http://0.0.0.0:8000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add access token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Optional: handle unauthorized (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login"; // you'll add this later
    }
    return Promise.reject(error);
  }
);
