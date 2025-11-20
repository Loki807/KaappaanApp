import api, { API } from "../apis/api";

export const registerCitizen = async (payload: any) => {
  try {
    const response = await api.post(API.REGISTER, payload);
    console.log("REGISTER RAW:", response.data);
    return response.data;
  } catch (error: any) {
    console.log("REGISTER ERROR:", error);
    return { error: true, message: "Network error" };
  }
};

export const loginCitizen = async (email: string, password: string) => {
  try {
    const response = await api.post(API.LOGIN, { email, password });
    console.log("LOGIN RAW:", response.data);
    return response.data;
  } catch (error: any) {
    console.log("LOGIN ERROR:", error);
    return { error: true, message: "Network error" };
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await api.post(API.VERIFY_OTP, { email, otp });
    console.log("VERIFY OTP RAW:", response.data);
    return response.data;
  } catch (error: any) {
    console.log("VERIFY OTP ERROR:", error);
    return { error: true, message: "Network error" };
  }
};
