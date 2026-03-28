import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
export const prisma = new PrismaClient({ adapter });

export const getUserProfile = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            posts: {
                orderBy: { createdAt: 'desc' }
            }
        }
    });
    if (!user) throw new Error("User not found");
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const updateUserProfile = async (userId: string, bio?: string, avatarBase64?: string) => {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            bio: bio !== undefined ? bio : undefined,
            avatar: avatarBase64 !== undefined ? avatarBase64 : undefined
        }
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
};
