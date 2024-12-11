import { Request } from "express";

export const getTokenFromHeader = (req: Request) => {
  const authHeader = req.headers["authorization"]; // Get the Authorization header
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1]; // Extract token part
  }
  return null; // No token found
};
