"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login({ username, password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome Back
          </CardTitle>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
            Please enter your credentials to continue
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 transition"
            >
              Sign In
            </Button>
          </form>

          {message && (
            <p className="text-red-500 text-sm mt-4 text-center animate-pulse">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
