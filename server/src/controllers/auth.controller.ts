import { Request, Response } from 'express';
import { registerUser, loginUser, getOrCreateGoogleUserLogin, createGoogleUser } from '../services/auth.service';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "placeholder");

const resolveCountryFromReq = async (req: Request): Promise<string | null> => {
    try {
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        if (typeof ip === 'string' && ip.includes(',')) ip = ip.split(',')[0];
        
        if (ip === '::1' || ip === '127.0.0.1' || !ip) {
            return 'Classified Base (Local)';
        }

        const res = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await res.json();
        if (data.status === 'success') {
            return data.country;
        }
    } catch (e) {
        console.error("Geolocation error:", e);
    }
    return null;
}

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, realName, displayName, dob } = req.body;
        
        if (!email || !password || !realName || !displayName || !dob) {
            res.status(400).json({ error: "Please provide all required fields (email, password, realName, displayName, dob)" });
            return;
        }

        const dobDate = new Date(dob);
        const country = await resolveCountryFromReq(req);
        const newUser = await registerUser(email, password, realName, displayName, dobDate, country);
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            res.status(400).json({ error: "Please provide email and password" });
            return;
        }

        const data = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", ...data });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export const googleAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const { credential } = req.body;
        if (!credential) {
             res.status(400).json({ error: "Google credential is required" });
             return;
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID || "placeholder",
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email || !payload.sub) {
             res.status(400).json({ error: "Invalid Google credential" });
             return;
        }

        const loginData = await getOrCreateGoogleUserLogin(payload.email, payload.sub);
        if (loginData) {
            res.status(200).json({ message: "Login successful", ...loginData });
            return;
        }

        // Return 206 Partial Content to indicate we need more info
        res.status(206).json({
            message: "Additional details required",
            needsRegistration: true,
            email: payload.email,
            defaultName: payload.name
        });
    } catch (error: any) {
         res.status(401).json({ error: error.message });
    }
};

export const googleAuthComplete = async (req: Request, res: Response): Promise<void> => {
    try {
        const { credential, realName, displayName, dob } = req.body;
        if (!credential || !realName || !displayName || !dob) {
             res.status(400).json({ error: "All fields are required" });
             return;
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID || "placeholder",
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email || !payload.sub) {
             res.status(400).json({ error: "Invalid Google credential" });
             return;
        }

        const dobDate = new Date(dob);
        const country = await resolveCountryFromReq(req);
        const data = await createGoogleUser(payload.email, payload.sub, realName, displayName, dobDate, country);
        
        res.status(201).json({ message: "Registration successful", ...data });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
