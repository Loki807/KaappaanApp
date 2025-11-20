// src/utils/api.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const BASE_URL =
  "https://discriminatingly-gnarly-emerita.ngrok-free.dev/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Attach token to requests
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
