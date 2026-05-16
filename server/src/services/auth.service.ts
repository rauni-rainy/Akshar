import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
export const prisma = new PrismaClient({ adapter });

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-educational-key';

export const registerUser = async (email: string, passwordRaw: string, realName: string, displayName: string, dob: Date, country: string | null = null) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(passwordRaw, 10);

    const user = await prisma.user.create({
        data: {
            email,
            realName,
            displayName,
            dob,
            country,
            password: hashedPassword
        }
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const loginUser = async (email: string, passwordRaw: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    if (!user.password) throw new Error("Please log in with Google");

    const isMatch = await bcrypt.compare(passwordRaw, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};

export const createGoogleUser = async (email: string, googleId: string, realName: string, displayName: string, dob: Date, country: string | null = null) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        if (!existing.googleId) {
            await prisma.user.update({ where: { id: existing.id }, data: { googleId } });
        }
        throw new Error("User already exists, please login.");
    }

    const user = await prisma.user.create({
        data: {
            email,
            googleId,
            realName,
            displayName,
            dob,
            country
        }
    });

    const { password, ...userWithoutPassword } = user;
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    return { user: userWithoutPassword, token };
};

export const getOrCreateGoogleUserLogin = async (email: string, googleId: string) => {
    let user = await prisma.user.findUnique({ where: { email } });
    
    if (user) {
        if (!user.googleId) {
             user = await prisma.user.update({ where: { id: user.id }, data: { googleId } });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
    
    return null;
};
