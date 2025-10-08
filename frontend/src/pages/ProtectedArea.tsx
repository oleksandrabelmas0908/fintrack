// src/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../lib/auth";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
