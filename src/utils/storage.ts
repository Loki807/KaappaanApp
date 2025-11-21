import * as SecureStore from "expo-secure-store";

export const saveToken = async (token: string) =>
  SecureStore.setItemAsync("token", token);

export const saveUser = async (name: string) =>
  SecureStore.setItemAsync("name", name);

export const saveEmail = async (email: string) =>
  SecureStore.setItemAsync("email", email);

export const saveCitizenId = async (id: string) =>
  SecureStore.setItemAsync("citizenId", id);

/* ---------------- GETTERS ---------------- */

export const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};

export const getCitizenId = async () => {
  return await SecureStore.getItemAsync("citizenId");
};

export const getEmail = async () => {
  return await SecureStore.getItemAsync("email");
};

export const getUserName = async () => {
  return await SecureStore.getItemAsync("name");
};

/* Convenience: return full citizen object */
export const getCitizen = async () => {
  const id = await SecureStore.getItemAsync("citizenId");
  const name = await SecureStore.getItemAsync("name");
  const email = await SecureStore.getItemAsync("email");

  if (!id) return null;

  return { id, name, email };
};


/* ---------------- LOGOUT ---------------- */

export const clearAll = async () => {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("citizenId");
  await SecureStore.deleteItemAsync("name");
  await SecureStore.deleteItemAsync("email");
};
export const logout = async () => {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("citizenId");
  await SecureStore.deleteItemAsync("email");
  await SecureStore.deleteItemAsync("name");
};
