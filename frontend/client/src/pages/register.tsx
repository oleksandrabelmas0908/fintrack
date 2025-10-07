import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../lib/auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const isAuthenticated = !!localStorage.getItem("access_token");
  console.log("Is authenticated:", isAuthenticated);

  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await register(username, password, email);
      toast({
        title: "Success",
        description: "Registered successfully",
      });
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
    toast({
      title: "Registration failed",
      description: "Check your username and password",
      variant: "destructive",
    });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="p-8 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Register1</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
