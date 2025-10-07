import { api } from "./api";

export interface User {
  firstName: string;
  email: string;
  balance: number;
  username: string;
}

export async function getUser(): Promise<User> {
  const res = await api.get("/user/");
  return res.data;
}