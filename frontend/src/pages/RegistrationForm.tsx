// src/pages/Login.tsx
import React, { useState } from "react";
import { register, saveAuth } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { set } from "date-fns";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(JSON.stringify({ username, email, password, first_name }));
      const data = await register(username, email, password, first_name);
      saveAuth(data.token, data.username);
      toast.success("Registered and logged in!");
      navigate("/");
    } catch (err) {
      toast.error("Registration failed");
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
        <h2 className="text-lg font-semibold text-center">Register</h2>
        <input
          className="border rounded px-3 py-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border rounded px-3 py-2"
          placeholder="First name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
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
          {loading ? "Logging in..." : "Register"}
        </button>
      </form>
    </div>
  );
}
