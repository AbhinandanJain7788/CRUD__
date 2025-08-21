// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://crud-1-bq3y.onrender.com/api", // backend server
});

// Add token automatically if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
