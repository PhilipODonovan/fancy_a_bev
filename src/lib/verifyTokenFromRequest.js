import jwt from "jsonwebtoken";

export function verifyTokenFromRequest(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch {
    return null;
  }
}