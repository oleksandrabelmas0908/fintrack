// src/pages/Login.tsx
import React, { useState } from "react";
import { login, saveAuth } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(username, password);
      saveAuth(data.token, data.username);
      toast.success("Logged in!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid username or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-xl shadow-md w-80 flex flex-col gap-3"
      >
        <h2 className="text-lg font-semibold text-center">Login</h2>
        <input
          className="border rounded px-3 py-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
