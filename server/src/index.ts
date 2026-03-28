import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from './generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

const app = express();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// @types/pg versions often clash with Prisma's internal types, so we cast to any here.
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });
const PORT = process.env.PORT || 5000;

// Middleware (The "Bouncers")
// CORS allows our Next.js frontend (running on a different port) to talk to this API
app.use(cors()); 
// express.json() allows the server to accept and read JSON data sent in the request body
app.use(express.json()); 

// Basic Route for testing the server health
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Akshar API is running strong!' });
});

import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import userRoutes from './routes/user.routes';

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`\n======================================\n🚀 Server running on http://localhost:${PORT}\n======================================\n`);
});
