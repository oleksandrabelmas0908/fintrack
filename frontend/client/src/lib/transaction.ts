import { api } from "./api";

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  category?: string;
}

export async function getTransactions(): Promise<Transaction[]> {
  const response = await api.get("/transactions/");
  return response.data;
}
