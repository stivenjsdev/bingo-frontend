import api from "@/lib/axios";
import { isAxiosError } from "axios";
// types
import { Player, PlayerLoginForm } from "../types";

export async function getUser() {
  try {
    const { data } = await api("api/auth/user");
    return data as Player;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function authenticateUser(formData: PlayerLoginForm) {
  try {
    const url = "api/auth/login";
    const { data } = await api.post<{ token: string }>(url, formData);
    localStorage.setItem("AUTH_TOKEN", data.token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
