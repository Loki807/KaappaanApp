import api from "../utils/api";

export const sendSOS = (payload: any) =>
  api.post("/alert/create", payload);
