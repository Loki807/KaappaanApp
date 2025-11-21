import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const BASE_URL = "https://kaappaan.duckdns.org/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
