import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend the Request type to include the user property
interface Request extends ExpressRequest {
  user?: JwtPayload;
  user_id?: number;
}

// Set the secret key for JWT
const JWT_SECRET = "your-secret-key";

// Middleware function to authenticate JWT
export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload; // Verify and decode the token
    req.user = decoded; // Attach the decoded payload to req.user

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Middleware function to attach user_id to req.user
export const attachUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.user_id) {
    req.user_id = req.user.user_id;
  }

  next();
};

// Function to generate JWT
export const generateToken = (user_id: number) => {
  const token = jwt.sign({ user_id }, JWT_SECRET, { expiresIn: "1d" });
  return token;
};
