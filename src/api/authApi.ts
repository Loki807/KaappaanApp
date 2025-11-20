// src/api/authApi.ts
import api from "../utils/api";

// REGISTER
export const registerRequest = async (data: any) => {
  return await api.post("/Citizen/register", data);
};

// LOGIN (Citizen)
export const loginRequest = async (email: string, password: string) => {
  return await api.post("/auth/login", { email, password });
};

// VERIFY OTP
export const verifyOtpRequest = async (email: string, otp: string) => {
  return await api.post("/auth/verify-otp", { email, otp });
};
