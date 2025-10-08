// src/auth.ts
const TOKEN_KEY = "cf_token";
const USER_KEY = "cf_user";

export function loadAuth() {
  return {
    token: localStorage.getItem(TOKEN_KEY),
    username: localStorage.getItem(USER_KEY),
  };
}

export function saveAuth(token: string, username: string) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, username);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isLoggedIn() {
  return !!localStorage.getItem(TOKEN_KEY);
}

export const API_BASE = "http://localhost:8000";

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json(); // {token, username}
}

export async function register(username: string, email: string, password: string, first_name?: string) {
  const res = await fetch(`${API_BASE}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, first_name }),
  });
  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

export async function logoutServer(token: string | null) {
  if (!token) return;
  await fetch(`${API_BASE}/logout/`, {
    method: "POST",
    headers: { Authorization: `Token ${token}` },
  }).catch(() => {});
}
