// src/utils/storage.ts
import * as SecureStore from "expo-secure-store";

export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync("token", token);
};

export const saveUser = async (name: string) => {
  await SecureStore.setItemAsync("name", name);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};

export const clearAuth = async () => {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("name");
};
