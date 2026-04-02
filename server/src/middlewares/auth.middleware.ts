import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-educational-key';

// Extend Express Request to explicitly hold our custom user object
export interface AuthRequest extends Request {
    user?: {
        userId: string;
    }
}

/**
 * Auth Middleware:
 * This acts as the "security guard" before a request ever reaches the Controller.
 * It checks the 'Authorization' header for a valid JWT token.
 * If valid, it attaches the user ID to the request so the controller knows exactly who is making the request.
 */
export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.user = decoded; // Attach the user info!
        next(); // Pass the request to the actual Controller
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

/**
 * Optional Auth Middleware:
 * Tries to verify JWT if present, but won't block the request if absent.
 */
export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next();
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.user = decoded;
    } catch (error) {
        // Ignore invalid token
    }
    next();
};
