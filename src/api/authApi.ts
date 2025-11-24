import api from "../utils/api";

export const registerRequest = (data: any) =>
  api.post("/Citizen/register", data);

export const loginRequest = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const verifyOtpRequest = (email: string, otp: string) =>
  api.post("/auth/verify-otp", { email, otp });
