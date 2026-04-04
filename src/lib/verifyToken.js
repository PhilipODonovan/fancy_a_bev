import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyToken() {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return decoded; 
  } catch (err) {
    return null;
  }
}