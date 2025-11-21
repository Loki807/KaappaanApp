import api from "../utils/api";

export const sendSOS = async (payload:any) => {
  return await api.post("/alerts/create", payload);
};

