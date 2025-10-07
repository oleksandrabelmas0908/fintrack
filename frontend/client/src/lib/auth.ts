import { api } from "./api";

export interface AuthResponse {
  token: string;
  refresh?: string;
}

export async function login(username: string, password: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/", { username, password });
  localStorage.setItem("access_token", response.data.token);
  return response.data;
}

export async function register(username: string, password: string, email: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/register/", { username, password, email });
  localStorage.setItem("access_token", response.data.token);
  return response.data;
}

export function logout() {
  localStorage.removeItem("access_token");
  window.location.href = "/login";
}
