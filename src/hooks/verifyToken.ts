import JWT from "jsonwebtoken";
export const verifyToken = (token: string) => {
  try {
    // Replace 'your_secret_key' with the actual secret or public key
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY || "25012003");
    return decoded; // Returns the decoded token payload
  } catch (err) {
    // Handle token verification errors, e.g., token expired or invalid
    console.error("Invalid token", err);
    return null;
  }
};
